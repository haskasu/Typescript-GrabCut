import { Point } from "./Point";

export class Rectangle {

    constructor(public x: number = 0, public y: number = 0, public width: number, public height: number) {

    }

    get right(): number {
        return this.x + this.width;
    }
    get left(): number {
        return this.x
    }
    get top(): number {
        return this.y;
    }
    get bottom(): number {
        return this.y + this.height;
    }

    public contains(x: number, y: number): boolean {
        return x >= this.x && y >= this.y && x < this.right && y < this.bottom;
    }

    public containsPoint(point: Point): boolean {
        return this.contains(point.x, point.y);
    }

    public containsRectangle(other: Rectangle): boolean {
        return other.x >= this.x &&
            other.y >= this.y &&
            other.right <= this.right &&
            other.bottom <= this.bottom;
    }

    public intersects(other: Rectangle): boolean {
        return !(
            other.right <= this.x ||
            other.bottom <= this.y ||
            other.x >= this.right ||
            other.y >= this.bottom
        );
    }

    public clone(): Rectangle {
        return new Rectangle(this.x, this.y, this.width, this.height);
    }

    public equals(toCompare: Rectangle): boolean {
        return toCompare && toCompare.x == this.x && toCompare.y == this.y && toCompare.width == this.width && toCompare.height == this.height;
    }

    public toString(): string {
        return Rectangle.makeString(this.x, this.y, this.width, this.height);
    }

    public static makeString(x: number, y: number, width: number, height: number): string {
        return `${x},${y},${width},${height}`;
    }

    public static fromString(str: string, result?: Rectangle): Rectangle {
        let arr = str.split(',');
        if (arr.length == 4) {
            if (result) {
                result.x = parseFloat(arr[0]);
                result.y = parseFloat(arr[1]);
                result.width = parseFloat(arr[2]);
                result.height = parseFloat(arr[3]);
            } else {
                result = new Rectangle(parseFloat(arr[0]), parseFloat(arr[1]), parseFloat(arr[2]), parseFloat(arr[3]));
            }
            return result;
        }
        return null;
    }
}