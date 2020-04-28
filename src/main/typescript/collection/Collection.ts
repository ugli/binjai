export interface Collection<T> {
    concat(c: Collection<T>): Collection<T>;
    filter(op: ((t: T) => boolean)): Collection<T>;
    flatMap<U>(op: ((t: T) => Collection<U>)): Collection<U>;
    forEach(op: ((t: T) => void)): void;
    join(separator: string): string;
    map<U>(op: ((t: T) => U)): Collection<U>;
    reduce(op: (prev: T, curr: T) => T): T;
    toArray(): T[];
}