import {MutableList} from "./Collection";
import {Option} from "../../lang/Option";
import {NativeSet} from "../NativeSet";
import {ArrayList} from "../ArrayList";

export class MutableArrayList<T> implements MutableList<T> {

    constructor(private array: T[]) {
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

    reverse = () =>
        this.array.reverse();

    sort = (op?: (a: T, b: T) => number) =>
        this.array.sort(op);

    toArray = () =>
        this.array.concat();

    toSet = () =>
        new NativeSet(this.array);

    mkString = (separator = "") =>
        this.array.join(separator);

    toString = () =>
        `[${this.mkString(", ")}]`

    add = (element: T) =>
        this.array.push(element);

    addAll = (elements: Iterable<T>) =>
        this.array.concat(...elements);

    clear = () =>
        this.array = [];

    remove = (element: T) =>
        this.array = this.array.filter(e => e != element);

    removeAll = (elements: Iterable<T>) => {
        const newArray = new Array<T>();
        for (let t of elements)
            if (!this.contains(t))
                newArray.push(t);
        this.array = newArray;
    }

    toList = () =>
        new ArrayList(this.toArray());

}
