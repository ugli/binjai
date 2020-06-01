import { Option } from "../lang/Option";
import { Collection } from "./Collection";
import { CollectionBuilder } from "./CollectionBuilder";
import { MutableArrayList } from "./List";
import { Objects } from "../lang/Objects";

export class Entry<K, V> {
    constructor(readonly key: K, readonly value: V) { }
    toString = () => `[${this.key}=${this.value}]`;
}

export abstract class AbstractMap<K, V> extends Collection<Entry<K, V>> {
    map = <U>(op: ((element: Entry<K, V>) => U)): Collection<U> => {
        const list = MutableArrayList<U>();
        this.forEach(x => list.add(op(x)));
        return list.toList();
    }

    flatMap = <U>(op: ((element: Entry<K, V>) => Iterable<U>)): Collection<U> => {
        const list = MutableArrayList<U>();
        this.forEach(x => list.addAll(op(x)));
        return list.toList();
    }

    protected abstract fromEntries(entries: Collection<Entry<K, V>>): AbstractMap<K, V>;

    protected builder = (): CollectionBuilder<any> => {
        return new MapCollectionBuilder(this.fromEntries);
    }
}

class MapCollectionBuilder<K, V> implements CollectionBuilder<any> {
    readonly list = MutableArrayList<Entry<K, V>>();

    constructor(readonly factory: (entries: Collection<Entry<K, V>>) => AbstractMap<K, V>) { }

    add = (entry: any) => {
        this.list.add(entry);
        return this;
    }

    addAll = (iterable: Iterable<any>) => {
        this.list.addAll(iterable);
        return this;

    }
    build = (): Collection<any> =>
        this.factory(this.list);

}

export abstract class ImmutableMap<K, V> extends AbstractMap<K, V> {
    abstract get(key: K): Option<V>;
    abstract contains(key: K): boolean;
}

export abstract class MutableMap<K, V> extends AbstractMap<K, V> {
    abstract get(key: K): Option<V>;
    abstract put(key: K, value: V): this;
    abstract contains(key: K): boolean;
    abstract toImmutable(): ImmutableMap<K, V>;
}

export const ImmutableNativeMap = <K, V>(tuples: [K, V][] = []): ImmutableMap<K, V> => new ImmutableNativeMapImpl(tuples);

class ImmutableNativeMapImpl<K, V> extends ImmutableMap<K, V> {
    private readonly nativeMap = new Map<K, V>();

    constructor(tuples: [K, V][] = []) {
        super();
        tuples.forEach(x => this.nativeMap.set(x[0], x[1]));
    }

    protected fromEntries = (entries: Collection<Entry<K, V>>): any => {
        const map = new ImmutableNativeMapImpl();
        entries.forEach(x => map.nativeMap.set(x.key, x.value));
        return map;
    }

    [Symbol.iterator] = () =>
        Array.from(this.nativeMap.entries()).map(x => new Entry(x[0], x[1]))[Symbol.iterator]();

    reversed = (): ImmutableMap<K, V> =>
        ImmutableNativeMap(Array.from(this.nativeMap.entries()).reverse().map(x => [x[0], x[1]]));

    get = (key: K): Option<V> => {
        return Option(this.nativeMap.get(key));
    }

    contains = (key: K) =>
        this.nativeMap.has(key);

}

export const MutableNativeMap = <K, V>(tuples: [K, V][] = []): MutableMap<K, V> => new MutableNativeMapImpl(tuples);

class MutableNativeMapImpl<K, V> extends MutableMap<K, V> {

    private readonly nativeMap = new Map<K, V>();

    constructor(tuples: [K, V][] = []) {
        super();
        tuples.forEach(x => this.nativeMap.set(x[0], x[1]))
    }

    protected fromEntries = (entries: Collection<Entry<K, V>>): any => {
        const map = new MutableNativeMapImpl();
        entries.forEach(x => map.put(x.key, x.value));
        return map;
    }

    [Symbol.iterator] = () =>
        Array.from(this.nativeMap.entries()).map(x => new Entry(x[0], x[1]))[Symbol.iterator]();

