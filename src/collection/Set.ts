import { Collection, CollectionLike, toArray } from "./Collection";
import { List } from "./List";

export class ImmutableSet<T> implements Collection<T> {
    private readonly set: Set<T>;

    constructor(items: T[] = []) {
        this.set = new Set<T>(items);
    }

    size = () => this.set.size;
    isEmpty = () => this.size() === 0;
    concat = (collectionLike: CollectionLike<T>) => new ImmutableSet(this.toArray().concat(toArray(collectionLike, false)))
    filter = (op: (t: T) => boolean) => new ImmutableSet(this.toArray().filter(op))
    flatMap = <U>(op: (t: T) => CollectionLike<U>) =>  List(this.toArray()).flatMap(op);
    forEach =(op: (t: T) => void) => this.toArray().forEach(op);
    join = (separator: string) => this.toArray().join(separator);
    map = <U>(op: (t: T) => U) => new ImmutableSet(this.toArray().map(op));
    reduce = <U>(reduceFunc: (previousValue: U, currentValue: T) => U, initialValue: U) => this.toArray().reduce(reduceFunc, initialValue);
    groupBy = <K>(keyFunc: (item: T) => K) => List(this.toArray()).groupBy(keyFunc);
    toArray = () => Array.from(this.set.keys());
    toArrayCopy = () => this.toArray().concat();
    toString = () => `[${this.join(", ")}]`;

}