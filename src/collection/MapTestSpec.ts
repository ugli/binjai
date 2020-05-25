import { MutableHashMap, MutableNativeMap } from "./Map";

describe("HashMap", () => {
  it("put & get", () => {
    const map = MutableHashMap<string, string>();
    map.put("apa", "bapa");
    expect(map.get("apa").orElse("x")).toEqual("bapa");
  });
  it("keys, values, entries", () => {
    const map = MutableHashMap<number, string>();
    map.put(1, "q");
    map.put(2, "a");
    expect(map.keys().toString()).toEqual("[1, 2]");
    expect(map.values().toString()).toEqual("[q, a]");
    expect(map.entries().toString()).toEqual("[[1=q], [2=a]]");
  });

});

describe("NativeMap", () => {
  it("put & get", () => {
    const map = MutableNativeMap<string, string>();
    map.put("apa", "bapa");
    expect(map.get("apa").orElse("x")).toEqual("bapa");
  });
  it("keys, values, entries", () => {
    const map = MutableNativeMap<number, string>();
    map.put(1, "q");
    map.put(2, "a");
    expect(map.keys().toString()).toEqual("[1, 2]");
    expect(map.values().toString()).toEqual("[q, a]");
    expect(map.entries().toString()).toEqual("[[1=q], [2=a]]");
  });
});