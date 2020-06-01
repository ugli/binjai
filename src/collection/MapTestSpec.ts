import { MutableNativeMap, Entry, ImmutableNativeMap } from "./Map";


describe("ImmutableNativeMap", () => {
  it("get", () => {
    const map = ImmutableNativeMap([[3, "a"]]);
    expect(map.get(3).orElse("x")).toEqual("a");
    expect(map.get(4).orElse("x")).toEqual("x");
  });

  it("empty set", () => {
    expect(ImmutableNativeMap().toString()).toEqual("[]");
    expect(ImmutableNativeMap().isEmpty()).toBeTruthy();
  });
  it("mkString", () => {
    expect(ImmutableNativeMap([[3, "a"], [4, "b"]]).mkString()).toEqual("[3=a] [4=b]");
  });
  it("contains", () => {
    expect(ImmutableNativeMap([[3, "a"], [4, "b"]]).containsKey(3)).toBeTruthy();
    expect(ImmutableNativeMap([[3, "a"], [4, "b"]]).containsKey(5)).toBeFalsy();
  });
  it("for each", () => {
    let a = "";
    ImmutableNativeMap([[1, "a"], [2, "a"], [3, "a"], [4, "a"], [5, "b"]]).forEach(e => a = a + e.key);
    expect(a).toEqual("12345");
  });
  it("map entries", () => {
    expect(ImmutableNativeMap([[1, "a"], [2, "b"], [3, "c"], [4, "d"]]).map((x) => `${x.value}${x.key}`).toString())
      .toEqual("[a1, b2, c3, d4]");
  });
  it("flatMap numberArray", () => {
    expect(ImmutableNativeMap([[10, "a"],[20, "a"]]).flatMap(x => [x.key, x.key+1]).toString()).toEqual("[10, 11, 20, 21]");
  });
  it("filter", () => {
    expect(ImmutableNativeMap([[3, "a"], [4, "b"]]).filter(e => e.key % 2 === 0).toString()).toEqual("[[4=b]]");
  });
  it("reduceLeft", () => {
    expect(ImmutableNativeMap([[1, "a"], [2, "a"], [3, "a"], [4, "a"]]).reduceLeft((acc, x) => acc + x.key, 0)).toEqual(10);
  });
  it("reduceRight", () => {
    expect(ImmutableNativeMap([[1, "a"], [2, "a"], [3, "a"], [4, "a"]]).reduceRight((acc, x) => acc + x.key, 0)).toEqual(10);
  });
  it("toArray", () => {
    const list = ImmutableNativeMap([[3, "a"], [4, "b"]]);
    const array = list.toArray();
    array[0] = new Entry(7, "z");
    expect(list.toString()).toEqual("[[3=a], [4=b]]");
  });
});

describe("MutableNativeMap", () => {
  it("put & get", () => {
    const map = MutableNativeMap<string, string>();
    map.put("apa", "bapa");
    expect(map.get("apa").orElse("x")).toEqual("bapa");
    expect(map.get("papa").orElse("x")).toEqual("x");
  });
  it("toString", () => {
    const map = MutableNativeMap<number, string>();
    map.put(1, "q");
    map.put(2, "a");
    expect(map.toString()).toEqual("[[1=q], [2=a]]");
  });
  it("empty set", () => {
    expect(MutableNativeMap().toString()).toEqual("[]");
    expect(MutableNativeMap().isEmpty()).toBeTruthy();
  });

  it("mkString", () => {
    expect(MutableNativeMap([[3, "a"], [4, "b"]]).mkString()).toEqual("[3=a] [4=b]");
  });
  it("contains", () => {
    expect(MutableNativeMap([[3, "a"], [4, "b"]]).containsKey(3)).toBeTruthy();
    expect(MutableNativeMap([[3, "a"], [4, "b"]]).containsKey(5)).toBeFalsy();
  });
  it("for each", () => {
    let a = "";
    MutableNativeMap([[1, "a"], [2, "a"], [3, "a"], [4, "a"], [5, "b"]]).forEach(e => a = a + e.key);
    expect(a).toEqual("12345");
  });
  it("map entries", () => {
    expect(ImmutableNativeMap([[1, "a"], [2, "b"], [3, "c"], [4, "d"]]).map((x) => `${x.value}${x.key}`).toString())
      .toEqual("[a1, b2, c3, d4]");
  });
  it("flatMap numberArray", () => {
    expect(ImmutableNativeMap([[10, "a"],[20, "a"]]).flatMap(x => [x.key, x.key+1]).toString()).toEqual("[10, 11, 20, 21]");
  });
  it("filter", () => {
    expect(MutableNativeMap([[3, "a"], [4, "b"]]).filter(e => e.key % 2 === 0).toString()).toEqual("[[4=b]]");
  });
  it("reduceLeft", () => {
    expect(MutableNativeMap([[1, "a"], [2, "a"], [3, "a"], [4, "a"]]).reduceLeft((acc, x) => acc + x.key, 0)).toEqual(10);
  });
  it("reduceRight", () => {
    expect(MutableNativeMap([[1, "a"], [2, "a"], [3, "a"], [4, "a"]]).reduceRight((acc, x) => acc + x.key, 0)).toEqual(10);
  });
  it("toArray", () => {
    const list = MutableNativeMap([[3, "a"], [4, "b"]]);
    const array = list.toArray();
    array[0] = new Entry(7, "z");
    expect(list.toString()).toEqual("[[3=a], [4=b]]");
  });
});