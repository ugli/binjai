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
    eitherOr(eitherFunc: ((t: T)=> void), orFunc: (()=> void)): void;
}

class Some<T> implements Option<T> {
    constructor(readonly value: T) {}
    isDefined = () => true;
    orElse = () => this.value;
    orUndefined = () => this.value;
    orThrow = () => this.value;
    eitherOr = (eitherFunc: (t: T) => void, orFunc: () => void) => eitherFunc(this.value);
    filter = (op: (t: T) => boolean): Option<T> => op(this.value) ? this : Option();
    map = <U>(op: (t: T) => U) => Option<U>(op(this.value));
    toString = () => `Some(${this.value})`;
}

class None<T> implements Option<T> {
    isDefined = () => false;
    orElse = (e: T) => e;
    orUndefined = () => undefined;
    orThrow = (error: Error) => { throw error };
    eitherOr = (eitherFunc: (t: T) => void, orFunc: () => void) => orFunc();
    filter = () => Option<T>();
    map = <U>(): Option<U> => Option<U>();
    toString = () => "None()";
}