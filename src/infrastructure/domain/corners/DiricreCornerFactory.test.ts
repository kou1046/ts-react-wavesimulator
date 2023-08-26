import { describe, expect, test } from "@jest/globals";
import { diricreCornerFactory } from "./DiricreCornerFactory";
import { DiricreWall } from "../walls/DiricreWall";
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

    const reflectTopWall = new DiricreWall([width, 0], [0, 0], "top");
    const reflectRightWall = new DiricreWall([0, 0], [0, height], "right");
    const reflectBottomWall = new DiricreWall(
      [0, width],
      [height, height],
      "bottom"
    );
    const reflectLeftWall = new DiricreWall(
      [width, width],
      [height, 0],
      "left"
    );

    expect(
      diricreCornerFactory.create(reflectTopWall, reflectRightWall)
    ).toBeInstanceOf(LeftBottomCorner);
    expect(
      diricreCornerFactory.create(reflectRightWall, reflectBottomWall)
    ).toBeInstanceOf(LeftTopCorner);
    expect(
      diricreCornerFactory.create(reflectBottomWall, reflectLeftWall)
    ).toBeInstanceOf(RightTopCorner);
    expect(
      diricreCornerFactory.create(reflectLeftWall, reflectTopWall)
    ).toBeInstanceOf(RightBottomCorner);
  });
  test("時計回りの順番でかつ, 垂直に交わる2つの壁を渡したときに適切な向きの角を生成できる", () => {
    const topWall = new DiricreWall([0.5, 1.0], [0.7, 1.0], "top");
    const leftWall = new DiricreWall([0.7, 1.0], [0.7, 0.7], "right");
    const topWall2 = new DiricreWall([0.7, 0.7], [1.0, 0.7], "top");

    const rightWall = new DiricreWall([1.0, 0.7], [1.0, 0.2], "right");
    const bottomWall = new DiricreWall([1.0, 0.2], [0.5, 0.2], "bottom");
    const leftWall2 = new DiricreWall([0.5, 0.2], [0.5, 1.0], "left");

    expect(diricreCornerFactory.create(topWall, leftWall)).toBe(null);
    expect(diricreCornerFactory.create(leftWall, topWall2)).toBeInstanceOf(
      LeftBottomCorner
    );
    expect(diricreCornerFactory.create(topWall2, rightWall)).toBe(null);
    expect(diricreCornerFactory.create(rightWall, bottomWall)).toBe(null);
    expect(diricreCornerFactory.create(bottomWall, leftWall2)).toBe(null);
  });
});
