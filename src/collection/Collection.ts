import {Option} from "../lang/Option";
import {MutableList, MutableMap, MutableSet} from "./mutable/Collection";

export interface Collection<T> extends Iterable<T> {
    [Symbol.iterator](): Iterator<T>;
    forEach(op: ((element: T) => void)): void,
    size(): number;
    isEmpty(): boolean;
    mkString(separator?: string): string;
}

export interface List<T> extends Collection<T> {
    contains(element: T): boolean;
    firstIndexOf(element: T): number;
    lastIndexOf(element: T): number;
    forAll(op: ((element: T) => boolean)): boolean;
    exists(op: ((element: T) => boolean)): boolean;
    get(index: number): Option<T>;
    find(op: ((element: T) => boolean)): Option<T>;
    reverse(): List<T>;
    sort(op?: (a: T, b: T) => number): List<T>;
    reduceLeft<U>(op: (acc: U, element: T) => U, initialValue: U): U;
    reduceRight<U>(op: (acc: U, element: T) => U, initialValue: U): U;
    filter(op: ((element: T) => boolean)): List<T>;
    map<U>(op: ((element: T) => U)): List<U>;
    flatMap <U>(op: ((element: T) => Iterable<U>)): List<U>;
    groupBy<K>(op: (element: T) => K): ImmutableMap<K, List<T>>;
    partition(size: number): List<List<T>>;
    splice(start: number, end?: number): List<T>;
    toArray(): Array<T>;
    toSet(): ImmutableSet<T>;
    toMutable(): MutableList<T>;
}

export interface ImmutableSet<T> extends Collection<T> {
    contains(element: T): boolean;
    forAll(op: ((element: T) => boolean)): boolean;
    exists(op: ((element: T) => boolean)): boolean;
    find(op: ((element: T) => boolean)): Option<T>;
    reduce<U>(op: (acc: U, element: T) => U, initialValue: U): U;
    filter(op: ((element: T) => boolean)): ImmutableSet<T>;
    map<U>(op: ((element: T) => U)): ImmutableSet<U>;
    flatMap<U>(op: ((element: T) => Iterable<U>)): ImmutableSet<U>;
    toList(): List<T>;
    toSet(): Set<T>;
    toMutable(): MutableSet<T>;
}

export class Entry<K, V> {
    constructor(readonly key: K, readonly value: V) { }
    toString = () => `[${this.key}=${this.value}]`;
}

export interface ImmutableMap<K, V> extends Collection<Entry<K, V>> {
    contains(key: K): boolean;
    get(key: K): Option<V>;
    filter(op: ((entry: Entry<K, V>) => boolean)): ImmutableMap<K, V>;
    map<U>(op: (entry: Entry<K, V>) => U): List<U>;
    flatMap<U>(op: (entry: Entry<K, V>) => Iterable<U>): List<U>;
    toMutable(): MutableMap<K, V>;
    toMap(): Map<K,V>;
}
