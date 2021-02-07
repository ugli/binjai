import {Option} from "../../lang/Option";
import {Collection, Entry, ImmutableMap, ImmutableSet, List} from "../Collection";

export interface MutableList<T> extends Collection<T> {
    contains(element: T): boolean;
    firstIndexOf(element: T): number;
    lastIndexOf(element: T): number;
    forAll(op: ((element: T) => boolean)): boolean;
    exists(op: ((element: T) => boolean)): boolean;
    get(index: number): Option<T>;
    find(op: ((element: T) => boolean)): Option<T>;
    reverse(): void;
    sort(op?: (a: T, b: T) => number): void;
    toArray(): Array<T>;
    toSet(): ImmutableSet<T>;
    toList(): List<T>;

    clear(): void;
    add(element: T): void;
    addAll(elements: Iterable<T>): void;
    remove(element: T): void;
    removeAll(elements: Iterable<T>): void;
}

export interface MutableSet<T> extends Collection<T> {
    contains(element: T): boolean;
    forAll(op: ((element: T) => boolean)): boolean;
    exists(op: ((element: T) => boolean)): boolean;
    find(op: ((element: T) => boolean)): Option<T>;
    toArray(): Array<T>;
    toSet(): ImmutableSet<T>;
    toList(): List<T>;

    clear(): void;
    add(element: T): void;
    addAll(elements: Iterable<T>): void;
    remove(element: T): void;
    removeAll(elements: Iterable<T>): void;

}

export interface MutableMap<K, V> extends Collection<Entry<K, V>> {
    contains(key: K): boolean;
    get(key: K): Option<V>;
    put(key: K, value: V): void;
    clear(): void;
    toImmutable(): ImmutableMap<K, V>;
    toMap(): Map<K,V>;
}


