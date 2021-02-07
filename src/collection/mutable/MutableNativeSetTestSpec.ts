import {MutableNativeSet} from "./MutableNativeSet";
import {NativeSet} from "../NativeSet";

test("empty list", () => {
    expect(MutableNativeSet.of().toString()).toEqual("[]");
    expect(MutableNativeSet.of().isEmpty()).toBeTruthy();
});

test("toString with numbers", () => {
    expect(MutableNativeSet.of(3, 4).toString()).toEqual("[3,4]");
});

test("toString with strings", () => {
    expect(MutableNativeSet.of("3", "4").toString()).toEqual("[3,4]");
});

test("iterator", () => {
    const set = MutableNativeSet.of("3", "4");
    let result = "";
    for (let e of set)
        result += e;
    expect(result).toEqual("34");
});

test("size", () => {
    const set = MutableNativeSet.of("3", "4");
    expect(set.size()).toEqual(2);
});


test("for each", () => {
    let a = "";
    MutableNativeSet.of(1, 2, 3, 4, 5).forEach(e => a = a + e);
    expect(a).toEqual("12345");
});

test("for all", () => {
    expect(MutableNativeSet.of(2, 4, 6).forAll(e => e % 2 == 0)).toBeTruthy();
    expect(MutableNativeSet.of(2, 4, 6, 7).forAll(e => e % 2 == 0)).toBeFalsy();
});

test("exists", () => {
    expect(MutableNativeSet.of(2, 4, 6).exists(e => e == 4)).toBeTruthy();
    expect(MutableNativeSet.of(2, 4, 6, 7).exists(e => e == 0)).toBeFalsy();
});

test("contains", () => {
    expect(MutableNativeSet.of(2, 4, 6).contains(4)).toBeTruthy();
    expect(MutableNativeSet.of(2, 4, 6, 7).contains(5)).toBeFalsy();
});

test("find", () => {
    expect(MutableNativeSet.of(2, 4, 6).find(e => e == 4).orElse(-1)).toBe(4);
    expect(MutableNativeSet.of(2, 4, 6).find(e => e == 7).orElse(-1)).toBe(-1);
    expect(MutableNativeSet.of(2, 4, 6, 4, 6).find(e => e == 6).orElse(-1)).toBe(6);
});


test("toArray", () => {
    const set = MutableNativeSet.of(1, 2, 3, 4);
    const array = set.toArray();
    array[0] = 5;
    expect(set.toString()).toEqual("[1,2,3,4]");
});

test("toSet", () => {
    expect(MutableNativeSet.of(1, 2, 3).toSet().toString()).toEqual("[1,2,3]");
    expect(MutableNativeSet.of(1, 2, 3, 2).toSet().toString()).toEqual("[1,2,3]");
});

test("toList", () => {
    expect(MutableNativeSet.of(1, 2, 3, 2).toList().toString()).toEqual("[1,2,3]");
});

test("add", () => {
    const set = MutableNativeSet.of<number>();
    set.add(1);
    set.add(1);
    set.add(8);
    expect(set.toString()).toEqual("[1,8]")
});

test("addAll", () => {
    const set = MutableNativeSet.of<number>();
    set.addAll(NativeSet.of(1,2,3,4,7,1,2));
    expect(set.toString()).toEqual("[1,2,3,4,7]")
});

test("clear", () => {
    const set = MutableNativeSet.of(1,2,3,4,7);
    set.clear();
    expect(set.isEmpty()).toBeTruthy();
});

test("remove", () => {
    const set = MutableNativeSet.of(1,2,3,4,7);
    set.remove(4);
    expect(set.toString()).toEqual("[1,2,3,7]")
});

test("removeAll", () => {
    const set = MutableNativeSet.of(1,2,3,4,7);
    set.removeAll([3,4]);
    expect(set.toString()).toEqual("[1,2,7]")
});
