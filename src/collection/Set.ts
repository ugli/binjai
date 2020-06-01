import { Objects } from "../lang/Objects";
import { ArrayCollectionBuilder } from "./CollectionBuilder";
import { Collection } from "./Collection";

export abstract class ImmutableSet<T> extends Collection<T> {
    abstract contains(element: T): boolean;
}

export abstract class MutableSet<T> extends ImmutableSet<T> {
    abstract contains(element: T): boolean;
    abstract add(element: T): this;
    addAll = (iterable: Iterable<T>): this => {
        for (let x of iterable) this.add(x);
        return this;
    }
}

export const ImmutableNativeSet = <T>(cl: T[] = []): ImmutableSet<T> => new ImmutableNativeSetImpl(cl);

class ImmutableNativeSetImpl<T> extends ImmutableSet<T> {

    protected readonly set: Set<T>;

    constructor(items: T[]) {
        super();
        this.set = new Set<T>(items);
    }

    [Symbol.iterator] = () =>
        this.set[Symbol.iterator]();

    reversed = () =>
        ImmutableNativeSet(Array.from(this.set).reverse());

    protected builder = <U>() =>
        new ArrayCollectionBuilder((x: U[]) => ImmutableNativeSet(x));

    contains = (element: T): boolean =>
        this.set.has(element);

}

export const MutableNativeSet = <T>(cl: T[] = []): MutableSet<T> => new MutableNativeSetImpl(cl);

class MutableNativeSetImpl<T> extends MutableSet<T> {

    private readonly set: Set<T>;

    constructor(items: T[]) {
        super();
        this.set = new Set<T>(items);
    }

    [Symbol.iterator] = () =>
        this.set[Symbol.iterator]();

    reversed = () =>
        MutableNativeSet(Array.from(this.set).reverse());

    protected builder = <U>() =>
        new ArrayCollectionBuilder((x: U[]) => MutableNativeSet(x));

    add = (element: T) => {
        this.set.add(element);
        return this;
    }

    contains = (element: T) =>
        this.set.has(element);

}

export const ImmutableHashSet = <T>(cl: T[] = []): ImmutableSet<T> => new ImmutableHashSetImpl(cl);

class ImmutableHashSetImpl<T> extends ImmutableSet<T> {

    private readonly table = new Map<number, T>();

    constructor(items: T[]) {
        super();
        items.forEach(x => this.table.set(this.hash(x), x));
    }

    protected builder = <U>() =>
        new ArrayCollectionBuilder((x: U[]) => ImmutableHashSet(x));

    [Symbol.iterator] = () =>
        this.table.values()[Symbol.iterator]();

    reversed = () =>
        ImmutableHashSet(Array.from(this.table.values()).reverse());


    private hash = (key: T) => {
        const hashCode = Objects.hashCode(key);
        return hashCode ^ (hashCode >>> 16)
    }

    contains = (element: T) =>
        this.table.has(this.hash(element));

}

export const MutableHashSet = <T>(cl: T[] = []): MutableSet<T> => new MutableHashSetImpl(cl);

class MutableHashSetImpl<T> extends MutableSet<T> {

    private readonly table = new Map<number, T>();

    constructor(items: T[]) {
        super();
        this.addAll(items);
    }

    protected builder = <U>() =>
        new ArrayCollectionBuilder((x: U[]) => MutableHashSet(x));

    [Symbol.iterator] = () =>
        this.table.values()[Symbol.iterator]();

    reversed = () =>
        MutableHashSet(Array.from(this.table.values()).reverse());

    private hash = (key: T) => {
        const hashCode = Objects.hashCode(key);
        return hashCode ^ (hashCode >>> 16)
    }

    add = (element: T) => {
        this.table.set(this.hash(element), element);
        return this;
    }

    contains = (element: T) =>
        this.table.has(this.hash(element));

}
