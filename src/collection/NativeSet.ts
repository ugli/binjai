import {ImmutableSet} from "./Collection";
import {ArrayList} from "./ArrayList";
import {Option} from "../lang/Option";

export class NativeSet<T> implements ImmutableSet<T> {

    protected readonly set: Set<T>;

    constructor(items: T[]) {
        this.set = new Set<T>(items);
    }

    static of<T>(...elements: T[]): NativeSet<T> {
        return new NativeSet<T>(elements);
    }

    private toArray = () =>
        [...this.set];

    [Symbol.iterator] = () =>
        this.set[Symbol.iterator]();

    forEach = (op: (element: T) => void) => {
        for (let t of this.set) op(t)
    };

    contains = (element: T) =>
        this.set.has(element);

    exists = (op: (element: T) => boolean) =>
        this.toArray().some(op);

    forAll = (op: (element: T) => boolean) =>
        this.toArray().every(op);

    find = (op: (element: T) => boolean): Option<T> =>
        Option(this.toArray().find(op));

    isEmpty = (): boolean =>
        this.set.size == 0;

    size = () =>
        this.set.size;

    filter = (op: (element: T) => boolean) =>
        new NativeSet(this.toArray().filter(op));

    map = <U>(op: (element: T) => U) =>
        new NativeSet(this.toArray().map(op));

    flatMap = <U>(op: (element: T) => Iterable<U>) =>
        new NativeSet(this.toArray().flatMap(e => Array.from(op(e))));

    reduce = <U>(op: (acc: U, element: T) => U, initialValue: U): U => {
        let acc = initialValue;
        for (let t of this.set)
            acc = op(acc, t);
        return acc;
    };

    toList = () =>
        new ArrayList<T>(this.toArray());

    toSet = () =>
        new Set(this.set)

    mkString = (separator = "") =>
        this.toArray().join(separator);

    toString = () =>
        `[${this.mkString(", ")}]`

}
