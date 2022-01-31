import { Options } from "./GrabCut";


class ProgressStep {

    public maxIterations: number = 1;

    public currIterations: number = 0;

    constructor(public total: number) {

    }

    reset(maxIterations: number = 1): number {
        this.maxIterations = maxIterations;
        this.currIterations = 0;
        return this.maxIterations * this.total;
    }

    advance(value: number = 1): number {
        if (this.currIterations < this.maxIterations) {
            value = Math.min(this.maxIterations - this.currIterations, value);
            this.currIterations += value;
            progress.onAdvanced(this.total * value);
            return this.total;
        } else {
            return 0;
        }
    }

    advanceTo(scale: number): number {
        if (this.currIterations < this.maxIterations) {
            let next = Math.min(this.maxIterations, Math.floor(this.currIterations + 1));
            let diff = next - this.currIterations;
            let value = diff * scale;
            this.currIterations += value;
            progress.onAdvanced(this.total * value);
            return this.total;
        } else {
            return 0;
        }
    }

    advanceMax(): number {
        if (this.currIterations < this.maxIterations) {
            let diff = this.maxIterations - this.currIterations;
            this.currIterations = this.maxIterations;
            progress.onAdvanced(this.total * diff);
            return this.total * diff;
        } else {
            return 0;
        }
    }
}

class Progress {

    STEP = {
        PREPARE_TRIMAP: new ProgressStep(200),
        PREPARE_IMGDATA: new ProgressStep(425),
        KMeans: new ProgressStep(711),
        Points2GMM: new ProgressStep(825),
        EMLikelihoodEval: new ProgressStep(600),
        EMRespSum: new ProgressStep(79),
        EMCovCal: new ProgressStep(110),

        GrabcutPixelGraph: new ProgressStep(6138),

        GrabcutGMMRecomputation: new ProgressStep(2474),
        GrabcutGraphSourceSinkUpdate: new ProgressStep(1217),
        GrabcutGraphFlowReset: new ProgressStep(54),
        GrabcutGraphMaxFlow: new ProgressStep(8000),
        GrabcutGraphCut: new ProgressStep(350),

        GetAlphaMask: new ProgressStep(90),
    }

    workerScope: any;

    total: number;

    current: number;

    constructor() {

    }

    reset(workerScope: any, options: Options): void {
        this.workerScope = workerScope;
        this.total = 0;
        this.current = 0;

        const steps = this.STEP;
        this.total += steps.PREPARE_TRIMAP.reset();
        this.total += steps.PREPARE_IMGDATA.reset();
        // 2: FG and BG
        this.total += steps.KMeans.reset(2);
        this.total += steps.Points2GMM.reset(2);
        // GMM iteration: 2 * (2~20)
        let iterations = 20;
        this.total += steps.EMLikelihoodEval.reset(iterations);
        this.total += steps.EMRespSum.reset(iterations);
        this.total += steps.EMCovCal.reset(iterations);
        //
        this.total += steps.GrabcutPixelGraph.reset();
        // Grabcut Iteration
        iterations = options.maxIterations;
        this.total += steps.GrabcutGMMRecomputation.reset(iterations);
        this.total += steps.GrabcutGraphSourceSinkUpdate.reset(iterations);
        this.total += steps.GrabcutGraphFlowReset.reset(iterations);
        this.total += steps.GrabcutGraphMaxFlow.reset(iterations);
        this.total += steps.GrabcutGraphCut.reset(iterations);
        //
        this.total += steps.GetAlphaMask.reset();
    }

    onAdvanced(value: number): void {
        this.current += value;
        this.workerScope.postMessage({ type: 'progress', progress: this.current, total: this.total });
    }
}


export const progress = new Progress();