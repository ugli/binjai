export type CollectionLike<T> = Collection<T> | Array<T>

export const toArray = <T>(collectionLike: CollectionLike<T>, copy: boolean): T[] => {
    if (collectionLike instanceof Array)
        return copy ? collectionLike.concat() : collectionLike;
    return copy ? collectionLike.toArrayCopy(): collectionLike.toArray();
}

export interface Collection<T> {
    size(): number;
    isEmpty(): boolean;
    concat(c: CollectionLike<T>): Collection<T>;
    filter(op: ((t: T) => boolean)): Collection<T>;
    flatMap<U>(op: ((t: T) => CollectionLike<U>)): Collection<U>;
    forEach(op: ((t: T) => void)): void;
    join(separator: string): string;
    map<U>(op: ((t: T) => U)): Collection<U>;
    reduce(op: (prev: T, curr: T) => T): T;
    toArray(): T[];
    toArrayCopy(): T[];
    toString(): string;
}