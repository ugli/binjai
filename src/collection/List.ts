import { Collection, CollectionLike, toArray } from "./Collection";
import { ImmutableMap, MutableMap } from "./Map";

export const List = <T>(cl: CollectionLike<T> = []): List<T> =>
    ArrayList(cl);

export interface List<T> extends Collection<T> {
    concat(collection: Collection<T> | Array<T>): List<T>;
    filter(predicate: ((element: T) => boolean)): List<T>;
    flatMap<U>(mapFunc: ((element: T) => CollectionLike<U>)): List<U>;
    groupBy<K>(keyFunc: (element: T) => K): ImmutableMap<K, List<T>>;
    get(index: number): T;
    map<U>(mapFunc: ((element: T) => U)): List<U>;
}

export const ArrayList = <T>(collectionLike: CollectionLike<T> = []): List<T> =>
    new ArrayListImpl(toArray(collectionLike, true));

class ArrayListImpl<T> implements List<T>  {
    constructor(readonly array: T[]) { }

    size = (): number =>
        this.array.length;

    isEmpty = () =>
        this.array.length === 0;

    concat = (collection: CollectionLike<T>): List<T> =>
        ArrayList(this.array.concat(toArray(collection, false)));

    filter = (predicate: (element: T) => boolean): List<T> =>
        ArrayList(this.array.filter(predicate));

    flatMap<U>(mapFunc: (element: T) => CollectionLike<U>): List<U> {
        return ArrayList(this.array.map(mapFunc).reduce((prev, curr) => toArray(prev, false).concat(toArray(curr, false))));
    }

    forEach = (proc: (element: T) => void): void =>
        this.array.forEach(proc);

    get = (index: number): T => {
        if (index < 0 || index >= this.array.length)
            throw new ArrayIndexOutOfBoundsException(index, this.array.length);
        return this.array[index];
    }

    join = (separator: string): string =>
        this.array.join(separator);

    map = <U>(mapFunc: (t: T) => U): List<U> =>
        ArrayList(this.array.map(mapFunc));

    reduce = <U>(func: (prev: U, curr: T) => U, initialValue: U): U =>
        this.array.reduce(func, initialValue);

    toArray = (): T[] =>
        this.array;

    toArrayCopy = (): T[] =>
        this.array.concat()

    toString = (): string =>
        `[${this.join(", ")}]`;

    groupBy = <K>(keyFunc: (item: T) => K): ImmutableMap<K, List<T>> =>
        this.array.reduce((map, item) => {
            map.get(keyFunc(item)).eitherOr(
                list => list.toArray().push(item),
                () => map.put(keyFunc(item), ArrayList([item]))
            );
            return map;
        }, MutableMap<K, List<T>>()
        ).toImmutable();


}

export class ArrayIndexOutOfBoundsException extends Error {
    constructor(index: number, size: number) {
        super(`Index out of bounds[0, ${size}], index: ${index}`);
        Object.setPrototypeOf(this, ArrayIndexOutOfBoundsException.prototype);
    }
}
