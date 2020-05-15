import { Collection } from "./Collection";

export interface List<T> extends Collection<T> {
    concat(c: Collection<T>): List<T>;
    filter(op: ((t: T)=> boolean)): List<T>;
    flatMap<U>(op: ((t: T) => Collection<U>)): List<U>;
    get(index: number): T;
    map<U>(op: ((t:T)=> U)): List<U>;
}