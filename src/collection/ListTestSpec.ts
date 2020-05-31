import { ArrayList, MutableArrayList } from "./List";


describe("ArrayList", () => {
  it("empty list", () => {
    expect(ArrayList().toString()).toEqual("[]");
    expect(ArrayList().isEmpty()).toBeTruthy();
  });
  it("toString with numbers", () => {
    expect(ArrayList([3, 4]).toString()).toEqual("[3, 4]");
  });
  it("toString with strings", () => {
    expect(ArrayList(["3", "4"]).toString()).toEqual("[3, 4]");
  });
  it("for each", () => {
    let a = "";
    ArrayList([1, 2, 3, 4, 5]).forEach(e => a = a + e);
    expect(a).toEqual("12345");
  });
  it("map numbers", () => {
    expect(ArrayList([3, 4]).map(n => `M${n}`).toString()).toEqual("[M3, M4]");
  });
  it("flatMap numberArray", () => {
    const list = ArrayList([10, 20]).flatMap(n => [n, n + 1]);
    expect(list.size()).toEqual(4);
    expect(list.toString()).toEqual("[10, 11, 20, 21]");
  });
  it("flatMap numberList", () => {
    const list = ArrayList([10, 20]).flatMap(n => ArrayList([n, n + 1]));
    expect(list.size()).toEqual(4);
    expect(list.toString()).toEqual("[10, 11, 20, 21]");
  });
  it("empty List", () => {
    expect(ArrayList().toString()).toEqual("[]");
  });
  it("filter", () => {
    expect(ArrayList([1, 2, 3, 4]).filter(e => e % 2 === 0).toString()).toEqual("[2, 4]");
  });
  it("reduceLeft", () => {
    expect(ArrayList([1, 2, 3, 4]).reduceLeft((acc, x) => acc + x, 0)).toEqual(10);
  });
  it("reduceRight", () => {
    expect(ArrayList([1, 2, 3, 4]).reduceRight((acc, x) => acc + x, 0)).toEqual(10);
  });
  it("get element", () => {
    const list = ArrayList([1, 2, 3, 4]);
    expect(list.get(2)).toEqual(3);
    expect(list.getOption(1).orElse(1111)).toEqual(2);
    expect(list.getOption(-1).orElse(1111)).toEqual(1111);
    expect(list.getOption(4).orElse(1111)).toEqual(1111);
  });
  it("toArray", () => {
    const list = ArrayList([1, 2, 3, 4]);
    const array = list.toArray();
    array[0] = 5;
    expect(list.toString()).toEqual("[1, 2, 3, 4]");
  });
  it("group by", () => {
    const list = ArrayList([new Abba("a", 2), new Abba("b", 1), new Abba("a", 3)]);
    expect(list.groupBy(e => e.name).toString()).toEqual("[[a=[name=a, x=2, name=a, x=3]], [b=[name=b, x=1]]]");
  });
});

describe("MutableArrayList", () => {
  it("empty list", () => {
    expect(MutableArrayList().toString()).toEqual("[]");
    expect(MutableArrayList().isEmpty()).toBeTruthy();
  });
  it("toString with numbers", () => {
    expect(MutableArrayList([3, 4]).toString()).toEqual("[3, 4]");
  });
  it("toString with strings", () => {
    expect(MutableArrayList(["3", "4"]).toString()).toEqual("[3, 4]");
  });
  it("for each", () => {
    let a = "";
    MutableArrayList([1, 2, 3, 4, 5]).forEach(e => a = a + e);
    expect(a).toEqual("12345");
  });
  it("map numbers", () => {
    expect(MutableArrayList([3, 4]).map(n => `M${n}`).toString()).toEqual("[M3, M4]");
  });
  it("flatMap numberArray", () => {
    const list = MutableArrayList([10, 20]).flatMap(n => [n, n + 1]);
    expect(list.size()).toEqual(4);
    expect(list.toString()).toEqual("[10, 11, 20, 21]");
  });
  it("flatMap numberList", () => {
    const list = MutableArrayList([10, 20]).flatMap(n => ArrayList([n, n + 1]));
    expect(list.size()).toEqual(4);
    expect(list.toString()).toEqual("[10, 11, 20, 21]");
  });
  it("empty List", () => {
    expect(MutableArrayList().toString()).toEqual("[]");
  });
  it("filter", () => {
    expect(MutableArrayList([1, 2, 3, 4]).filter(e => e % 2 === 0).toString()).toEqual("[2, 4]");
  });
  it("reduceLeft", () => {
    expect(MutableArrayList([1, 2, 3, 4]).reduceLeft((acc, x) => acc + x, 0)).toEqual(10);
  });
  it("reduceRight", () => {
    expect(MutableArrayList([1, 2, 3, 4]).reduceRight((acc, x) => acc + x, 0)).toEqual(10);
  });
  it("get element", () => {
    const list = MutableArrayList([1, 2, 3, 4]);
    expect(list.get(2)).toEqual(3);
    expect(list.getOption(1).orElse(1111)).toEqual(2);
    expect(list.getOption(-1).orElse(1111)).toEqual(1111);
    expect(list.getOption(4).orElse(1111)).toEqual(1111);
  });
  it("toArray", () => {
    const list = MutableArrayList([1, 2, 3, 4]);
    const array = list.toArray();
    array[0] = 5;
    expect(list.toString()).toEqual("[5, 2, 3, 4]");
  });
  it("toList", () => {
    const list = MutableArrayList([1, 2, 3, 4]).toList();
    const array = list.toArray();
    array[0] = 5;
    expect(list.toString()).toEqual("[1, 2, 3, 4]");
  });
  it("group by", () => {
    const list = MutableArrayList([new Abba("a", 2), new Abba("b", 1), new Abba("a", 3)]);
    expect(list.groupBy(e => e.name).toString()).toEqual("[[a=[name=a, x=2, name=a, x=3]], [b=[name=b, x=1]]]");
  });
});

class Abba {
  constructor(readonly name: string, readonly x: number){}
  toString = () => `name=${this.name}, x=${this.x}`;
}