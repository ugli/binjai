import {Entry, ImmutableMap} from "./Collection";
import {Option} from "../lang/Option";
import {ArrayList} from "./ArrayList";


export class NativeMap<K, V> implements ImmutableMap<K, V> {

    constructor(private readonly nativeMap = new Map<K, V>()) {
    }

    static fromTuples<K, V>(tuples: [K, V][] = []): NativeMap<K, V> {
        const map = new Map<K, V>();
        tuples.forEach(x => map.set(x[0], x[1]));
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
        for (let e of this.nativeMap.entries())
            op(new Entry(e[0], e[1]))
    };

    filter = (op: (entry: Entry<K, V>) => boolean) =>
        NativeMap.fromTuples(Array
            .from(this.nativeMap.entries())
            .map(x => new Entry(x[0], x[1]))
            .filter(op)
            .map(e => [e.key, e.value])
        );

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
        `[${this.mkString(", ")}]`

}
