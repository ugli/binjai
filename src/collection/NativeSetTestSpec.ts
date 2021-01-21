import {NativeSet} from "./NativeSet";

describe("NativeSet", () => {
    it("empty set", () => {
        expect(NativeSet.of().toString()).toEqual("[]");
        expect(NativeSet.of().isEmpty()).toBeTruthy();
    });
    it("toString with numbers", () => {
        expect(NativeSet.of(3, 4).toString()).toEqual("[3, 4]");
    });
    it("toString with strings", () => {
        expect(NativeSet.of("3", "4").toString()).toEqual("[3, 4]");
    });
    it("for each", () => {
        let a = "";
        NativeSet.of(1, 2, 3, 4, 5).forEach(e => a = a + e);
        expect(a).toEqual("12345");
    });
    it("for all", () => {
        expect(NativeSet.of(2, 4, 6).forAll(e => e % 2 == 0)).toBeTruthy();
        expect(NativeSet.of(2, 4, 6, 7).forAll(e => e % 2 == 0)).toBeFalsy();
    });
    it("exists", () => {
        expect(NativeSet.of(2, 4, 6).exists(e => e == 4)).toBeTruthy();
        expect(NativeSet.of(2, 4, 6, 7).exists(e => e == 0)).toBeFalsy();
    });
    it("contains", () => {
        expect(NativeSet.of(2, 4, 6).contains(4)).toBeTruthy();
        expect(NativeSet.of(2, 4, 6, 7).contains(5)).toBeFalsy();
    });
    it("find", () => {
        expect(NativeSet.of(2, 4, 6).find(e => e == 4).orElse(-1)).toBe(4);
        expect(NativeSet.of(2, 4, 6).find(e => e == 7).orElse(-1)).toBe(-1);
        expect(NativeSet.of(2, 4, 6, 4, 6).find(e => e == 6).orElse(-1)).toBe(6);
    });
    it("map numbers", () => {
        expect(NativeSet.of(3, 4).map(n => `M${n}`).toString()).toEqual("[M3, M4]");
    });
    it("flatMap numberArray", () => {
        const list = NativeSet.of(10, 20).flatMap(n => [n, n + 1]);
        expect(list.size()).toEqual(4);
        expect(list.toString()).toEqual("[10, 11, 20, 21]");
    });
    it("flatMap numberSet", () => {
        const list = NativeSet.of(10, 20).flatMap(n => NativeSet.of(n, n + 1));
        expect(list.size()).toEqual(4);
        expect(list.toString()).toEqual("[10, 11, 20, 21]");
    });
    it("filter", () => {
        expect(NativeSet.of(1, 2, 3, 4).filter(e => e % 2 === 0).toString()).toEqual("[2, 4]");
    });
    it("reduceLeft", () => {
        expect(NativeSet.of(1, 2, 3, 4).reduce((acc, x) => acc + x, 0)).toEqual(10);
    });
    it("toList", () => {
        expect(NativeSet.of(1, 2, 3, 4).toList().toString()).toEqual("[1, 2, 3, 4]");
    });
    it("toSet", () => {
        const numbers = NativeSet.of(1, 2, 3, 4).toSet();
        expect(numbers.size).toEqual(4);
        expect(numbers.has(1)).toBeTruthy();
        expect(numbers.has(2)).toBeTruthy();
        expect(numbers.has(3)).toBeTruthy();
        expect(numbers.has(4)).toBeTruthy();
        expect(numbers.has(5)).toBeFalsy();
    });
});
