import { MutableNativeMap } from "./Map";


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
    expect(map.toString()).toEqual("[[1=q], [2=a]]");
  });
});