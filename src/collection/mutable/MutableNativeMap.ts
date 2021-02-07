import {MutableMap} from "./Collection";
import {Option} from "../../lang/Option";
import {Entry} from "../Collection";
import {NativeMap} from "../NativeMap";

export class MutableNativeMap<K, V> implements MutableMap<K, V> {

    constructor(private readonly nativeMap = new Map<K, V>()) {
    }

    static of<K, V>(...tuples: [K, V][]): MutableMap<K, V> {
        const map = new Map<K, V>();
        tuples.forEach(x => map.set(x[0], x[1]));
        return new MutableNativeMap<K, V>(map);
    }

    static from<K, V>(iterable: Iterable<Entry<K, V>>): MutableMap<K, V> {
        const map = new Map<K, V>();
        for (let e of iterable)
            map.set(e.key, e.value);
        return new MutableNativeMap<K, V>(map);
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

    mkString = (separator?: string) =>
        Array.from(this)
            .map(e => e.toString()).join(separator);

    toString = (): string =>
        `[${this.mkString(",")}]`

    put = (key: K, value: V): void => {
        this.nativeMap.set(key, value);
    }

    clear = (): void => {
        this.nativeMap.clear();
    }

    toImmutable = () =>
        new NativeMap(new Map(this.nativeMap.entries()))

    toMap = () =>
        new Map(this.nativeMap.entries())


}
