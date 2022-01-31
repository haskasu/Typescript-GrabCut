import { Rectangle } from './Rectangle';
import { Point } from './Point';

export class Line {

    private _vector: Point;

    private _extent: Rectangle;

    constructor(private _point1: Point, private _point2: Point, private _finite: boolean) {

    }

    public get point1(): Point {
        return this._point1;
    }
    public get point2(): Point {
        return this._point2;
    }
    public get vector(): Point {
        if (!this._vector) {
            this._vector = this._point2.sub(this._point1);
        }
        return this._vector;
    }

    public clone(): Line {
        return new Line(this._point1, this._point2, this._finite);
    }

    public get finite(): boolean {
        return this._finite;
    }

    public toString(): string {
        return "Line[(" + this._point1 + "),(" + this._point2 + ")]";
    }

    public distanceTo(point: Point): number {
        return Math.abs((this.vector.x * (this._point1.y - point.y) - this.vector.y * (this._point1.x - point.x)) / this.vector.length);
    }

    public projectionOf(point: Point, checkFinite: boolean = false): Point {
        var diff: Point = new Point(point.x - this._point1.x, point.y - this._point1.y);
        var vec: Point = this.vector.clone();
        vec.normalize();
        var t: number = vec.dot(diff);
        vec.scale(t);
        var pos: Point = this._point1.add(vec);

        if (checkFinite && this.finite) {
            if (this.vector.x == 0) {
                if (pos.y < Math.min(this._point1.y, this._point2.y) || pos.y > Math.max(this._point1.y, this._point2.y))
                    return null;
            }
            else if (pos.x < Math.min(this._point1.x, this._point2.x) || pos.x > Math.max(this._point1.x, this._point2.x)) {
                return null;
            }
        }

        return pos;
    }

    public normalize(length: number): number {
        var olen: number = this.vector.normalize(length);
        this._point2.x = this._point1.x + this.vector.x;
        this._point2.y = this._point1.y + this.vector.y;
        this._extent = null;
        return olen;
    }

    public get extent(): Rectangle {
        if (!this._extent) {
            this._extent = new Rectangle(
                Math.min(this._point1.x, this._point2.x),
                Math.min(this._point1.y, this._point2.y),
                Math.abs(this.vector.x),
                Math.abs(this.vector.y)
            );
        }
        return this._extent;
    }

    public getPerpendicularLine(refPoint: Point): Line {
        return new Line(refPoint, new Point(refPoint.x - this.vector.y, refPoint.y + this.vector.x), false);
    }

    public intersectsRectangle(rect: Rectangle): boolean {
        if (rect.containsPoint(this._point1) || rect.containsPoint(this._point2))
            return true;

        if (!this.extent.intersects(rect))
            return false;

        if (this.vector.x == 0 || this.vector.y == 0)
            return false;

        // ax - y + b = 0
        let a: number = this.vector.y / this.vector.x;
        let b: number = this._point1.y - a * this._point1.x;

        // test topLeft,bottomRight
        if ((a * this.extent.left - this.extent.top + b) * (a * this.extent.right - this.extent.bottom + b) < 0)
            return true;

        // test topRight,bottomLeft
        if ((a * this.extent.right - this.extent.top + b) * (a * this.extent.left - this.extent.bottom + b) < 0)
            return true;

        return false;
    }

    public getX(y: number): number {
        if (this.vector.y == 0)
            return Number.NaN;

        if (this.finite) {
            if (y > this._point1.y && y > this._point2.y)
                return Number.NaN;
            if (y < this._point1.y && y < this._point2.y)
                return Number.NaN;
        }
        return this._point1.x + (y - this._point1.y) * this.vector.x / this.vector.y;
    }

    public getY(x: number): number {
        if (this.vector.x == 0)
            return Number.NaN;

        if (this.finite) {
            if (x > this._point1.x && x > this._point2.x)
                return Number.NaN;
            if (x < this._point1.x && x < this._point2.x)
                return Number.NaN;
        }
        return this._point1.y + (x - this._point1.x) * this.vector.y / this.vector.x;
    }

    public isPointOnRight(point: Point): boolean {
        if (point.equals(this._point1)) {
            return false;
        } else {
            let pvec: Point = new Point(point.x - this._point1.x, point.y - this._point1.y);
            return this.vector.getNormal().dot(pvec) > 0;
        }
    }
    public isPointOnLeft(point: Point): boolean {
        if (point.equals(this._point1)) {
            return false;
        } else {
            var pvec: Point = new Point(point.x - this._point1.x, point.y - this._point1.y);
            return this.vector.getNormal().dot(pvec) < 0;
        }
    }

    public arePointsOnSameSide(point1: Point, point2: Point): boolean {
        var normal: Point = this.vector.getNormal();
        var p1vec: Point = point1.sub(this._point1);
        var p2vec: Point = point2.sub(this._point1);
        return normal.dot(p1vec) * normal.dot(p2vec) > 0;
    }

    public markDirty(): void {
        this._vector = null;
        this._extent = null;
    }
}
