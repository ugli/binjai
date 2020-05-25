import { Entry, ImmutableMap } from "./Map";

export type CollectionLike<T> = Collection<T> | Array<T>

export const toArray = <T>(collectionLike: CollectionLike<T>, copy: boolean): T[] => {
    if (collectionLike instanceof Array)
        return copy ? collectionLike.concat() : collectionLike;
    return copy ? collectionLike.toArrayCopy(): collectionLike.toArray();
}

export interface Collection<T> {
    size(): number;
    isEmpty(): boolean;
    concat(collection: CollectionLike<T>): Collection<T>;
    filter(predicate: ((element: T) => boolean)): Collection<T>;
    flatMap<U>(mapFunc: ((element: T) => CollectionLike<U>)): Collection<U>;
    forEach(proc: ((element: T) => void)): void;
    join(separator: string): string;
    map<U>(mapFunc: ((element: T) => U)): Collection<U>;
    reduce<U>(reduceFunc: (previousValue: U, currentValue: T) => U, initialValue: U): U;
    groupBy<K>(keyFunc: (element: T) => K): ImmutableMap<K, Collection<T>>;
    toArray(): T[];
    toArrayCopy(): T[];
    toString(): string;
}