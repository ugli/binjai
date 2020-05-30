import { Objects } from "../lang/Objects";
import { ArrayCollectionBuilder } from "./CollectionBuilder";
import { Collection } from "./Collection";

export abstract class ImmutableSet<T> extends Collection<T> {
    abstract contains(element: T): boolean;
}

export abstract class MutableSet<T> extends Collection<T> {
    abstract contains(element: T): boolean;
    abstract add(element: T): this;
    abstract addAll(iterable: Iterable<T>): this;
}


export const ImmutableNativeSet = <T>(cl: T[] = []): ImmutableSet<T> => new ImmutableNativeSetImpl(cl);

class ImmutableNativeSetImpl<T> extends ImmutableSet<T> {

    private readonly set: Set<T>;

    constructor(items: T[] = []) {
        super();
        this.set = new Set<T>(items);
    }

    contains = (element: T): boolean =>
        this.set.has(element);

    [Symbol.iterator] = () =>
        this.set[Symbol.iterator]();

    reversed = () =>
        ImmutableNativeSet(Array.from(this.set).reverse());

    builder = <U>() =>
        new ArrayCollectionBuilder((x: U[]) => ImmutableNativeSet(x));

}

export const MutableNativeSet = <T>(cl: T[] = []): MutableSet<T> => new MutableNativeSetImpl(cl);

class MutableNativeSetImpl<T> extends MutableSet<T> {

    private readonly set: Set<T>;

    constructor(items: T[] = []) {
        super();
        this.set = new Set<T>(items);
    }

    add = (element: T) => {
        this.set.add(element);
        return this;
    }

    addAll = (iterable: Iterable<T>) => {
        for (let x of iterable) this.add(x);
        return this;
    }

    contains = (element: T) =>
        this.set.has(element);

    [Symbol.iterator] = () =>
        this.set[Symbol.iterator]();

    reversed = () =>
        MutableNativeSet(Array.from(this.set).reverse());

    builder = <U>() =>
        new ArrayCollectionBuilder((x: U[]) => MutableNativeSet(x));

}

export const ImmutableHashSet = <T>(cl: T[] = []): ImmutableSet<T> => new ImmutableHashSetImpl(cl);

class ImmutableHashSetImpl<T> extends ImmutableSet<T> {

    private readonly table: T[] = [];

    constructor(items: T[] = []) {
        super();
        items.forEach(x => this.table[this.hash(x)])
    }

    private hash = (key: T) => {
        const hashCode = Objects.hashCode(key);
        return hashCode ^ (hashCode >>> 16)
    }

    private tableElements = () =>
        this.table.filter(x => x);

    contains = (element: T) =>
        this.table[this.hash(element)] ? true : false;

    [Symbol.iterator] = () =>
        this.tableElements()[Symbol.iterator]();

    reversed = () =>
        ImmutableHashSet(this.tableElements());

    builder = <U>() =>
        new ArrayCollectionBuilder((x: U[]) => ImmutableHashSet(x));
}

export const MutableHashSet = <T>(cl: T[] = []): MutableSet<T> => new MutableHashSetImpl(cl);

class MutableHashSetImpl<T> extends MutableSet<T> {

    private readonly table: T[] = [];

    constructor(items: T[] = []) {
        super();
        this.addAll(items);
    }

    private hash = (key: T) => {
        const hashCode = Objects.hashCode(key);
        return hashCode ^ (hashCode >>> 16)
    }

    private tableElements = () =>
        this.table.filter(x => x);

    add = (element: T) => {
        this.table[this.hash(element)];
        return this;
    }

    addAll = (iterable: Iterable<T>): this => {
        for (let x of iterable) this.add(x);
        return this;
    }

    contains = (element: T) =>
        this.table[this.hash(element)] ? true : false;

    [Symbol.iterator] = () =>
        this.tableElements()[Symbol.iterator]();

    reversed = () =>
        MutableHashSet(this.tableElements());

    builder = <U>() =>
        new ArrayCollectionBuilder((x: U[]) => MutableHashSet(x));

}
