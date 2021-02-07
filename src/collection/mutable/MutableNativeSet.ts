import {MutableSet} from "./Collection";
import {Option} from "../../lang/Option";
import {NativeSet} from "../NativeSet";
import {ArrayList} from "../ArrayList";
import {ImmutableSet, List} from "../Collection";

export class MutableNativeSet<T> implements MutableSet<T> {

    protected readonly set: Set<T>;

    constructor(items: T[]) {
        this.set = new Set<T>(items);
    }

    static of<T>(...elements: T[]): MutableNativeSet<T> {
        return new MutableNativeSet<T>(elements);
    }

    toArray = () =>
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

    toList = (): List<T> =>
        new ArrayList<T>(this.toArray());

    mkString = (separator = "") =>
        this.toArray().join(separator);

    toString = () =>
        `[${this.mkString(",")}]`

    add = (element: T): void => {
        this.set.add(element);
    }

    addAll = (elements: Iterable<T>): void => {
        for (let e of elements)
            this.set.add(e);
    }

    clear = (): void => {
        this.set.clear();
    }

    remove = (element: T): void => {
        this.set.delete(element);
    }

    removeAll = (elements: Iterable<T>): void => {
        for (let e of elements)
            this.set.delete(e);
    }

    toSet(): ImmutableSet<T> {
        return new NativeSet(this.toArray());
    }

}
