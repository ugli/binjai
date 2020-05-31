import { ArrayCollectionBuilder } from "./CollectionBuilder";
import { Collection } from "./Collection";
import { Option } from "../lang/Option";
import { ImmutableMap, MutableNativeMap } from "./Map";


const groupByFunc = <T, K>(aList: List<T> | MutableList<T>, keyFunc: (item: T) => K): ImmutableMap<K, List<T>> =>
    aList.reduceLeft(
        (map, item) => {
            const key = keyFunc(item);
            map.get(key).eitherOr(
                list => list.add(item),
                () => map.put(key, MutableArrayList([item]))
            );
            return map;
        },
        MutableNativeMap<K, MutableList<T>>()
    );


export abstract class List<T> extends Collection<T> {
    abstract get(index: number): T;

    groupBy = <K>(keyFunc: (item: T) => K): ImmutableMap<K, List<T>> =>
        groupByFunc(this, keyFunc);

    getOption = (index: number): Option<T> => {
        return Option(this.get(index))
    }
}

export abstract class MutableList<T> extends Collection<T> {
    abstract get(index: number): T;
    abstract add(element: T): this;
    abstract toList(): List<T>;

    groupBy = <K>(keyFunc: (item: T) => K): ImmutableMap<K, List<T>> =>
        groupByFunc(this, keyFunc);

    getOption = (index: number): Option<T> => {
        return Option(this.get(index))
    }
}

export const ArrayList = <T>(cl: T[] = []): List<T> => new ArrayListImpl(cl);

class ArrayListImpl<T> extends List<T> {

    constructor(private readonly array: T[]) {
        super();
    }

    protected builder = <U>() =>
        new ArrayCollectionBuilder((x: U[]) => ArrayList(x));

    [Symbol.iterator] = () =>
        this.array[Symbol.iterator]();

    reversed = () =>
        ArrayList(this.array.reverse());

    toArray = () =>
        this.array.concat();

    get = (index: number) =>
        this.array[index];

}

export const MutableArrayList = <T>(cl: T[] = []): MutableList<T> => new MutableArrayListImpl(cl);

class MutableArrayListImpl<T> extends MutableList<T> {

    constructor(private readonly array: T[]) {
        super();
    }

    protected builder = <U>() =>
        new ArrayCollectionBuilder((x: U[]) => ArrayList(x));

    [Symbol.iterator] = () =>
        this.array[Symbol.iterator]();

    reversed = () =>
        ArrayList(this.array.reverse());

    toArray = () =>
        this.array;

    get = (index: number) =>
        this.array[index];

    add = (element: T): this => {
        this.array.push(element);
        return this;
    }

    toList = (): List<T> =>
        ArrayList(this.array);

}