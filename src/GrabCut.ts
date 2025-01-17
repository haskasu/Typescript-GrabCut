import * as GMM from "./GMM";
import * as BK from "./BKGraph";
import * as FlowBase from "./FlowNetworkSolver";
import * as Mat from "./Matrix";
import * as Util from "./Utility";
import * as Conv from "./ConvergenceChecker";
import * as V3 from "./V3";
import { progress } from "./Progress";

export enum Trimap {
    Background = 0,
    Foreground = 1,
    Unknown = 2
}

export interface Options {
    tolerance: number, //in %, min changes to next iteration
    maxIterations: number,
    cohesionFactor: number,
    nFGClusters: number,
    nBGClusters: number
}

export class GrabCut {
    private height: number;
    private width: number;
    private flattenedImg: Mat.Matrix[]; //Matrices -> [R,G,B] Each element ranges from 0-255
    private trimap: Uint8Array;
    private matte: Uint8Array;

    private fgGMM = new GMM.GMM();
    private bgGMM = new GMM.GMM();

    constructor(image: Mat.Matrix[], width: number, height: number) {
        this.height = height;
        this.width = width;

        let nPixels = width * height
        this.matte = new Uint8Array(nPixels);
        this.trimap = new Uint8Array(nPixels);

        this.flattenedImg = image;
    }

    SetTrimap(trimap: Trimap[][], width: number, height: number): void {
        for (let r = 0; r < height; r++) {
            for (let c = 0; c < width; c++) {
                let ind = GetArrayIndex(r, c, width);
                this.trimap[ind] = trimap[r][c];
            }
        }
    }

    //Returns the alpha mask
    BeginCrop(opt: Options) {
        console.log(opt);

        for (let i = 0; i < this.trimap.length; i++) {
            this.matte[i] = (this.trimap[i] == Trimap.Background) ? Trimap.Background : Trimap.Foreground;
        }

        let [fgPixels, bgPixels] = GrabCut.SegregatePixels(this.flattenedImg, this.matte, 0, 0, this.height, this.width);

        //Initial color GMMs
        const GMM_N_ITER = 5;
        const MIN_PERCENT_CHANGE = 1;

        console.time("Grabcut-GM");
        this.fgGMM.Fit(fgPixels, opt.nFGClusters, GMM.Initializer.KMeansPlusPlus, GMM_N_ITER, MIN_PERCENT_CHANGE);
        this.bgGMM.Fit(bgPixels, opt.nBGClusters, GMM.Initializer.KMeansPlusPlus, GMM_N_ITER, MIN_PERCENT_CHANGE);
        console.timeEnd("Grabcut-GM");

        progress.STEP.KMeans.advanceMax();
        progress.STEP.Points2GMM.advanceMax();
        progress.STEP.EMLikelihoodEval.advanceMax();
        progress.STEP.EMRespSum.advanceMax();
        progress.STEP.EMCovCal.advanceMax();

        this.RunIterations(opt.maxIterations, opt.tolerance, opt.cohesionFactor);
    }

