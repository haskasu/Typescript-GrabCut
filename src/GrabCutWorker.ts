import { Line } from "./geoms/Line";
import { Point } from "./geoms/Point";
import { Rectangle } from "./geoms/Rectangle";
import { GrabCut, Trimap } from "./GrabCut";
import { FeatherMask, ImgData2_1DMat } from "./ImageUtil";
import { progress } from "./Progress";
import { Fill2DObj } from "./Utility";

class Rect {
    right: number;
    bottom: number;

    constructor(
        public x: number,
        public y: number,
        public w: number,
        public h: number
    ) {
        this.right = this.x + this.w;
        this.bottom = this.y + this.h;
    }

    contains(x: number, y: number): boolean {
        return x >= this.x && x < this.right && y >= this.y && y < this.bottom;
    }
}

type GrabcutLineType = 'foreground' | 'background' | '';

interface IGrabcutLine {
    mode: GrabcutLineType;
    points: { x: number, y: number }[];
    thickness: number;
    lines: Line[];
    hitRect: Rectangle;
}

function createTrimap(originWidth: number, originHeight: number, rect: Rect, lines: IGrabcutLine[]): Trimap[][] {
    lines.reverse();
    prepareGrabcutLines(lines);

    let trimap = Fill2DObj<Trimap>(originHeight, originWidth, () => Trimap.Unknown);
    for (let y = 0; y < originHeight; y++) {
        for (let x = 0; x < originWidth; x++) {
            let type = getGrabcutLineType(lines, x, y);
            if (type) {
                trimap[y][x] = type == 'foreground' ? Trimap.Foreground : Trimap.Background;
            } else if (!rect.contains(x, y)) {
                trimap[y][x] = Trimap.Background;
            }
        }
    }

    return trimap;
}

function prepareGrabcutLines(cutlines: IGrabcutLine[]): void {
    cutlines.forEach(cutLine => {
        cutLine.lines = [];
        let prevP: Point;
        let halfWidth = cutLine.thickness / 2 + 1;
        let hitRect: Rectangle;
        for (let p of cutLine.points) {
            let point = new Point(p.x, p.y);
            if (prevP) {
                cutLine.lines.push(new Line(prevP, point, true));
            }
            prevP = point;

            if (!hitRect) {
                hitRect = new Rectangle(p.x - halfWidth, p.y - halfWidth, halfWidth * 2, halfWidth * 2);
            } else {
                hitRect.x = Math.min(hitRect.x, p.x - halfWidth);
                hitRect.y = Math.min(hitRect.y, p.y - halfWidth);
                hitRect.width = Math.max(hitRect.width, p.x + halfWidth - hitRect.x);
                hitRect.height = Math.max(hitRect.height, p.y + halfWidth - hitRect.y);
            }
        }
        cutLine.hitRect = hitRect;
    })
}


function getGrabcutLineType(cutLines: IGrabcutLine[], x: number, y: number): GrabcutLineType {
    let point = new Point(x, y);
    let cutLine = cutLines.find(line => line.hitRect.contains(x, y) && hitTestLines(line.lines, line.thickness / 2, point));
    return cutLine ? cutLine.mode : '';
}

function hitTestLines(lines: Line[], halfWidth: number, point: Point): boolean {
    return !!lines.find(line => {
        if (line.projectionOf(point, true) && line.distanceTo(point) <= halfWidth) {
            return true;
        }
        return Point.distance(line.point1, point) <= halfWidth || Point.distance(line.point2, point) <= halfWidth;
    })
}

export function init(workerScope: any): void {
    workerScope.onmessage = function (event: any) {
        let message = event.data;
        console.log('receive grabcut command: ', message);
        if (message.type == 'grabcut') {
            try {
                progress.reset(workerScope, message.options);
                let size = { width: message.width, height: message.height };
                let rect = new Rect(message.rect.x, message.rect.y, message.rect.w, message.rect.h);
                console.time('createTrimap');
                let trimap = createTrimap(size.width, size.height, rect, message.lines);
                console.timeEnd('createTrimap');
                let cut = new GrabCut(ImgData2_1DMat(message.imageData), size.width, size.height);
                cut.SetTrimap(trimap, size.width, size.height);
                cut.BeginCrop(message.options);
                console.time('GetAlphaMask');
                let alphaMask = FeatherMask(message.options.featherSize, cut.GetAlphaMask());
                console.timeEnd('GetAlphaMask');
                progress.STEP.GetAlphaMask.advance();
                workerScope.postMessage({ type: 'alphaMask', alphaMask: alphaMask })
            } catch (err) {
                console.error('grabcut error: ', err);
            }
        } else if (message.type == 'cancel') {
            progress.stop();
        }
    }
    workerScope.postMessage({ type: 'loaded' });
}
