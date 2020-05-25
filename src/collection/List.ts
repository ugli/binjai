import { Collection, CollectionLike, toArray } from "./Collection";
import { Entry, ImmutableMap, MutableMap } from "./Map";

export const List = <T>(cl: CollectionLike<T> = []): List<T> =>
    ArrayList(cl);

export interface List<T> extends Collection<T> {
    concat(c: Collection<T> | Array<T>): List<T>;
    filter(op: ((t: T) => boolean)): List<T>;
    flatMap<U>(op: ((t: T) => CollectionLike<U>)): List<U>;
    groupBy<K>(keyFunc: (item: T) => K): List<Entry<K, List<T>>>;
    get(index: number): T;
    map<U>(op: ((t: T) => U)): List<U>;
    toMap<K>(keyFunc: (item: T) => K): ImmutableMap<K, List<T>>;
}

export const ArrayList = <T>(collectionLike: CollectionLike<T> = []): List<T> =>
    new ArrayListImpl(toArray(collectionLike, true));

class ArrayListImpl<T> implements List<T>  {
    constructor(readonly array: T[]) { }

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

    toArray = (): T[] =>
        this.array;

    toArrayCopy = (): T[] =>
        this.array.concat()

    toString = (): string =>
        `[${this.join(", ")}]`;

    toMap = <K>(keyFunc: (item: T) => K): ImmutableMap<K, List<T>> =>
        this.array.reduce((map, item) => {
            map.get(keyFunc(item)).eitherOr(
                list => list.toArray().push(item),
                () => map.put(keyFunc(item), ArrayList([item]))
            );
            return map;
        }, MutableMap<K, List<T>>()
        ).toImmutable();

    groupBy = <K>(keyFunc: (item: T) => K): List<Entry<K, List<T>>> =>
        this.toMap(keyFunc).entries();

}

export class ArrayIndexOutOfBoundsException extends Error {
    constructor(index: number, size: number) {
        super(`Index out of bounds[0, ${size}], index: ${index}`);
        Object.setPrototypeOf(this, ArrayIndexOutOfBoundsException.prototype);
    }
}