    RunIterations(nIter: number, tolerancePercent: number, cohesionFactor: number) {
        //Create network graph (with edges between neighbouring pixels set)
        //Clone this network & populate with source and sink for use in the graphcut.
        let flowNetwork: FlowBase.IFlowNetwork = new BK.BKNetwork();//new Dinic.DinicNetwork();;
        let maxFlowSolver: FlowBase.IMaxFlowSolver = BK.BKMaxflow;//Dinic.DinicSolver;//;

        console.time("Grabcut-Pixel Graph");
        let [network, maxCapacity] = GrabCut.GeneratePixel2PixelGraph(this.flattenedImg, this.width, this.height, flowNetwork, cohesionFactor);
        let [srcNode, sinkNode] = GrabCut.InitSourceAndSink(network, this.width, this.height);
        console.timeEnd("Grabcut-Pixel Graph");

        let conv = new Conv.ConvergenceChecker(tolerancePercent, nIter);
        let energy: number;

        let labels = Util.Fill<number>(this.width * this.height, 0);

        console.time("Grabcut-Graph Cut");
        do {
            console.log(`iter:${conv.getCurrentIter()}`);

            console.time("Grabcut-Graph init");

            let filterEmptyGroups = (indices: number[], groupSize: number[]) => {
                let validIndices = [];
                let nonEmptyGroups = [];
                for (let i = 0; i < indices.length; i++) {
                    if (groupSize[i] > 0) {
                        validIndices.push(indices[i]);
                        nonEmptyGroups.push(groupSize[i]);
                    }
                }
                return [validIndices, nonEmptyGroups];
            };

            console.time("Graphcut-Graph GMM-recomputation");
            let [fgInd, fgGroupSizes, bgInd, bgGroupSizes] = GrabCut.LabelPixels(this.matte, this.height, this.width, this.fgGMM, this.bgGMM, this.flattenedImg, labels);
            let [validFgInd, validFgGroupSizes] = filterEmptyGroups(fgInd, fgGroupSizes);
            let [validBgInd, validBgGroupSizes] = filterEmptyGroups(bgInd, bgGroupSizes);
            [this.fgGMM, this.bgGMM] = GMM.GMM.labelledDataToGMMs(validFgInd, validFgGroupSizes, validBgInd, validBgGroupSizes, labels, this.flattenedImg);
            console.timeEnd("Graphcut-Graph GMM-recomputation");
            progress.STEP.GrabcutGMMRecomputation.advance();

            console.log(`fg clusters:${this.fgGMM.clusters.length}, bg clusters:${this.bgGMM.clusters.length}`);

            console.time("Grabcut-Graph source sink update");
            GrabCut.UpdateSourceAndSink(network, maxCapacity, this.fgGMM, this.bgGMM, this.flattenedImg, this.width, this.height, this.trimap, srcNode, sinkNode);
            console.timeEnd("Grabcut-Graph source sink update");
            progress.STEP.GrabcutGraphSourceSinkUpdate.advance();

            console.time("Grabcut-Graph flow reset");
            network.ResetFlow();
            console.timeEnd("Grabcut-Graph flow reset");
            progress.STEP.GrabcutGraphFlowReset.advance();

            console.timeEnd("Grabcut-Graph init");

            console.time("Grabcut-Graph maxflow");
            console.log('max flow');
            let flowResult = maxFlowSolver(srcNode, sinkNode, network);
            console.timeEnd("Grabcut-Graph maxflow");

            console.time("Grabcut-Graph cut");
            console.log('cut');
            let fgPixelIndices = flowResult.GetSourcePartition();
            GrabCut.UpdateMatte(this.matte, this.trimap, fgPixelIndices);

            energy = flowResult.GetMaxFlow();
            console.timeEnd("Grabcut-Graph cut");
            progress.STEP.GrabcutGraphCut.advance();

            console.log(`Energy: ${energy}`);
        } while (!conv.hasConverged(energy))
        console.timeEnd("Grabcut-Graph Cut");
        //Done    
        //Alpha mask is now stored in the matte array.
        progress.STEP.GrabcutGMMRecomputation.advanceMax();
        progress.STEP.GrabcutGraphSourceSinkUpdate.advanceMax();
        progress.STEP.GrabcutGraphFlowReset.advanceMax();
        progress.STEP.GrabcutGraphMaxFlow.advanceMax();
        progress.STEP.GrabcutGraphCut.advanceMax();
    }

    //Mask values will be between 0-1
    GetAlphaMask(): number[][] {
        let alpha = Mat.CreateMatrix(this.height, this.width);
        for (let i = 0; i < this.matte.length; i++) {
            let [r, c] = get2DArrayIndex(i, this.width);
            alpha[r][c] = (this.matte[i] == Trimap.Foreground) ? 1.0 : 0.0;
        }
        return alpha;
    }


    private static UpdateMatte(matte: Uint8Array, trimap: Uint8Array, fgPixelIndices: number[]) {
        let indexTable = Util.HashItems<number>(fgPixelIndices, n => n);
        for (let i = 0; i < matte.length; i++) {
            //Only update pixels that are marked as unknown
            //All other pixels are treated as ground truth (i.e. BG & FG data from the user)
            if (trimap[i] == Trimap.Unknown) {
                let isFG = indexTable.ContainsKey(i);
                matte[i] = (isFG) ? Trimap.Foreground : Trimap.Background;
            }
        }
    }

    //Returns the FG and BG pixel groups
    private static SegregatePixels(img: Mat.Matrix[], matte: Uint8Array, top: number, left: number, height: number, width: number): [Mat.Matrix[], Mat.Matrix[]] {
        let fgPixels: Mat.Matrix[] = [];
        let bgPixels: Mat.Matrix[] = [];

        for (let idx = 0; idx < img.length; idx++) {
            let currentPixel = img[idx];
            if (matte[idx] == Trimap.Foreground) fgPixels.push(currentPixel);
            else  bgPixels.push(currentPixel);
        }
        return [fgPixels, bgPixels];
    }

