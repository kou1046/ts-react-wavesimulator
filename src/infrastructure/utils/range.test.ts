import { expect, describe, test } from "@jest/globals";
import { range } from "./range";

describe("range関数の単体テスト", () => {
  test("for文を意図的な挙動で回すことが出来る ", () => {
    const expectValue = 0 + 1 + 2 + 3 + 4;

    let actualValue = 0;
    for (const i of range(0, 5)) {
      actualValue += i;
    }
    expect(actualValue).toBe(expectValue);
  });
  test("二つのrange関数を意図的な挙動で回すことが出来る", () => {
    const expectValue = (0 + 1 + 2 + 3 + 4) * 2;

    let actualValue = 0;
    const range2 = range(0, 5);
    for (const i of range(0, 5)) {
      const value2 = range2.next().value!;
      actualValue += i + value2;
    }
    expect(actualValue).toBe(expectValue);
  });
});
