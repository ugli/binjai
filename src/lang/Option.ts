export const Option = <T>(value: any = undefined): Option<T> =>
    value ? new Some(value) : new None();

export interface Option<T> {
    filter(op: ((t: T) => boolean)): Option<T>;
    map<U>(op: ((t: T) => U)): Option<U>;
    isDefined(): boolean;
    orElse(e: T): T;
    orUndefined(): T | undefined;
    orThrow(error: Error): T;
    toString(): string;
}

class Some<T> implements Option<T> {
    readonly value: T;

    constructor(value: T) {
        this.value = value;
    }

    isDefined = () => true;
    orElse = () => this.value;
    orUndefined = () => this.value;
    orThrow = () => this.value;
    filter = (op: (t: T) => boolean): Option<T> => op(this.value) ? this : Option();
    map = <U>(op: (t: T) => U) => Option<U>(op(this.value));
    toString = () => `Some(${this.value})`;
}

class None<T> implements Option<T> {
    isDefined = () => false;
    orElse = (e: T) => e;
    orUndefined = () => undefined;
    orThrow = (error: Error) => { throw error };
    filter = () => Option<T>();
    map = <U>(): Option<U> => Option<U>();
    toString = () => "None()";
}