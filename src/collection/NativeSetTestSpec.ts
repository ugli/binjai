import {NativeSet} from "./NativeSet";

test("empty set", () => {
    expect(NativeSet.of().toString()).toEqual("[]");
    expect(NativeSet.of().isEmpty()).toBeTruthy();
});

test("should contain unique values", () => {
    expect(NativeSet.of(1,2,3,2,1).toString()).toEqual("[1,2,3]");
    expect(NativeSet.of("1","2","3","2","1").toString()).toEqual("[1,2,3]");
    expect(NativeSet.of(true, false, true).toString()).toEqual("[true,false]");
});

test("toString with numbers", () => {
    expect(NativeSet.of(3, 4).toString()).toEqual("[3,4]");
});

test("toString with strings", () => {
    expect(NativeSet.of("3", "4").toString()).toEqual("[3,4]");
});

test("for each", () => {
    let a = "";
    NativeSet.of(1, 2, 3, 4, 5).forEach(e => a = a + e);
    expect(a).toEqual("12345");
});

test("for all", () => {
    expect(NativeSet.of(2, 4, 6).forAll(e => e % 2 == 0)).toBeTruthy();
    expect(NativeSet.of(2, 4, 6, 7).forAll(e => e % 2 == 0)).toBeFalsy();
});

test("exists", () => {
    expect(NativeSet.of(2, 4, 6).exists(e => e == 4)).toBeTruthy();
    expect(NativeSet.of(2, 4, 6, 7).exists(e => e == 0)).toBeFalsy();
});

test("contains", () => {
    expect(NativeSet.of(2, 4, 6).contains(4)).toBeTruthy();
    expect(NativeSet.of(2, 4, 6, 7).contains(5)).toBeFalsy();
});

test("find", () => {
    expect(NativeSet.of(2, 4, 6).find(e => e == 4).orElse(-1)).toBe(4);
    expect(NativeSet.of(2, 4, 6).find(e => e == 7).orElse(-1)).toBe(-1);
    expect(NativeSet.of(2, 4, 6, 4, 6).find(e => e == 6).orElse(-1)).toBe(6);
});

test("map numbers", () => {
    expect(NativeSet.of(3, 4).map(n => `M${n}`).toString()).toEqual("[M3,M4]");
});

test("flatMap numberArray", () => {
    const list = NativeSet.of(10, 20).flatMap(n => [n, n + 1]);
    expect(list.size()).toEqual(4);
    expect(list.toString()).toEqual("[10,11,20,21]");
});

test("flatMap numberSet", () => {
    const list = NativeSet.of(10, 20).flatMap(n => NativeSet.of(n, n + 1));
    expect(list.size()).toEqual(4);
    expect(list.toString()).toEqual("[10,11,20,21]");
});

test("filter", () => {
    expect(NativeSet.of(1, 2, 3, 4).filter(e => e % 2 === 0).toString()).toEqual("[2,4]");
});

test("reduceLeft", () => {
    expect(NativeSet.of(1, 2, 3, 4).reduce((acc, x) => acc + x, 0)).toEqual(10);
});

test("toList", () => {
    expect(NativeSet.of(1, 2, 3, 4).toList().toString()).toEqual("[1,2,3,4]");
});

test("toSet", () => {
    const numbers = NativeSet.of(1, 2, 3, 4).toSet();
    expect(numbers.size).toEqual(4);
    expect(numbers.has(1)).toBeTruthy();
    expect(numbers.has(2)).toBeTruthy();
    expect(numbers.has(3)).toBeTruthy();
    expect(numbers.has(4)).toBeTruthy();
    expect(numbers.has(5)).toBeFalsy();
});


test("toMutable", () => {
    const set1 = NativeSet.of(1, 2, 3, 4);
    const set2 = set1.toMutable();
    expect(set1.toString()).toEqual("[1,2,3,4]");
    expect(set2.toString()).toEqual("[1,2,3,4]");
    set2.add(8);
    expect(set1.toString()).toEqual("[1,2,3,4]");
    expect(set2.toString()).toEqual("[1,2,3,4,8]");
});
