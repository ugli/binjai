import { Collection } from "./Collection";

export interface List<T> extends Collection<T> {
    concat(c: Collection<T>): List<T>;
    filter(op: ((t: T)=> boolean)): List<T>;
    flatMap<U>(op: ((t: T) => Collection<U>)): List<U>;
    get(index: number): T;
    map<U>(op: ((t:T)=> U)): List<U>;
}

export const ArrayList = <T>(array: T[]): List<T> =>
    new ArrayListImpl(array);

class ArrayListImpl<T> implements List<T>  {
    private readonly array: T[];

    constructor(array: T[]) {
        this.array = array;
    }
    static from = <T>(...items: T[]) =>
        new ArrayListImpl(items);

    concat = (c: Collection<T>): List<T> =>
        new ArrayListImpl(this.array.concat(c.toArray()));

    filter = (op: (t: T) => boolean): List<T> =>
        new ArrayListImpl(this.array.filter(op));

    flatMap<U>(op: (t: T) => Collection<U>): List<U> {
        return new ArrayListImpl(this.map(op).reduce((prev, curr) => prev.concat(curr)).toArray());
    }

    forEach = (op: (t: T) => void): void =>
        this.array.forEach(op);

    get = (index: number): T =>
        this.array[index];

    join = (separator: string): string =>
        this.array.join(separator);

    map = <U>(op: (t: T) => U): List<U> =>
        new ArrayListImpl(this.array.map(op));

    reduce = (op: (prev: T, curr: T) => T): T =>
        this.array.reduce(op);

    toArray = (): T[] =>
        this.array.concat([]);

}