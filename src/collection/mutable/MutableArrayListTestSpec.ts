import {MutableArrayList} from "./MutableArrayList";
import {NativeSet} from "../NativeSet";

test("empty list", () => {
    expect(MutableArrayList.of().toString()).toEqual("[]");
    expect(MutableArrayList.of().isEmpty()).toBeTruthy();
});

test("toString with numbers", () => {
    expect(MutableArrayList.of(3, 4).toString()).toEqual("[3,4]");
});

test("toString with strings", () => {
    expect(MutableArrayList.of("3", "4").toString()).toEqual("[3,4]");
});

test("iterator", () => {
    const list = MutableArrayList.of("3", "4");
    let result = "";
    for (let e of list)
        result += e;
    expect(result).toEqual("34");
});

test("size", () => {
    const list = MutableArrayList.of("3", "4");
    expect(list.size()).toEqual(2);
});


test("for each", () => {
    let a = "";
    MutableArrayList.of(1, 2, 3, 4, 5).forEach(e => a = a + e);
    expect(a).toEqual("12345");
});

test("for all", () => {
    expect(MutableArrayList.of(2, 4, 6).forAll(e => e % 2 == 0)).toBeTruthy();
    expect(MutableArrayList.of(2, 4, 6, 7).forAll(e => e % 2 == 0)).toBeFalsy();
});

test("exists", () => {
    expect(MutableArrayList.of(2, 4, 6).exists(e => e == 4)).toBeTruthy();
    expect(MutableArrayList.of(2, 4, 6, 7).exists(e => e == 0)).toBeFalsy();
});

test("contains", () => {
    expect(MutableArrayList.of(2, 4, 6).contains(4)).toBeTruthy();
    expect(MutableArrayList.of(2, 4, 6, 7).contains(5)).toBeFalsy();
});

test("find", () => {
    expect(MutableArrayList.of(2, 4, 6).find(e => e == 4).orElse(-1)).toBe(4);
    expect(MutableArrayList.of(2, 4, 6).find(e => e == 7).orElse(-1)).toBe(-1);
    expect(MutableArrayList.of(2, 4, 6, 4, 6).find(e => e == 6).orElse(-1)).toBe(6);
});

test("indexOf", () => {
    expect(MutableArrayList.of(2, 4, 6, 4).firstIndexOf(4)).toBe(1);
    expect(MutableArrayList.of(2, 4, 6, 4).firstIndexOf(5)).toBe(-1);
    expect(MutableArrayList.of(2, 4, 6, 4).lastIndexOf(4)).toBe(3);
    expect(MutableArrayList.of(2, 4, 6, 4).lastIndexOf(5)).toBe(-1);
});



test("get element", () => {
    const list = MutableArrayList.of(1, 2, 3, 4);
    expect(list.get(2).orElse(1231)).toEqual(3);
    expect(list.get(1).orElse(1111)).toEqual(2);
    expect(list.get(-1).orElse(1111)).toEqual(1111);
    expect(list.get(4).orElse(1111)).toEqual(1111);
});

test("toArray", () => {
    const list = MutableArrayList.of(1, 2, 3, 4);
    const array = list.toArray();
    array[0] = 5;
    expect(list.toString()).toEqual("[1,2,3,4]");
});



test("sort", () => {
    const list1 = MutableArrayList.of(3, 4, 1, 2, 5, 6, 7, 8, 9);
    list1.sort();
    expect(list1.toString()).toEqual("[1,2,3,4,5,6,7,8,9]");
    const list2 = MutableArrayList.of(3, 4, 1, 2, 5, 6, 7, 8, 9);
    list2.sort((a, b) => {
        if (a == b) return 0;
        return (a < b) ? 1 : -1;
    });
    expect(list2.toString()).toEqual("[9,8,7,6,5,4,3,2,1]");
});

test("reverse", () => {
    const list = MutableArrayList.of(1, 2, 3, 4, 5, 6, 7, 8, 9);
    list.reverse();
    expect(list.toString()).toEqual("[9,8,7,6,5,4,3,2,1]");
});

test("toSet", () => {
    expect(MutableArrayList.of(1, 2, 3).toSet().toString()).toEqual("[1,2,3]");
    expect(MutableArrayList.of(1, 2, 3, 2).toSet().toString()).toEqual("[1,2,3]");
});

test("toList", () => {
    expect(MutableArrayList.of(1, 2, 3, 2).toList().toString()).toEqual("[1,2,3,2]");
});

test("add", () => {
    const list = MutableArrayList.of<number>();
    list.add(1);
    list.add(8);
    expect(list.toString()).toEqual("[1,8]")
});

test("addAll", () => {
    const list = MutableArrayList.of<number>();
    list.addAll(NativeSet.of(1,2,3,4,7));
    expect(list.toString()).toEqual("[1,2,3,4,7]")
});

test("clear", () => {
    const list = MutableArrayList.of(1,2,3,4,7);
    list.clear();
    expect(list.isEmpty()).toBeTruthy();
});

test("remove", () => {
    const list = MutableArrayList.of(1,2,3,4,7);
    list.remove(4);
    expect(list.toString()).toEqual("[1,2,3,7]")
});

test("removeAll", () => {
    const list = MutableArrayList.of(1,2,3,4,7);
    list.removeAll([3,4]);
    expect(list.toString()).toEqual("[1,2,7]")
});
