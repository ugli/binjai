import { CollectionBuilder } from "./CollectionBuilder";

export abstract class Collection<T> implements Iterable<T> {
    abstract [Symbol.iterator](): Iterator<T>;
    abstract reversed(): Collection<T>;
    protected abstract builder<U>(): CollectionBuilder<U>;

    forEach = (op: ((element: T) => void)): void => {
        for (let x of this) op(x);
    }

    size = (): number => {
        let result = 0;
        this.forEach(() => result += 1);
        return result;
    }

    isEmpty = (): boolean =>
        this.size() === 0;

    reduceLeft = <U>(op: (acc: U, element: T) => U, initialValue: U): U => {
        let acc = initialValue;
        this.forEach(x => { acc = op(acc, x); });
        return acc;
    }

    reduceRight = <U>(op: (acc: U, element: T) => U, initialValue: U): U =>
        this.reversed().reduceLeft(op, initialValue);

    map = <U>(op: ((element: T) => U)): Collection<U> => {
        const builder = this.builder<U>();
        this.forEach(x => builder.add(op(x)));
        return builder.build();
    }

    filter = (op: ((element: T) => boolean)): Collection<T> => {
        const builder = this.builder<T>();
        this.forEach(x => {
            if (op(x))
                builder.add(x);
        });
        return builder.build();
    }

    flatMap = <U>(op: ((element: T) => Iterable<U>)): Collection<U> => {
        const builder = this.builder<U>();
        this.forEach(x => builder.addAll(op(x)));
        return builder.build();
    }

    mkString = (separator = " "): string => {
        let first = true;
        return this.reduceLeft((acc, x) => {
            if (first) {
                first = false
                return `${x}`;
            }
            return `${acc}${separator}${x}`;
        }, "");
    }

    toArray = () => {
        const result = new Array<T>();
        this.forEach(x => result.push(x));
        return result;
    }

    toString = (): string =>
        `[${this.mkString(", ")}]`

}