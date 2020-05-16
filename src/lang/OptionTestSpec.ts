import {Options} from "./Option";

describe("Option", () => {
    it("Some number", () => {
      expect(Options.from(3).orElse(2)).toEqual(3);
    });
    it("None number", () => {
      expect(Options.from(undefined).orElse(2)).toEqual(2);
    });
    it("Map to string", () => {
      expect(Options.from(3).map(e => `a${e}`).orElse("")).toEqual("a3");
    });
    it("Filter to None", () => {
      expect(Options.from(3).filter(e => false).orElse(-1)).toEqual(-1);
    });
    it("Filter to Some", () => {
      expect(Options.from(3).filter(e => true).orElse(-1)).toEqual(3);
    });
  });