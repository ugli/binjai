import {Entry, ImmutableMap} from "./Collection";
import {Option} from "../lang/Option";
import {ArrayList} from "./ArrayList";
import {MutableNativeMap} from "./mutable/MutableNativeMap";

export class NativeMap<K, V> implements ImmutableMap<K, V> {

    constructor(private readonly nativeMap = new Map<K, V>()) {
    }

    static of<K, V>(...tuples: [K, V][]): NativeMap<K, V> {
        const map = new Map<K, V>();
        tuples.forEach(x => map.set(x[0], x[1]));
        return new NativeMap<K, V>(map);
    }

    static from<K, V>(iterable: Iterable<Entry<K, V>>): NativeMap<K, V> {
        const map = new Map<K, V>();
        for (let e of iterable)
            map.set(e.key, e.value);
        return new NativeMap<K, V>(map);
    }

    [Symbol.iterator] = () =>
        Array.from(this.nativeMap.entries())
            .map(x => new Entry(x[0], x[1]))[Symbol.iterator]();

    isEmpty = () =>
        this.nativeMap.size == 0;

    size = () =>
        this.nativeMap.size;

    contains = (key: K) =>
        this.nativeMap.has(key);

    get = (key: K): Option<V> =>
        Option(this.nativeMap.get(key));

    forEach = (op: (element: Entry<K, V>) => void) => {
        for (let e of this)
            op(e);
    };

    filter = (op: (entry: Entry<K, V>) => boolean) =>{
        const result = new Array<Entry<K, V>>();
        for (let e of this)
            if (op(e))
                result.push(e)
        return NativeMap.from(result);
    };

    map = <U>(op: (entry: Entry<K, V>) => U) => {
        const result = new Array<U>();
        for (let e of this)
            result.push(op(e))
        return new ArrayList(result);
    };

    flatMap = <U>(op: (entry: Entry<K, V>) => Iterable<U>) => {
        const result = new Array<U>();
        for (let t of this)
            for (let u of op(t))
                result.push(u);
        return new ArrayList(result);
    };

    mkString = (separator?: string) =>
        Array.from(this)
            .map(e => e.toString()).join(separator);

    toString = (): string =>
        `[${this.mkString(",")}]`

    toMutable = () =>
      new MutableNativeMap(new Map(this.nativeMap.entries()));

    toMap = () =>
        new Map(this.nativeMap.entries())

}
