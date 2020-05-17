import { Option } from "./Option";

describe("Option", () => {
  it("Some number", () => {
    expect(Option(3).orElse(2)).toEqual(3);
  });
  it("None number", () => {
    expect(Option(undefined).orElse(2)).toEqual(2);
  });
  it("Map to string", () => {
    expect(Option(3).map(e => `a${e}`).orElse("")).toEqual("a3");
  });
  it("Filter to None", () => {
    expect(Option(3).filter(() => false).orElse(-1)).toEqual(-1);
  });
  it("Filter to Some", () => {
    expect(Option(3).filter(() => true).orElse(-1)).toEqual(3);
  });
});