export class IllegalArgumentException extends Error {
    constructor(m: string) {
        super(m);
        Object.setPrototypeOf(this, IllegalArgumentException.prototype);
    }
}

export class ArrayIndexOutOfBoundsException extends Error {
    constructor(index: number, size: number) {
        super(`Index out of bounds[0, ${size}], index: ${index}`);
        Object.setPrototypeOf(this, IllegalArgumentException.prototype);
    }
}
