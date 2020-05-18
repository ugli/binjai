import { Option } from "../lang/Option";
import { List } from "./List";

export class Entry<K, V> {
    constructor(readonly key: K, readonly value: V) { }
    toString = () => `[${this.key}=${this.value}]`; 
}

export class MutableMap<K, V> {
    constructor(readonly map = new Map<K, V>()) { }

    get = (key: K): Option<V> =>
        Option(this.map.get(key));

    put = (key: K, value: V): void => {
        this.map.set(key, value);
    }

    entries = () =>
        List(Array.from(this.map.entries()).map(e => new Entry(e[0], e[1])));

    toString = () => this.entries().toString();



} 