    reversed = (): ImmutableMap<K, V> =>
        MutableNativeMap(Array.from(this.nativeMap.entries()).reverse().map(x => [x[0], x[1]]));

    get = (key: K): Option<V> => {
        return Option(this.nativeMap.get(key));
    }

    put = (key: K, value: V) => {
        this.nativeMap.set(key, value);
        return this;
    }

    contains = (key: K) =>
        this.nativeMap.has(key);

    toImmutable = (): ImmutableMap<K, V> =>
        ImmutableNativeMap(Array.from(this.nativeMap.entries()).map(x => [x[0], x[1]]));

}


export const ImmutableHashMap = <K, V>(tuples: [K, V][] = []): ImmutableMap<K, V> => new ImmutableHashMapImpl(tuples);

class ImmutableHashMapImpl<K, V> extends ImmutableMap<K, V> {
    private readonly keyMap = new Map<number, K>();
    private readonly valueMap = new Map<number, V>();

    constructor(tuples: [K, V][] = []) {
        super();
        tuples.forEach(x => this.put(x[0], x[1]))
    }

    protected fromEntries = (entries: Collection<Entry<K, V>>): any => {
        const map = new ImmutableHashMapImpl();
        entries.forEach(x => map.put(x.key, x.value));
        return map;
    }

    entries = (): Entry<K, V>[] => {
        return Array.from(this.keyMap.values()).map(key => new Entry(key, this.get(key).orThrow(Error("IllegalState"))));
    }

    [Symbol.iterator] = () =>
        this.entries()[Symbol.iterator]();

    reversed = (): ImmutableMap<K, V> =>
        ImmutableNativeMap(this.entries().reverse().map(x => [x.key, x.value]));

    private hash = (key: K) => {
        const hashCode = Objects.hashCode(key);
        return hashCode ^ (hashCode >>> 16)
    }

    put = (key: K, value: V) => {
        const keyHash = this.hash(key);
        this.keyMap.set(keyHash, key);
        this.valueMap.set(keyHash, value);
        return this;
    }


    get = (key: K): Option<V> => {
        return Option(this.valueMap.get(this.hash(key)));
    }

    contains = (key: K) =>
        this.keyMap.has(this.hash(key));

}

export const MutableHashMap = <K, V>(tuples: [K, V][] = []): MutableMap<K, V> => new MutableHashMapImpl(tuples);

class MutableHashMapImpl<K, V> extends MutableMap<K, V> {
    private readonly keyMap = new Map<number, K>();
    private readonly valueMap = new Map<number, V>();

    constructor(tuples: [K, V][] = []) {
        super();
        tuples.forEach(x => this.put(x[0], x[1]))
    }

    protected fromEntries = (entries: Collection<Entry<K, V>>): any => {
        const map = new MutableNativeMapImpl();
        entries.forEach(x => map.put(x.key, x.value));
        return map;
    }

    entries = (): Entry<K, V>[] => {
        return Array.from(this.keyMap.values()).map(key => new Entry(key, this.get(key).orThrow(Error("IllegalState"))));
    }

    [Symbol.iterator] = () =>
        this.entries()[Symbol.iterator]();

    reversed = (): ImmutableMap<K, V> =>
        MutableNativeMap(this.entries().map(x => [x.key, x.value]));

    get = (key: K): Option<V> => {
        return Option(this.valueMap.get(this.hash(key)));
    }

    private hash = (key: K) => {
        const hashCode = Objects.hashCode(key);
        return hashCode ^ (hashCode >>> 16)
    }

    put = (key: K, value: V) => {
        const keyHash = this.hash(key);
        this.keyMap.set(keyHash, key);
        this.valueMap.set(keyHash, value);
        return this;
    }

    contains = (key: K) =>
        this.keyMap.has(this.hash(key));

    toImmutable = (): ImmutableMap<K, V> =>
        ImmutableNativeMap(this.entries().map(x => [x.key, x.value]));

}
