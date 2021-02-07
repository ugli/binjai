import { Option } from "./Option";

test("isDefined", () => {
  expect(Option(3).isDefined()).toBeTruthy();
  expect(Option().isDefined()).toBeFalsy();
  expect(Option(undefined).isDefined()).toBeFalsy();
});

test("orElse", () => {
  expect(Option(3).orElse(2)).toEqual(3);
  expect(Option().orElse(2)).toEqual(2);
});

test("orUndefined", () => {
  expect(Option(3).orUndefined()).toBeTruthy();
  expect(Option().orUndefined()).toBeFalsy();
});

test("orThrow", () => {
  expect(Option(3).orThrow(new Error("ops"))).toEqual(3);
  expect(() => Option().orThrow(new Error("ops"))).toThrow("ops");
});

test("map", () => {
  expect(Option(3).map(e => `a${e}`).orElse("")).toEqual("a3");
  expect(Option().map(e => `a${e}`).orElse("aaa")).toEqual("aaa");
});

test("filter", () => {
  expect(Option().filter(() => true).orElse(-1)).toEqual(-1);
  expect(Option(3).filter(() => false).orElse(-1)).toEqual(-1);
  expect(Option(3).filter(() => true).orElse(-1)).toEqual(3);
});

test("toString", () => {
  expect(Option(3).toString()).toEqual("Some(3)");
  expect(Option().toString()).toEqual("None()");
});
