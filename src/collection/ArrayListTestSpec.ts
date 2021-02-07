import {ArrayList} from "./ArrayList";

test("empty list", () => {
    expect(ArrayList.of().toString()).toEqual("[]");
    expect(ArrayList.of().isEmpty()).toBeTruthy();
});

test("toString with numbers", () => {
    expect(ArrayList.of(3, 4).toString()).toEqual("[3,4]");
});

test("toString with strings", () => {
    expect(ArrayList.of("3", "4").toString()).toEqual("[3,4]");
});

test("for each", () => {
    let a = "";
    ArrayList.of(1, 2, 3, 4, 5).forEach(e => a = a + e);
    expect(a).toEqual("12345");
});

test("for all", () => {
    expect(ArrayList.of(2, 4, 6).forAll(e => e % 2 == 0)).toBeTruthy();
    expect(ArrayList.of(2, 4, 6, 7).forAll(e => e % 2 == 0)).toBeFalsy();
});

test("exists", () => {
    expect(ArrayList.of(2, 4, 6).exists(e => e == 4)).toBeTruthy();
    expect(ArrayList.of(2, 4, 6, 7).exists(e => e == 0)).toBeFalsy();
});

test("contains", () => {
    expect(ArrayList.of(2, 4, 6).contains(4)).toBeTruthy();
    expect(ArrayList.of(2, 4, 6, 7).contains(5)).toBeFalsy();
});

test("find", () => {
    expect(ArrayList.of(2, 4, 6).find(e => e == 4).orElse(-1)).toBe(4);
    expect(ArrayList.of(2, 4, 6).find(e => e == 7).orElse(-1)).toBe(-1);
    expect(ArrayList.of(2, 4, 6, 4, 6).find(e => e == 6).orElse(-1)).toBe(6);
});

test("indexOf", () => {
    expect(ArrayList.of(2, 4, 6, 4).firstIndexOf(4)).toBe(1);
    expect(ArrayList.of(2, 4, 6, 4).firstIndexOf(5)).toBe(-1);
    expect(ArrayList.of(2, 4, 6, 4).lastIndexOf(4)).toBe(3);
    expect(ArrayList.of(2, 4, 6, 4).lastIndexOf(5)).toBe(-1);
});

test("map numbers", () => {
    expect(ArrayList.of(3, 4).map(n => `M${n}`).toString()).toEqual("[M3,M4]");
});

test("flatMap numberArray", () => {
    const list = ArrayList.of(10, 20).flatMap(n => [n, n + 1]);
    expect(list.size()).toEqual(4);
    expect(list.toString()).toEqual("[10,11,20,21]");
});

test("flatMap numberList", () => {
    const list = ArrayList.of(10, 20).flatMap(n => ArrayList.of(n, n + 1));
    expect(list.size()).toEqual(4);
    expect(list.toString()).toEqual("[10,11,20,21]");
});

test("filter", () => {
    expect(ArrayList.of(1, 2, 3, 4).filter(e => e % 2 === 0).toString()).toEqual("[2,4]");
});

test("reduceLeft", () => {
    expect(ArrayList.of(1, 2, 3, 4).reduceLeft((acc, x) => acc + x, 0)).toEqual(10);
});

test("reduceRight", () => {
    expect(ArrayList.of(1, 2, 3, 4).reduceRight((acc, x) => acc + x, 0)).toEqual(10);
});

test("get element", () => {
    const list = ArrayList.of(1, 2, 3, 4);
    expect(list.get(2).orElse(1231)).toEqual(3);
    expect(list.get(1).orElse(1111)).toEqual(2);
    expect(list.get(-1).orElse(1111)).toEqual(1111);
    expect(list.get(4).orElse(1111)).toEqual(1111);
});

test("toArray", () => {
    const list = ArrayList.of(1, 2, 3, 4);
    const array = list.toArray();
    array[0] = 5;
    expect(list.toString()).toEqual("[1,2,3,4]");
});

test("group by", () => {
    const list = ArrayList.of(new Abba("a", 2), new Abba("b", 1), new Abba("a", 3));
    expect(list.groupBy(e => e.name).toString()).toEqual("[[a=[name=a, x=2,name=a, x=3]],[b=[name=b, x=1]]]");
});

test("partition", () => {
    const list = ArrayList.of(1, 2, 3, 4, 5, 6, 7, 8, 9);
    expect(list.partition(2).toString()).toEqual("[[1,2],[3,4],[5,6],[7,8],[9]]");
});

test("sort", () => {
    expect(ArrayList.of(3, 4, 1, 2, 5, 6, 7, 8, 9).sort().toString()).toEqual("[1,2,3,4,5,6,7,8,9]");
    expect(ArrayList.of(3, 4, 1, 2, 5, 6, 7, 8, 9).sort((a, b) => {
        if (a == b) return 0;
        return (a < b) ? 1 : -1;
    }).toString()).toEqual("[9,8,7,6,5,4,3,2,1]");
});

test("reverse", () => {
    expect(ArrayList.of(1, 2, 3, 4, 5, 6, 7, 8, 9).reverse().toString()).toEqual("[9,8,7,6,5,4,3,2,1]");
});

test("toSet", () => {
    expect(ArrayList.of(1, 2, 3).toSet().toString()).toEqual("[1,2,3]");
    expect(ArrayList.of(1, 2, 3, 2).toSet().toString()).toEqual("[1,2,3]");
});

test("splice", () => {
    const numbers = ArrayList.of(1, 2, 3, 2);
    expect(numbers.splice(0,0).toString()).toEqual("[]");
    expect(numbers.splice(0,2).toString()).toEqual("[1,2]");
    expect(numbers.splice(2,7).toString()).toEqual("[3,2]");
});

test("toMutable", () => {
    expect(ArrayList.of(1, 2, 3, 2).toMutable().toString()).toEqual("[1,2,3,2]");
});


class Abba {
    constructor(readonly name: string, readonly x: number) {
    }

    toString = () => `name=${this.name}, x=${this.x}`;
}
