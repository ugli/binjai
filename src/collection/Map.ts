import { Option } from "../lang/Option";
import { List } from "./List";
import { ImmutableSet } from "./Set";
import { Objects } from "../lang/Objects";

export interface Entry<K, V> {
    readonly key: K;
    readonly value: V;
}

export interface ImmutableMap<K, V> {
    get(key: K): Option<V>;
    entries(): List<Entry<K, V>>;
    keys(): ImmutableSet<K>;
    values(): List<V>;
    toMmutable(): MutableMap<K, V>;
}

export interface MutableMap<K, V> {
    get(key: K): Option<V>;
    entries(): List<Entry<K, V>>;
    keys(): ImmutableSet<K>;
    values(): List<V>;

    put(key: K, value: V): void;
    toImmutable(): ImmutableMap<K, V>;
}

export const MutableHashMap = <K, V>(): MutableMap<K, V> => new MutableHashMapImpl();
export const NativeMap = <K, V>(): MutableMap<K, V> => new NativeMapImpl();
export const MutableMap = MutableHashMap;
export const Entry = <K, V>(key: K, value: V): Entry<K, V> => new EntryImpl(key, value);


class EntryImpl<K, V> implements Entry<K, V> {
    constructor(readonly key: K, readonly value: V) { }
    toString = () => `[${this.key}=${this.value}]`;
}

class MutableHashMapImpl<K, V> implements MutableMap<K, V>, ImmutableMap<K, V> {
    constructor(readonly table = new Array<Entry<K, V>>()) { }

    private hash = (key: K) => {
        const hashCode = Objects.hashCode(key);
        return hashCode ^ (hashCode >>> 16)
    }

    get = (key: K): Option<V> =>
        Option(this.table[this.hash(key)]).map(o => (o as Entry<K,V>).value);

    put = (key: K, value: V): void => {
        this.table[this.hash(key)] = Entry(key, value);
    }

    entries = (): List<Entry<K, V>> =>
        List(this.table.filter(e => e ? true : false));

    keys = (): ImmutableSet<K> =>
        new ImmutableSet(this.table.filter(e => e ? true : false).map(e => e.key))

    values = (): List<V> =>
        List(this.table.filter(e => e ? true : false).map(e => e.value));

    toString = () =>
        this.entries().toString();

    toImmutable = (): ImmutableMap<K, V> =>
        new MutableHashMapImpl(this.table.concat());

    toMmutable = (): MutableMap<K, V> =>
        new MutableHashMapImpl(this.table.concat());

}

class NativeMapImpl<K, V> implements MutableMap<K, V>, ImmutableMap<K, V> {
    constructor(readonly map = new Map<K, V>()) { }

    get = (key: K): Option<V> =>
        Option(this.map.get(key));

    put = (key: K, value: V): void => {
        this.map.set(key, value);
    }

    entries = () =>
        List(Array.from(this.map.entries()).map(e => Entry(e[0], e[1])));

    keys = () =>
        new ImmutableSet(Array.from(this.map.keys()));

    values = () =>
        List(Array.from(this.map.values()));

    toString = () =>
        this.entries().toString();

    toImmutable = (): ImmutableMap<K, V> =>
        new NativeMapImpl(new Map(this.map.entries()));

    toMmutable = (): MutableMap<K, V> =>
        new NativeMapImpl(new Map(this.map.entries()));

} 