import { describe, test, expect } from "@jest/globals";
import { eachCons } from "./eachCons";

describe("eachCons関数の単体テスト", () => {
  test("rubyのEnumerable#each_consメソッドのような挙動になるか", () => {
    const sampleArray = [1, 2, 3, 4, 5];
    const expectedValue = 1 + 2 + 3 + (2 + 3 + 4) + (3 + 4 + 5);

    let actualValue = 0;
    for (let arrayChunk of eachCons<number>(sampleArray, 3)) {
      actualValue += arrayChunk.reduce((v1, v2) => v1 + v2);
    }

    expect(actualValue).toBe(expectedValue);
  });
});
