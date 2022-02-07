import { Point } from "./geoms/Point";
import * as Mat from "./Matrix";

export class Feather {

    constructor(public size: number) {

    }

    featherMask(alpha: number[][]): number[][] {
        if (this.size < 1) {
            return alpha;
        }

        let [width, height] = [alpha[0].length, alpha.length];
        let threshold = 0.1;
        let maxDist = this.size;
        let feathered: number[][] = Mat.CreateMatrix(height, width);

        let borderList: { [key: string]: FeatherBorder } = {};
        for (let r = 0; r < height; r++) {
            for (let c = 0; c < width; c++) {
                feathered[r][c] = alpha[r][c];
                if (alpha[r][c] < threshold) {
                    feathered[r][c] = 0;
                    // mark border
                    let minI = Math.max(0, c - maxDist);
                    let maxI = Math.min(width - 1, c + maxDist);
                    let minJ = Math.max(0, r - maxDist);
                    let maxJ = Math.min(height - 1, r + maxDist);
                    for (let i = minI; i <= maxI; ++i) {
                        for (let j = minJ; j <= maxJ; ++j) {
                            if (alpha[j][i] > 0) {
                                let key = Point.makeString(i, j);
                                let di = i - c;
                                let dj = j - r;
                                let dist = Math.sqrt(di * di + dj * dj);
                                if (dist < maxDist + 1) {
                                    let border = borderList[key] || new FeatherBorder(i, j, dist);
                                    border.updateDistance(dist);
                                    borderList[key] = border;
                                }
                            }
                        }
                    }
                }
            }
        }

        for (let key in borderList) {
            let border = borderList[key];
            let percent = (Math.sin(border.distance / (maxDist + 1) * Math.PI - Math.PI / 2) + 1) / 2;
            feathered[border.y][border.x] *= percent;
        }

        return feathered;
    }
}

class FeatherBorder extends Point {
    constructor(x: number, y: number, public distance: number) {
        super(x, y);
    }

    updateDistance(dist: number): void {
        this.distance = Math.min(this.distance, dist);
    }
}