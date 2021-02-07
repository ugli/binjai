import {MutableNativeMap} from "./MutableNativeMap";
import {Entry} from "../Collection";

test("of", () => {
    expect(MutableNativeMap.of().toString()).toEqual("[]");
    expect(MutableNativeMap.of().isEmpty()).toBeTruthy();
    expect(MutableNativeMap.of([1,"w"]).toString()).toEqual("[[1=w]]")
    expect(MutableNativeMap.of([1,"w"], [2, "q"]).toString()).toEqual("[[1=w],[2=q]]")
});

test("from", () => {
    expect(MutableNativeMap.from([]).toString()).toEqual("[]");
    expect(MutableNativeMap.from([]).isEmpty()).toBeTruthy();
    expect(MutableNativeMap.from([new Entry(1, "w")]).toString()).toEqual("[[1=w]]");
    expect(MutableNativeMap.from([new Entry(1, "w"), new Entry(2,"q")]).toString())
        .toEqual("[[1=w],[2=q]]");
});

test("iterator", () => {
    const map = MutableNativeMap.of([1,"w"], [2, "q"]);
    let result = "";
    for (let e of map)
        result += e;
    expect(result).toEqual("[1=w][2=q]");
});

test("size", () => {
    const map = MutableNativeMap.of([1,"w"], [2, "q"]);
    expect(map.size()).toEqual(2);
});

test("contains", () => {
    const map = MutableNativeMap.of([1,"w"], [2, "q"]);
    expect(map.contains(1)).toBeTruthy();
    expect(map.contains(3)).toBeFalsy();
});

test("get", () => {
    const map = MutableNativeMap.of([1,"w"], [2, "q"]);
    expect(map.get(1).orElse("Q")).toEqual("w");
    expect(map.get(3).orElse("Q")).toEqual("Q");
});

test("forEach", () => {
    let result = "";
    MutableNativeMap.of([1,"w"], [2, "q"]).forEach(e => result += e);
    expect(result).toEqual("[1=w][2=q]");
});

test("put", () => {
    const map = MutableNativeMap.of();
    expect(map.size()).toEqual(0);
    map.put(4, "A");
    expect(map.toString()).toEqual("[[4=A]]")
});

test("clear", () => {
    const map = MutableNativeMap.of([1,2]);
    expect(map.isEmpty()).toBeFalsy();
    map.clear();
    expect(map.isEmpty()).toBeTruthy();
});

test("toImmutable", () => {
    const map1 = MutableNativeMap.of([1,"w"], [2, "q"]);
    expect(map1.toString()).toEqual("[[1=w],[2=q]]");
    const map2 = map1.toImmutable();
    expect(map2.toString()).toEqual("[[1=w],[2=q]]");
    map1.put(3, "f");
    expect(map2.toString()).toEqual("[[1=w],[2=q]]");
    expect(map1.toString()).toEqual("[[1=w],[2=q],[3=f]]");
});

test("toMap", () => {
    const map1 = MutableNativeMap.of([1,"w"], [2, "q"]);
    const map2 = map1.toMap();
    map1.put(3, "f");
    expect(map2.size).toEqual(2);
    expect(map1.size()).toEqual(3);
});
