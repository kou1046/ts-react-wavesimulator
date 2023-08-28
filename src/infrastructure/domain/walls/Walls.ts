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

    if (prevCorner && prevCorner.isRightTop()) endYCell -= 1;
    if (prevCorner && prevCorner.isLeftBottom()) startYCell += 1;

    if (nextCorner) {
      const cornerXCell = xCell;
      const cornerYCell = nextCorner.isLeftTop() ? endYCell : startYCell;
      const setValue = nextCorner.reflect(
        cornerXCell,
        cornerYCell,
        wave,
        preWave
      );
      inplacedArray.set(cornerXCell, cornerYCell, setValue);

      if (nextCorner.isLeftTop()) {
        /* 障害物内部に波が侵入しないようにする処理 */
        inplacedArray.set(cornerXCell - 1, cornerYCell, 0);
        inplacedArray.set(cornerXCell, cornerYCell + 1, 0);

        endYCell -= 1;
      }
      if (nextCorner.isRightBottom()) {
        /* 障害物内部に波が侵入しないようにする処理 */
        inplacedArray.set(cornerXCell + 1, cornerYCell, 0);
        inplacedArray.set(cornerXCell, cornerYCell - 1, 0);

        startYCell += 1;
      }
    }

    for (const yCell of range(startYCell, endYCell + 1)) {
      const setValue = wall.reflect(xCell, yCell, wave, preWave);
      inplacedArray.set(xCell, yCell, setValue);

      /* 障害物内部に波が侵入しないようにする処理 */
      if (wall.isLeft()) inplacedArray.set(xCell - 1, yCell, 0);
      if (wall.isRight()) inplacedArray.set(xCell + 1, yCell, 0);
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

    if (prevCorner && prevCorner.isLeftTop()) startXCell += 1;
    if (prevCorner && prevCorner.isRightBottom()) endXCell -= 1;

    if (nextCorner) {
      const cornerXCell = nextCorner.isLeftBottom() ? startXCell : endXCell;
      const cornerYcell = yCell;
      const setValue = nextCorner.reflect(cornerXCell, yCell, wave, preWave);
      inplacedArray.set(cornerXCell, cornerYcell, setValue);
      if (nextCorner.isLeftBottom()) {
        /* 障害物内部に波が侵入しないようにする処理*/
        inplacedArray.set(cornerXCell, cornerYcell - 1, 0);
        inplacedArray.set(cornerXCell - 1, cornerYcell, 0);

        startXCell += 1;
      }
      if (nextCorner.isRightTop()) {
        /* 障害物内部に波が侵入しないようにする処理*/
        inplacedArray.set(cornerXCell, cornerYcell + 1, 0);
        inplacedArray.set(cornerXCell + 1, cornerYcell, 0);

        endXCell -= 1;
      }
    }

    for (const xCell of range(startXCell, endXCell + 1)) {
      const setValue = wall.reflect(xCell, yCell, wave, preWave);
      inplacedArray.set(xCell, yCell, setValue);

      /* 障害物内部に波が侵入しないようにする処理*/
      if (wall.isBottom()) inplacedArray.set(xCell, yCell - 1, 0);
      if (wall.isTop()) inplacedArray.set(xCell, yCell + 1, 0);
    }
  }
}
