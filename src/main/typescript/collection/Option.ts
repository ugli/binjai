export class Options {
    static from = <T>(value: any): Option<T> =>
        value ? new Some(value): new None();
}

export interface Option<T> {
    filter(op: ((t: T) => boolean)): Option<T>;
    map<U>(op: ((t: T) => U)): Option<U>;
    isDefined(): boolean;
    orElse(e: T): T;
}

export class Some<T> implements Option<T> {

    private value: T;

    constructor(value: T) {
        this.value = value;
    }

    isDefined = () => true;
    orElse = () => this.value;

    filter = (op: (t: T) => boolean): Option<T> =>
        op(this.value) ? this : new None();

    map = <U>(op: (t: T) => U) =>
        new Some(op(this.value));
}

export class None<T> implements Option<T> {
    isDefined = () => false;
    orElse = (e: T) => e
    filter = () => this
    map = <U>(): Option<U> => new None()
    
}