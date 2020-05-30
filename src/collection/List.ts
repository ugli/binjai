import { ArrayCollectionBuilder } from "./CollectionBuilder";
import { Collection } from "./Collection";

/*
    groupBy = <K>(keyFunc: (item: T) => K): ImmutableMap<K, ListOld<T>> =>
        this.array.reduce((map, item) => {
            map.get(keyFunc(item)).eitherOr(
                list => list.toArray().push(item),
                () => map.put(keyFunc(item), ArrayListOld([item]))
            );
            return map;
        }, MutableMap<K, ListOld<T>>()
        ).toImmutable();
*/

export abstract class List<T> extends Collection<T> {
    abstract get(index: number): T;
}

export const ArrayList = <T>(cl: T[] = []): List<T> => new ArrayListImpl(cl);

class ArrayListImpl<T> extends List<T> {

    constructor(private readonly array: T[] = []) {
        super();
    }

    get = (index: number) =>
        this.array[index];

    [Symbol.iterator] = () =>
        this.array[Symbol.iterator]();

    reversed = () =>
        ArrayList(this.array.reverse());

    builder = <U>() =>
         new ArrayCollectionBuilder((x: U[]) => ArrayList(x));

}