    //Returns the FG and BG group sizes
    private static LabelPixels(
        matte: Uint8Array, height: number, width: number,
        fgGMM: GMM.GMM, bgGMM: GMM.GMM,
        img: Mat.Matrix[], labels: number[]):
        [number[], number[], number[], number[]] {

        let nFGClusters = fgGMM.clusters.length;
        let nBGClusters = bgGMM.clusters.length

        let fgGroupSizes = Util.Fill<number>(nFGClusters, 0);
        let bgGroupSizes = Util.Fill<number>(nBGClusters, 0);

        let maxIndex = function (arr: number[]): number {
            let max = -Number.MAX_SAFE_INTEGER;
            let maxInd = 0;
            for (let i = 0; i < arr.length; i++) {
                let current = arr[i];
                if (current > max) {
                    maxInd = i;
                    max = current;
                }
            }
            return maxInd;
        }

        //Assign labels to each pixel
        for (let r = 0; r < height; r++) {
            for (let c = 0; c < width; c++) {
                let linearIndex = GetArrayIndex(r, c, width);
                let pixelIsFG = matte[linearIndex] == Trimap.Foreground;
                let currentPixel: Mat.Matrix = img[linearIndex];

                if (pixelIsFG) {
                    let likelihoods = fgGMM.Predict(currentPixel).likelihoods;
                    let fgGroup = maxIndex(likelihoods);
                    fgGroupSizes[fgGroup]++;
                    labels[linearIndex] = 0 + fgGroup;
                } else { //Bg 
                    let likelihoods = bgGMM.Predict(currentPixel).likelihoods;
                    let bgGroup = maxIndex(likelihoods);
                    bgGroupSizes[bgGroup]++;
                    labels[linearIndex] = nFGClusters + bgGroup;
                }
            }
        }
        let fgIndices = Util.Range(0, nFGClusters);
        let bgIndices = Util.Range(nFGClusters, nFGClusters + nBGClusters);

        return [fgIndices, fgGroupSizes, bgIndices, bgGroupSizes];
    }

    //TODO: Clone this network so it can be reused between iterations
    //Pixel to pixel edge capacities do not change
    //Returns the resultant network and the highest edge capacity
    private static GeneratePixel2PixelGraph(img: Mat.Matrix[], width: number, height: number, network: FlowBase.IFlowNetwork, cohesionFactor: number): [FlowBase.IFlowNetwork, number] {

        let isV3 = V3.isV3(img[0]);

        {
            let nPixels = height * width;
            for (let i = 0; i < nPixels; i++) {
                network.CreateNode();
            }
        }

        //Row, Column offsets for all 8 adjacent neighbours
        //let neighbours = [[0,-1],[-1,-1],[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1]];
        //neighbours within the 4 cardinal directions gives a better result than 8 surrounding pixels.
        let neighbours = [[0, -1], [-1, 0], [0, 1], [1, 0]];
        let coeff = neighbours.map(t => cohesionFactor / Math.sqrt(t[0] ** 2 + t[1] ** 2));

        let GetNeighbour = (r: number, c: number, neighbourInd: number): [boolean, number, number] => {
            let offset = neighbours[neighbourInd];
            let nR = r + offset[0];
            let nC = c + offset[1];
            let validNeighbour = WithinBounds(nR, nC, width, height);
            return [validNeighbour, nR, nC];
        };

        //Find beta (the mean difference between a pixel and its neighbours)
        let nCount = 0;
        let diffAcc = 0;

        let fnDiffSquare = (isV3) ?
            V3.DiffNormSquare :
            function (v1: Mat.Matrix, v2: Mat.Matrix) { return Mat.NormSquare(Mat.Sub(v1, v2)) };

        let progressScale = 1 / height / 2;

        for (let r = 0; r < height; r++) {
            for (let c = 0; c < width; c++) {
                let linearInd = GetArrayIndex(r, c, width);
                let currentPixel: Mat.Matrix = img[linearInd];

                for (let i = 0; i < neighbours.length; i++) {
                    let [validNeighbour, nR, nC] = GetNeighbour(r, c, i);
                    if (!validNeighbour) continue;
                    let neighbourInd = GetArrayIndex(nR, nC, width);
                    let neighbouringPixel = img[neighbourInd];
                    let diffSquare = fnDiffSquare(currentPixel, neighbouringPixel);
                    diffAcc += diffSquare;
                    nCount++;
                }
            }

            progress.STEP.GrabcutPixelGraph.advance(progressScale);
        }

        let beta = 0.5 / (diffAcc / nCount);
        let maxCap = -Number.MAX_SAFE_INTEGER;

        //Set pixel to pixel edge capacities
        for (let r = 0; r < height; r++) {
            for (let c = 0; c < width; c++) {

                let nodeIndex = GetArrayIndex(r, c, width);

                for (let i = 0; i < neighbours.length; i++) {
                    let [validNeighbour, nR, nC] = GetNeighbour(r, c, i);
                    if (!validNeighbour) continue;

                    let neighbourIndex = GetArrayIndex(nR, nC, width);
                    let diffSquare = fnDiffSquare(img[nodeIndex], img[neighbourIndex]);
                    let exponent = -beta * diffSquare;
                    let capacity = coeff[i] * Math.exp(exponent);

                    //Debugging purposes only
                    if (isNaN(capacity)) {
                        console.log({
                            coeff: coeff,
                            beta: beta,
                            exponent: exponent,
                            capacity: capacity
                        });
                    }

                    network.CreateEdge(nodeIndex, neighbourIndex, capacity);
                    maxCap = (capacity > maxCap) ? capacity : maxCap;
                }
            }
            progress.STEP.GrabcutPixelGraph.advance(progressScale);
        }

        console.log(`Pixel to pixel maximum capacity:${maxCap}`);
        return [network, maxCap];
    }

