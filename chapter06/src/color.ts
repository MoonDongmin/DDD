export class Color {
    public red: number;
    public green: number;
    public blue: number;

    constructor(red: number, green: number, blue: number) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    public mixWith(otherColor: Color) {
        return new Color(
            this.red = Math.min(this.red + otherColor.red, 255),
            this.green = Math.min(this.green + otherColor.green, 255),
            this.blue = Math.min(this.blue + otherColor.blue, 255),
        );
    }

    public equals(obj: any): boolean {
        if (!(obj instanceof Color)) {
            return false;
        }
        return this.red === obj.red &&
            this.green === obj.green &&
            this.blue === obj.blue;
    }

    public static equals(lhs: Color | null, rhs: Color | null): boolean {
        if (lhs === null) {
            return rhs === null;
        }
        return lhs.equals(rhs);
    }

    public static notEquals(lhs: Color | null, rhs: Color | null): boolean {
        return !Color.equals(lhs, rhs);
    }

    public getHashCode(): number {
        return;
    }


    static fromRGB(r: number, g: number, b: number) {
        return;
    }

    static green() {
        return;
    }
}
