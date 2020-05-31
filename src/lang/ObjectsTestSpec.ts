import { Objects } from "./Objects";

describe("Objects", () => {
  it("hashcode", () => {
    expect(Objects.hashCode(undefined)).toEqual(0);
    expect(Objects.hashCode("Hej")).toEqual(72429);
    expect(Objects.hashCode(345345)).toEqual(1509739392);
    expect(Objects.hashCode(true)).toEqual(1231);
    expect(Objects.hashCode(false)).toEqual(1237);
    expect(Objects.hashCode([1, 2, 3])).toEqual(603453178);
    expect(Objects.hashCode([1, 2, 3, 4, 5, 6, 7, 8, 9])).toEqual(-1369096933);
    expect(Objects.hashCode({a: 3})).toEqual(-1442153924);
  });
  it("create", () => {
    expect(Objects.create(String).valueOf()).toEqual("");
    expect(Objects.create(Number).valueOf()).toEqual(0);
  });

});