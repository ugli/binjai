import { ImmutableNativeSet, ImmutableHashSet } from "./Set";

describe("ImmutableNativeSet", () => {
  it("empty set", () => {
    expect(ImmutableNativeSet().toString()).toEqual("[]");
    expect(ImmutableNativeSet().isEmpty()).toBeTruthy();
  });
  it("toString with numbers", () => {
    expect(ImmutableNativeSet([3, 4]).toString()).toEqual("[3, 4]");
  });
  it("toString with strings", () => {
    expect(ImmutableNativeSet([3, 4]).toString()).toEqual("[3, 4]");
  });
  it("mkString", () => {
    expect(ImmutableNativeSet([3, 4]).mkString()).toEqual("3 4");
  });
  it("contains", () => {
    expect(ImmutableNativeSet([3, 4]).contains(3)).toBeTruthy();
    expect(ImmutableNativeSet([3, 4]).contains(5)).toBeFalsy();
  });
  it("for each", () => {
    let a = "";
    ImmutableNativeSet([1, 2, 3, 4, 5]).forEach(e => a = a + e);
    expect(a).toEqual("12345");
  });
  it("map numbers", () => {
    expect(ImmutableNativeSet([3, 4]).map(n => `M${n}`).toString()).toEqual("[M3, M4]");
  });
  it("flatMap numberArray", () => {
    const list = ImmutableNativeSet([10, 20]).flatMap(n => [n, n + 1]);
    expect(list.size()).toEqual(4);
    expect(list.toString()).toEqual("[10, 11, 20, 21]");
  });
  it("flatMap numberList", () => {
    const list = ImmutableNativeSet([10, 20]).flatMap(n => ImmutableNativeSet([n, n + 1]));
    expect(list.size()).toEqual(4);
    expect(list.toString()).toEqual("[10, 11, 20, 21]");
  });
  it("empty List", () => {
    expect(ImmutableNativeSet().toString()).toEqual("[]");
  });
  it("filter", () => {
    expect(ImmutableNativeSet([1, 2, 3, 4]).filter(e => e % 2 === 0).toString()).toEqual("[2, 4]");
  });
  it("reduceLeft", () => {
    expect(ImmutableNativeSet([1, 2, 3, 4]).reduceLeft((acc, x) => acc + x, 0)).toEqual(10);
  });
  it("reduceRight", () => {
    expect(ImmutableNativeSet([1, 2, 3, 4]).reduceRight((acc, x) => acc + x, 0)).toEqual(10);
  });
  it("toArray", () => {
    const list = ImmutableNativeSet([1, 2, 3, 4]);
    const array = list.toArray();
    array[0] = 5;
    expect(list.toString()).toEqual("[1, 2, 3, 4]");
  });
});

describe("ImmutableHashSet", () => {
  it("empty set", () => {
    expect(ImmutableHashSet().toString()).toEqual("[]");
    expect(ImmutableHashSet().isEmpty()).toBeTruthy();
  });
  it("toString with numbers", () => {
    expect(ImmutableHashSet([3, 4]).toString()).toEqual("[3, 4]");
  });
  it("toString with strings", () => {
    expect(ImmutableHashSet([3, 4]).toString()).toEqual("[3, 4]");
  });
  it("mkString", () => {
    expect(ImmutableHashSet([3, 4]).mkString()).toEqual("3 4");
  });
  it("contains", () => {
    expect(ImmutableHashSet([3, 4]).contains(3)).toBeTruthy();
    expect(ImmutableHashSet([3, 4]).contains(5)).toBeFalsy();
  });
  it("for each", () => {
    let a = "";
    ImmutableHashSet([1, 2, 3, 4, 5]).forEach(e => a = a + e);
    expect(a).toEqual("12345");
  });
  it("map numbers", () => {
    expect(ImmutableHashSet([3, 4]).map(n => `M${n}`).toString()).toEqual("[M3, M4]");
  });
  it("flatMap numberArray", () => {
    const list = ImmutableHashSet([10, 20]).flatMap(n => [n, n + 1]);
    expect(list.size()).toEqual(4);
    expect(list.toString()).toEqual("[10, 11, 20, 21]");
  });
  it("flatMap numberList", () => {
    const list = ImmutableHashSet([10, 20]).flatMap(n => ImmutableHashSet([n, n + 1]));
    expect(list.size()).toEqual(4);
    expect(list.toString()).toEqual("[10, 11, 20, 21]");
  });
  it("empty List", () => {
    expect(ImmutableHashSet().toString()).toEqual("[]");
  });
  it("filter", () => {
    expect(ImmutableHashSet([1, 2, 3, 4]).filter(e => e % 2 === 0).toString()).toEqual("[2, 4]");
  });
  it("reduceLeft", () => {
    expect(ImmutableHashSet([1, 2, 3, 4]).reduceLeft((acc, x) => acc + x, 0)).toEqual(10);
  });
  it("reduceRight", () => {
    expect(ImmutableHashSet([1, 2, 3, 4]).reduceRight((acc, x) => acc + x, 0)).toEqual(10);
  });
  it("toArray", () => {
    const list = ImmutableHashSet([1, 2, 3, 4]);
    const array = list.toArray();
    array[0] = 5;
    expect(list.toString()).toEqual("[1, 2, 3, 4]");
  });
});