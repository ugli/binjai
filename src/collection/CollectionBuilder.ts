import { Collection } from "./Collection";

export interface CollectionBuilder<T> {
    add(element: T): this
    addAll(iterable: Iterable<T>): this
    build(): Collection<T>;
}

export class ArrayCollectionBuilder<T> implements CollectionBuilder<T> {
    private readonly array: T[] = [];
    
    constructor(private readonly factory: (array: T[]) => Collection<T>) { }
    
    add = (element: T) => {
        this.array.push(element);
        return this;
    };
    
    addAll = (iterable: Iterable<T>) => {
        for (let x of iterable)
            this.add(x);
        return this;
    };
    
    build = (): Collection<T> => this.factory(this.array);
}
