import { Collection, CollectionLike, toArray } from "./Collection";
import { ArrayIndexOutOfBoundsException } from "../lang/Exceptions";

export const List = <T>(cl: CollectionLike<T> = []): List<T> =>
    ArrayList(cl);

export interface List<T> extends Collection<T> {
    concat(c: Collection<T> | Array<T>): List<T>;
    filter(op: ((t: T) => boolean)): List<T>;
    flatMap<U>(op: ((t: T) => CollectionLike<U>)): List<U>;
    get(index: number): T;
    map<U>(op: ((t: T) => U)): List<U>;
}

export const ArrayList = <T>(cl: CollectionLike<T> = []): List<T> =>
    new ArrayListImpl(toArray(cl, true));

class ArrayListImpl<T> implements List<T>  {
    private readonly array: T[];

    constructor(array: T[]) {
        this.array = array;
    }

    size = (): number =>
        this.array.length;

    isEmpty = () =>
        this.array.length === 0;

    concat = (cl: CollectionLike<T>): List<T> =>
        ArrayList(this.array.concat(toArray(cl, false)));

    filter = (op: (t: T) => boolean): List<T> =>
        ArrayList(this.array.filter(op));

    flatMap<U>(op: (t: T) => CollectionLike<U>): List<U> {
        return ArrayList(this.map(op).reduce((prev, curr) => toArray(prev, false).concat(toArray(curr, false))));
    }

    forEach = (op: (t: T) => void): void =>
        this.array.forEach(op);

    get = (index: number): T => {
        if (index < 0 || index >= this.array.length)
            throw new ArrayIndexOutOfBoundsException(index, this.array.length);
        return this.array[index];
    }

    join = (separator: string): string =>
        this.array.join(separator);

    map = <U>(op: (t: T) => U): List<U> =>
        ArrayList(this.array.map(op));

    reduce = (op: (prev: T, curr: T) => T): T =>
        this.array.reduce(op);

    toArray = (copy: boolean): T[] =>
        copy ? this.array.concat() : this.array;

    toString = (): string =>
        `[${this.join(", ")}]`;

}