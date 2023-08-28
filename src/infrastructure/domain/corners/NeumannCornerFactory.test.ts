import { describe, expect, test } from "@jest/globals";
import { diricreCornerFactory } from "./DiricreCornerFactory";
import {
  NeumannBottomWall,
  NeumannLeftWall,
  NeumannRightWall,
  NeumannTopWall,
} from "../walls/NeumannWall";
import {
  LeftTopCorner,
  RightBottomCorner,
  RightTopCorner,
  LeftBottomCorner,
} from "./Corner";

describe("固定端角生成器の単体テスト", () => {
  test("時計回りの順番でかつ, 垂直に交わる2つの壁を渡したときに適切な向きの角を生成できる", () => {
    const width = 3;
    const height = 3;

    const bottomWall = new NeumannBottomWall([width, 0], [0, 0]);
    const leftWall = new NeumannLeftWall([0, 0], [0, height]);
    const topWall = new NeumannTopWall([0, width], [height, height]);
    const rightWall = new NeumannRightWall([width, width], [height, 0]);

    expect(diricreCornerFactory.create(bottomWall, leftWall)).toBeInstanceOf(
      LeftBottomCorner
    );
    expect(diricreCornerFactory.create(leftWall, topWall)).toBeInstanceOf(
      LeftTopCorner
    );
    expect(diricreCornerFactory.create(topWall, rightWall)).toBeInstanceOf(
      RightTopCorner
    );
    expect(diricreCornerFactory.create(rightWall, bottomWall)).toBeInstanceOf(
      RightBottomCorner
    );
  });
  test("時計回りの順番でかつ, 垂直に交わる2つの壁を渡したときに適切な向きの角を生成できる", () => {
    const bottomWall = new NeumannBottomWall([0.5, 1.0], [0.7, 1.0]);
    const leftWall = new NeumannLeftWall([0.7, 1.0], [0.7, 0.7]);
    const bottomWall2 = new NeumannBottomWall([0.7, 0.7], [1.0, 0.7]);

    const leftWall2 = new NeumannLeftWall([1.0, 0.7], [1.0, 0.2]);
    const topWall = new NeumannTopWall([1.0, 0.2], [0.5, 0.2]);
    const rightWall2 = new NeumannRightWall([0.5, 0.2], [0.5, 1.0]);

    expect(diricreCornerFactory.create(bottomWall, leftWall)).toBeNull();
    expect(diricreCornerFactory.create(leftWall, bottomWall2)).toBeInstanceOf(
      LeftBottomCorner
    );
    expect(diricreCornerFactory.create(bottomWall2, leftWall2)).toBeNull();
    expect(diricreCornerFactory.create(leftWall2, topWall)).toBeNull();
    expect(diricreCornerFactory.create(topWall, rightWall2)).toBeNull();
    expect(diricreCornerFactory.create(rightWall2, bottomWall)).toBeNull();
  });
});
