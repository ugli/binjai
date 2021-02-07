import {MutableList} from "./Collection";
import {Option} from "../../lang/Option";
import {NativeSet} from "../NativeSet";
import {ArrayList} from "../ArrayList";

export class MutableArrayList<T> implements MutableList<T> {

    constructor(private array: T[]) {
    }

    static of<T>(...elements: T[]): MutableArrayList<T> {
        return new MutableArrayList<T>(elements);
    }

    [Symbol.iterator] = () =>
        this.array[Symbol.iterator]();

    isEmpty = () =>
        this.array.length == 0;

    size = (): number =>
        this.array.length;

    forEach = (op: (element: T) => void) =>
        this.array.forEach(t => op(t));

    forAll = (op: (element: T) => boolean) =>
        this.array.every(op);

    exists = (op: (element: T) => boolean) =>
        this.array.some(op);

    contains = (element: T) =>
        this.array.includes(element);

    firstIndexOf = (element: T) =>
        this.array.indexOf(element);

    lastIndexOf = (element: T) =>
        this.array.lastIndexOf(element);

    get = (index: number): Option<T> =>
        Option(this.array[index]);

    find = (op: (element: T) => boolean): Option<T> =>
        Option(this.array.find(op));

    reverse = (): void => {
        this.array.reverse();
    }

    sort = (op?: (a: T, b: T) => number): void => {
        this.array.sort(op);
    }

    toArray = () =>
        this.array.concat();

    toSet = () =>
        new NativeSet(this.array);

    mkString = (separator = "") =>
        this.array.join(separator);

    toString = () =>
        `[${this.mkString(",")}]`

    add = (element: T): void => {
        this.array.push(element);
    }

    addAll = (elements: Iterable<T>): void => {
        this.array = this.array.concat(...elements);
    }

    clear = (): void => {
        this.array = [];
    }

    remove = (element: T): void => {
        this.array = this.array.filter(e => e != element);
    }

    removeAll = (elements: Iterable<T>): void => {
        this.array = this.array.filter(e => !Array.from(elements).includes(e));
    }

    toList = () =>
        new ArrayList(this.toArray());

}
