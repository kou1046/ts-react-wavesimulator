import nj from "numjs";
import { Wall } from "./Wall";
import { Corner } from "../corners/Corner";
import { ICornerFactory } from "../corners/ICornerFactory";
import { Wave } from "../waves/Wave";
import { range } from "../../utils/range";
import { eachCons } from "../../utils/eachCons";

export class Walls {
  private readonly value;
  public readonly cornerFactory: ICornerFactory;

  constructor(wallCollection: Wall[], cornerFactory: ICornerFactory) {
    this.value = wallCollection;
    this.cornerFactory = cornerFactory;
  }

  public reflect(
    inplacedArray: nj.NdArray<number[]>,
    wave: Wave,
    preWave: Wave
  ): void {
    const iterWalls = [
      this.value[this.value.length - 1],
      ...this.value,
      this.value[0],
    ];
    for (const walls of eachCons<Wall>(iterWalls, 3)) {
      const [prevWall, wall, nextWall] = walls;
      const prevCorner = this.cornerFactory.create(prevWall, wall);
      const nextCorner = this.cornerFactory.create(wall, nextWall);

      this.reflectOne(
        wall,
        prevCorner,
        nextCorner,
        inplacedArray,
        wave,
        preWave
      );
    }
  }

  private reflectOne(
    wall: Wall,
    prevCorner: Corner | null,
    nextCorner: Corner | null,
    inplacedArray: nj.NdArray<number[]>,
    wave: Wave,
    preWave: Wave
  ) {
    if (wall.isHorizontal()) {
      this.horizontalWallReflect(
        wall,
        prevCorner,
        nextCorner,
        inplacedArray,
        wave,
        preWave
      );
    }

    if (wall.isVertical()) {
      this.verticalWallReflect(
        wall,
        prevCorner,
        nextCorner,
        inplacedArray,
        wave,
        preWave
      );
    }
  }

  private verticalWallReflect(
    wall: Wall,
    prevCorner: Corner | null,
    nextCorner: Corner | null,
    inplacedArray: nj.NdArray<number[]>,
    wave: Wave,
    preWave: Wave
  ): void {
    const xCell = wave.grid.calculateXIndex(wall.xs()[0]);
    let [startYCell, endYCell] = wall
      .ys()
      .sort()
      .map((y) => wave.grid.calculateYIndex(y));

    if (prevCorner && (prevCorner.isRightTop() || prevCorner.isLeftTop()))
      endYCell -= 1;
    if (prevCorner && (prevCorner.isLeftBottom() || prevCorner.isRightBottom()))
      startYCell += 1;

    if (nextCorner) {
      const cornerXCell = xCell;
      const cornerYCell =
        nextCorner.isLeftTop() || nextCorner.isRightTop()
          ? endYCell
          : startYCell;
      const setValue = nextCorner.reflect(
        cornerXCell,
        cornerYCell,
        wave,
        preWave
      );
      inplacedArray.set(cornerXCell, cornerYCell, setValue);

      if (nextCorner.isLeftTop() || nextCorner.isLeftBottom()) {
        /* 障害物内部に波が侵入しないようにする処理 */
        inplacedArray.set(cornerXCell - 1, cornerYCell, NaN);

        if (nextCorner.isLeftTop())
          inplacedArray.set(cornerXCell, cornerYCell + 1, NaN);
        if (nextCorner.isLeftBottom())
          inplacedArray.set(cornerXCell, cornerYCell - 1, NaN);

        endYCell -= 1;
      }
      if (nextCorner.isRightBottom() || nextCorner.isRightTop()) {
        /* 障害物内部に波が侵入しないようにする処理 */
        inplacedArray.set(cornerXCell + 1, cornerYCell, NaN);

        if (nextCorner.isRightTop())
          inplacedArray.set(cornerXCell, cornerYCell + 1, NaN);
        if (nextCorner.isRightBottom())
          inplacedArray.set(cornerXCell, cornerYCell - 1, NaN);

        startYCell += 1;
      }
    }

    for (const yCell of range(startYCell, endYCell + 1)) {
      const setValue = wall.reflect(xCell, yCell, wave, preWave);
      inplacedArray.set(xCell, yCell, setValue);

      if (yCell === endYCell) break;

      /* 障害物内部に波が侵入しないようにする処理 */
      if (wall.isLeft()) inplacedArray.set(xCell - 1, yCell, NaN);
      if (wall.isRight()) inplacedArray.set(xCell + 1, yCell, NaN);
    }
  }

  private horizontalWallReflect(
    wall: Wall,
    prevCorner: Corner | null,
    nextCorner: Corner | null,
    inplacedArray: nj.NdArray<number[]>,
    wave: Wave,
    preWave: Wave
  ): void {
    const yCell = wave.grid.calculateYIndex(wall.ys()[0]);
    let [startXCell, endXCell] = wall
      .xs()
      .sort()
      .map((x) => wave.grid.calculateXIndex(x));

    if (prevCorner && (prevCorner.isLeftTop() || prevCorner.isRightTop()))
      startXCell += 1;
    if (prevCorner && (prevCorner.isRightBottom() || prevCorner.isLeftBottom()))
      endXCell -= 1;

    if (nextCorner) {
      const cornerXCell =
        nextCorner.isLeftBottom() || nextCorner.isLeftTop()
          ? startXCell
          : endXCell;
      const cornerYcell = yCell;
      const setValue = nextCorner.reflect(cornerXCell, yCell, wave, preWave);
      inplacedArray.set(cornerXCell, cornerYcell, setValue);

      if (nextCorner.isLeftBottom() || nextCorner.isLeftTop()) {
        /* 障害物内部に波が侵入しないようにする処理*/
        inplacedArray.set(cornerXCell - 1, cornerYcell, NaN);

        if (nextCorner.isLeftBottom())
          inplacedArray.set(cornerXCell, cornerYcell - 1, NaN);
        if (nextCorner.isLeftTop())
          inplacedArray.set(cornerXCell, cornerYcell + 1, NaN);

        startXCell += 1;
      }

      if (nextCorner.isRightTop() || nextCorner.isRightBottom()) {
        /* 障害物内部に波が侵入しないようにする処理*/
        inplacedArray.set(cornerXCell + 1, cornerYcell, NaN);
        if (nextCorner.isRightTop())
          inplacedArray.set(cornerXCell, cornerYcell + 1, NaN);
        if (nextCorner.isRightBottom())
          inplacedArray.set(cornerXCell, cornerYcell - 1, NaN);

        endXCell -= 1;
      }
    }

    for (const xCell of range(startXCell, endXCell + 1)) {
      const setValue = wall.reflect(xCell, yCell, wave, preWave);
      inplacedArray.set(xCell, yCell, setValue);

      if (xCell === endXCell) break;

      /* 障害物内部に波が侵入しないようにする処理*/
      if (wall.isBottom()) inplacedArray.set(xCell, yCell - 1, NaN);
      if (wall.isTop()) inplacedArray.set(xCell, yCell + 1, NaN);
    }
  }
}
