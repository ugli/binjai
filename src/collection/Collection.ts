export type CollectionLike<T> = Collection<T> | Array<T>

export const toArray = <T>(cl: CollectionLike<T>, copy: boolean) =>
    cl instanceof Array ? cl as Array<T> : cl.toArray(copy)

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
    toArray(copy: boolean): T[];
    toString(): string;
}