import { Option } from "../lang/Option";
import { Collection } from "./Collection";
import { CollectionBuilder } from "./CollectionBuilder";

export class Entry<K, V> {
    constructor(readonly key: K, readonly value: V) { }
    toString = () => `[${this.key}=${this.value}]`;
}

export abstract class ImmutableMap<K, V> extends Collection<Entry<K, V>> {
    abstract get(key: K): Option<V>;
}

export abstract class MutableMap<K, V> extends Collection<Entry<K, V>> {
    abstract get(key: K): Option<V>;
    abstract put(key: K, value: V): this;
    abstract toImmutable(): ImmutableMap<K, V>;
}

export const ImmutableNativeMap = <K, V>(tuples: [K, V][]): ImmutableMap<K, V> => new ImmutableNativeMapImpl(tuples);

class ImmutableNativeMapImpl<K, V> extends ImmutableMap<K, V> {

    private readonly nativeMap = new Map<K, V>();

    constructor(tuples: [K, V][] = []) {
        super();
        tuples.forEach(x => this.nativeMap.set(x[0], x[1]))
    }

    protected builder = <U>() => {
        const mapCollection = new ImmutableNativeMapImpl();
        return new NativeMapCollectionBuilder<U>(mapCollection, mapCollection.nativeMap);
    }

    [Symbol.iterator] = () =>
        Array.from(this.nativeMap.entries()).map(x => new Entry(x[0], x[1]))[Symbol.iterator]();


    reversed = (): ImmutableMap<K, V> =>
        ImmutableNativeMap(Array.from(this.nativeMap.entries()).reverse().map(x => [x[0], x[1]]));

    get = (key: K): Option<V> => {
        return Option(this.nativeMap.get(key));
    }


}

export const MutableNativeMap = <K, V>(tuples: [K, V][] = []): MutableMap<K, V> => new MutableNativeMapImpl(tuples);

class MutableNativeMapImpl<K, V> extends MutableMap<K, V> {

    private readonly nativeMap = new Map<K, V>();

    constructor(tuples: [K, V][] = []) {
        super();
        tuples.forEach(x => this.nativeMap.set(x[0], x[1]))
    }

    protected builder = <U>() => {
        const mapCollection = new MutableNativeMapImpl();
        return new NativeMapCollectionBuilder<U>(mapCollection, mapCollection.nativeMap);
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

    toImmutable = (): ImmutableMap<K, V> =>
        ImmutableNativeMap(Array.from(this.nativeMap.entries()).reverse().map(x => [x[0], x[1]]));

}

class NativeMapCollectionBuilder<U> implements CollectionBuilder<U> {

    constructor(private mapCollection: any, private nativeMap: Map<any, any>) { }

    add = (element: U) => {
        const entry = element as any as Entry<any, any>;
        this.nativeMap.set(entry.key, entry.value);
        return this;
    }

    addAll = (iterable: Iterable<U>) => {
        for (let x of iterable)
            this.add(x);
        return this;
    }

    build = () =>
        this.mapCollection;

}
