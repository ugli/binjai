import { List } from "./List";
import { Collection } from "./Collection";

export class ArrayList<T> implements List<T>  {
    private readonly array: T[];

    private constructor(array: T[]) {
        this.array = array;
    }
    static from = <T>(...items: T[]) =>
        new ArrayList(items);

    concat = (c: Collection<T>): List<T> =>
        new ArrayList(this.array.concat(c.toArray()));

    filter = (op: (t: T) => boolean): List<T> =>
        new ArrayList(this.array.filter(op));

    flatMap<U>(op: (t: T) => Collection<U>): List<U> {
        return new ArrayList(this.map(op).reduce((prev, curr) => prev.concat(curr)).toArray());
    }

    forEach = (op: (t: T) => void): void =>
        this.array.forEach(op);

    get = (index: number): T =>
        this.array[index];

    join = (separator: string): string =>
        this.array.join(separator);

    map = <U>(op: (t: T) => U): List<U> =>
        new ArrayList(this.array.map(op));

    reduce = (op: (prev: T, curr: T) => T): T =>
        this.array.reduce(op);

    toArray = (): T[] =>
        this.array.concat([]);

}