    //Creates edges from the source nodes to the pixels &
    //edges from the pixel node to the sink node

    //Returns the [sourceNodeIndex, sinkNodeIndex]
    private static InitSourceAndSink(network: FlowBase.IFlowNetwork, width: number, height: number): [number, number] {
        let srcInd = network.CreateNode();
        let sinkInd = network.CreateNode();

        for (let r = 0; r < height; r++) {
            for (let c = 0; c < width; c++) {
                //Src to pixel
                let pixelNodeInd = GetArrayIndex(r, c, width);
                network.CreateEdge(srcInd, pixelNodeInd, 0);
            }
        }

        for (let r = 0; r < height; r++) {
            for (let c = 0; c < width; c++) {
                //Pixel to sink
                let pixelNodeInd = GetArrayIndex(r, c, width);
                network.CreateEdge(pixelNodeInd, sinkInd, 0);
            }
        }
        return [srcInd, sinkInd];
    }

    //Source node represents the foreground
    //Returns the new network, with the edges connecting the source (FG) and sink (BG) to the pixels added
    //[network, sourceNodeIndex, sinkNodeIndex]
    private static UpdateSourceAndSink(
        network: FlowBase.IFlowNetwork, maxCap: number,
        gmmFG: GMM.GMM, gmmBG: GMM.GMM,
        image: Mat.Matrix[], width: number, height: number,
        trimap: Uint8Array,
        srcNode: number, sinkNode: number): void {

        let nPixels = width * height;
        for (let idx = 0; idx < nPixels; idx++) {
            switch (trimap[idx]) {
                case Trimap.Foreground: {
                    network.UpdateEdge(srcNode, idx, maxCap);
                    network.UpdateEdge(idx, sinkNode, 0);
                    break;
                }
                case Trimap.Background: {
                    network.UpdateEdge(srcNode, idx, 0);
                    network.UpdateEdge(idx, sinkNode, maxCap);
                    break;
                }
                case Trimap.Unknown: {
                    let currentPixel: Mat.Matrix = image[idx];
                    let pFore = GrabCut.GetTLinkWeight(gmmBG, currentPixel);
                    let pBack = GrabCut.GetTLinkWeight(gmmFG, currentPixel);

                    network.UpdateEdge(srcNode, idx, pFore);
                    network.UpdateEdge(idx, sinkNode, pBack);
                    break;
                }
            }
        }
    }

    private static GetTLinkWeight(gmm: GMM.GMM, pixel: Mat.Matrix): number {
        let gmmResult = gmm.Predict(pixel).TotalLikelihood();
        let res = -Math.log(gmmResult);
        if (isNaN(res)) {
            console.log({
                gmm: gmm,
                res: res,
                pixel: pixel,
                gmmResult: gmmResult
            });
            //Temporary bandaid
            return 0;
        }
        return res;
    }
}

function WithinBounds(row: number, col: number, width: number, height: number): boolean {
    return (row >= 0 && row < height) && (col >= 0 && col < width);
}

function GetArrayIndex(row: number, col: number, width: number): number {
    return row * width + col;
}

//Indices are returned in the form of [row, col]
function get2DArrayIndex(index1D: number, width: number): [number, number] {
    let row = Math.floor(index1D / width);
    let col = index1D % width;
    return [row, col];
}