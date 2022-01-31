export class Point {

    constructor(public x: number = 0, public y: number = 0) {
    }

    set(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    /**
     * Determines a point between two specified points.
     * The parameter f determines where the new interpolated point is located relative to the two end points specified by parameters pt1 and pt2.
     * The closer the value of the parameter f is to 1.0, the closer the interpolated point is to the first point (parameter pt1).
     * The closer the value of the parameter f is to 0, the closer the interpolated point is to the second point (parameter pt2).
     */
    public static interpolate(point1: Point, point2: Point, f: number, result?: Point): Point {
        result = result || new Point();
        let dx = point1.x - point2.x;
        let dy = point1.y - point2.y;
        result.set(point2.x + dx * f, point2.y + dy * f);
        return result;
    }

    public static distance(point1: Point, point2: Point): number {
        let dx: number = point1.x - point2.x;
        let dy: number = point1.y - point2.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    public static polar(len: number, angle: number, result?: Point): Point {
        if (result) {
            result.set(Math.cos(angle) * len, Math.sin(angle) * len);
            return result;
        }
        return new Point(Math.cos(angle) * len, Math.sin(angle) * len);
    }

    public static fromPIXIPoint(point: Point, result?: Point): Point {
        if (result) {
            result.set(point.x, point.y);
            return result;
        }
        return new Point(point.x, point.y);
    }

    public static fromXY(x: number, y: number, result?: Point): Point {
        if (result) {
            result.set(x, y);
            return result;
        }
        return new Point(x, y);
    }

    public clone(): Point {
        return new Point(this.x, this.y);
    }

    public static fromString(str: string, result?: Point): Point {
        if (str) {
            var arr: Array<string> = str.split(',');
            if (arr.length == 2) {
                if (result) {
                    result.set(parseFloat(arr[0]), parseFloat(arr[1]));
                    return result;
                }
                return new Point(parseFloat(arr[0]), parseFloat(arr[1]));
            }
        }
        return null;
    }

    public static makeString(x: number, y: number): string {
        return '' + x + ',' + y;
    }

    public sub(other: Point, result?: Point): Point {
        if (result) {
            result.set(this.x - other.x, this.y - other.y);
            return result;
        }
        return new Point(this.x - other.x, this.y - other.y);
    }
    public subXY(x: number, y: number, result?: Point): Point {
        if (result) {
            result.set(this.x - x, this.y - y);
            return result;
        }
        return new Point(this.x - x, this.y - y);
    }

    public add(other: Point, result?: Point): Point {
        if (result) {
            result.set(this.x + other.x, this.y + other.y);
            return result;
        }
        return new Point(this.x + other.x, this.y + other.y);
    }
    public addXY(x: number, y: number, result?: Point): Point {
        if (result) {
            result.set(this.x + x, this.y + y);
            return result;
        }
        return new Point(this.x + x, this.y + y);
    }
    public get lengthSquared(): number {
        return this.x * this.x + this.y * this.y;
    }

    public get length(): number {
        return Math.sqrt(this.lengthSquared);
    }

    public distanceTo(other: Point): number {
        let dx: number = other.x - this.x;
        let dy: number = other.y - this.y;
        return Math.sqrt(dx * dx + dy * dy);
    }


    public normalize(length: number = 1): number {
        var len: number = this.length;
        if (len == 0)
            return 0;
        this.scale(length / len);
        return len;
    }

    public dot(vector: Point): number {
        return this.x * vector.x + this.y * vector.y;
    }

    public scale(value: number): void {
        this.x *= value;
        this.y *= value;
    }

    public cross(vector: Point, result?: Point): Point {
        var a0: number = this.y * vector.x;
        var a1: number = this.x * vector.y;
        if (result) {
            result.set(a0 - a1, a1 - a0);
            return result;
        }
        return new Point(a0 - a1, a1 - a0);
    }

    public getNormal(result?: Point): Point {
        if (result) {
            result.set(-this.y, this.x);
            return result;
        }
        return new Point(-this.y, this.x);
    }

    public rotate(radians: number): void {
        var cos: number = Math.cos(radians);
        var sin: number = Math.sin(radians);

        var ox: number = this.x;
        var oy: number = this.y;
        this.x = ox * cos - oy * sin;
        this.y = oy * cos + ox * sin;
    }

    public equalsXY(x: number, y: number): boolean {
        return this.x == x && this.y == y;
    }

    public getPerpendicularDistance(p: Point): number {
        return Math.abs(p.x - this.x) + Math.abs(p.y - this.y);
    }

    public getPerpendicularDistanceFrom(px: number, py: number): number {
        return Math.abs(px - this.x) + Math.abs(py - this.y);
    }

    public get vertical(): boolean {
        return this.y == 0;
    }
    public get horizontal(): boolean {
        return this.x == 0;
    }
    public get verticalOrHorizontal(): boolean {
        return this.x == 0 || this.y == 0;
    }

    public equals(p: Point): boolean {
        return p.x == this.x && p.y == this.y;
    }
}
