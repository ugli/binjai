import { ArrayList, List } from "./List";

describe("ArrayList", () => {
  it("empty list", () => {
    expect(List().toString()).toEqual("[]");
    expect(List().isEmpty()).toBeTruthy();
  });
  it("toString with numbers", () => {
    expect(ArrayList([3, 4]).toString()).toEqual("[3, 4]");
  });
  it("toString with strings", () => {
    expect(ArrayList([3, 4]).toString()).toEqual("[3, 4]");
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
  it("concat Collection", () => {
    expect(ArrayList([3, 4]).concat(ArrayList([1, 2])).toString()).toEqual("[3, 4, 1, 2]");
  });
  it("concat array", () => {
    expect(ArrayList([3, 4]).concat([1, 2]).toString()).toEqual("[3, 4, 1, 2]");
  });
  it("filter", () => {
    expect(ArrayList([1, 2, 3, 4]).filter(e => e % 2 === 0).toString()).toEqual("[2, 4]");
  });
  it("get element", () => {
    const list = ArrayList([1, 2, 3, 4]);
    expect(list.get(2)).toEqual(3);
    expect(() => list.get(-1)).toThrow("Index out of bounds[0, 4], index: -1");
    expect(() => list.get(4)).toThrow("Index out of bounds[0, 4], index: 4");
  });
  it("toArray copy", () => {
    const list = ArrayList([1, 2, 3, 4]);
    list.toArrayCopy()[0] = 5;
    expect(list.toString()).toEqual("[1, 2, 3, 4]");
  });
  it("toArray no copy", () => {
    const list = ArrayList([1, 2, 3, 4]);
    list.toArray()[0] = 5;
    expect(list.toString()).toEqual("[5, 2, 3, 4]");
  });

});