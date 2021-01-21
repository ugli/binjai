import {ImmutableMap, List} from "./Collection";
import {Option} from "../lang/Option";
import {NativeSet} from "./NativeSet";
import {MutableArrayList} from "./mutable/MutableArrayList";
import {NativeMap} from "./NativeMap";

export class ArrayList<T> implements List<T> {

    constructor(private readonly array: T[] = []) {
    }

    static of<T>(...elements: T[]): ArrayList<T> {
        return new ArrayList<T>(elements);
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

    filter = (op: (element: T) => boolean) =>
        new ArrayList(this.array.filter(op));

    map = <U>(op: (element: T) => U) =>
        new ArrayList(this.array.map(op));

    flatMap = <U>(op: (element: T) => Iterable<U>) =>
        new ArrayList(this.array.flatMap(e => Array.from(op(e))));

    reduceLeft<U>(op: (acc: U, element: T) => U, initialValue: U) {
        let acc = initialValue;
        for (let t of this.array)
            acc = op(acc, t);
        return acc;
    }

    reduceRight<U>(op: (acc: U, element: T) => U, initialValue: U) {
        let acc = initialValue;
        for (let t of this.array.reverse())
            acc = op(acc, t);
        return acc;
    }

    reverse = () =>
        new ArrayList(this.array.reverse());

    sort = (op?: (a: T, b: T) => number) =>
        new ArrayList(this.array.sort(op));

    toArray = () =>
        this.array.concat();

    toSet = () => {
        return new NativeSet(this.array);
    }

    mkString = (separator = "") =>
        this.array.join(separator);

    toString = () =>
        `[${this.mkString(", ")}]`

    groupBy<K>(op: (element: T) => K): ImmutableMap<K, List<T>> {
        const arrayMap = new Map<K, T[]>()
        for (let e of this.array) {
            const key = op(e)
            const mapValue = arrayMap.get(key)
            if (mapValue) mapValue.push(e)
            else arrayMap.set(key, [e])
        }
        const listMap = new Map<K, List<T>>();
        for (let k of arrayMap.keys())
            listMap.set(k, new ArrayList(arrayMap.get(k)));
        return new NativeMap(listMap);
    }

    splice = (start: number, end?: number) =>
        new ArrayList(this.toArray().splice(start, end));

    partition = (size: number) => {
        const result = new Array<List<T>>();
        const arrayCopy = this.toArray();
        while (arrayCopy.length > 0)
            result.push(new ArrayList(arrayCopy.splice(0, size)));
        return new ArrayList(result);
    }

    toMutable = () =>
        new MutableArrayList(this.toArray());

}
