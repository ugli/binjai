import {NativeMap} from "./NativeMap";
import {Entry} from "./Collection";

test("of", () => {
    expect(NativeMap.of().toString()).toEqual("[]");
    expect(NativeMap.of().isEmpty()).toBeTruthy();
    expect(NativeMap.of([1,"w"]).toString()).toEqual("[[1=w]]")
    expect(NativeMap.of([1,"w"], [2, "q"]).toString()).toEqual("[[1=w],[2=q]]")
});

test("from", () => {
    expect(NativeMap.from([]).toString()).toEqual("[]");
    expect(NativeMap.from([]).isEmpty()).toBeTruthy();
    expect(NativeMap.from([new Entry<number, string>(1, "w")]).toString()).toEqual("[[1=w]]");
    expect(NativeMap.from([new Entry<number, string>(1, "w"), new Entry(2,"q")]).toString())
        .toEqual("[[1=w],[2=q]]");
});

test("iterator", () => {
    const map = NativeMap.of([1,"w"], [2, "q"]);
    let result = "";
    for (let e of map)
        result += e;
    expect(result).toEqual("[1=w][2=q]");
});

test("size", () => {
    const map = NativeMap.of([1,"w"], [2, "q"]);
    expect(map.size()).toEqual(2);
});

test("contains", () => {
    const map = NativeMap.of([1,"w"], [2, "q"]);
    expect(map.contains(1)).toBeTruthy();
    expect(map.contains(3)).toBeFalsy();
});

test("get", () => {
    const map = NativeMap.of([1,"w"], [2, "q"]);
    expect(map.get(1).orElse("Q")).toEqual("w");
    expect(map.get(3).orElse("Q")).toEqual("Q");
});

test("forEach", () => {
    let result = "";
    NativeMap.of([1,"w"], [2, "q"]).forEach(e => result += e);
    expect(result).toEqual("[1=w][2=q]");
});

test("filter", () => {
    const result = NativeMap.of([1,"w"], [2, "q"]).filter(t => t.value == "q").toString();
    expect(result).toEqual("[[2=q]]");
});

test("map", () => {
    const result = NativeMap.of([1,"w"], [2, "q"]).map(t => t.value).toString();
    expect(result).toEqual("[w,q]");
});


test("flatMap", () => {
    const result = NativeMap.of([1,"w"], [2, "q"]).flatMap(t => [t.key, t.value]).toString();
    expect(result).toEqual("[1,w,2,q]");
});

test("toMutable", () => {
    const map1 = NativeMap.of([1,"w"], [2, "q"]);
    expect(map1.toString()).toEqual("[[1=w],[2=q]]");
    const map2 = map1.toMutable();
    expect(map2.toString()).toEqual("[[1=w],[2=q]]");
    map2.put(3, "f");
    expect(map2.toString()).toEqual("[[1=w],[2=q],[3=f]]");
    expect(map1.toString()).toEqual("[[1=w],[2=q]]");
});

test("toMap", () => {
    const map1 = NativeMap.of([1,"w"], [2, "q"]);
    const map2 = map1.toMap();
    map2.set(3, "f");
    expect(map2.size).toEqual(3);
    expect(map1.size()).toEqual(2);
});

