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

    if (prevCorner) {
      startYCell += 1;
    }

    if (nextCorner) {
      const setValue = nextCorner.reflect(xCell, endYCell, wave, preWave);
      inplacedArray.set(xCell, endYCell, setValue);
      endYCell -= 1;
    }

    for (const yCell of range(startYCell, endYCell + 1)) {
      const setValue = wall.reflect(xCell, yCell, wave, preWave);
      inplacedArray.set(xCell, yCell, setValue);

      // 障害物内部に波が侵入しないようにする処理
      if (wall.isLeft() && xCell > 0) {
        inplacedArray.set(xCell - 1, yCell, 0);
      }
      if (wall.isRight() && xCell + 1 < wave.grid.rowLength()) {
        inplacedArray.set(xCell + 1, yCell + 1, 0);
      }
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

    if (prevCorner) {
      startXCell += 1;
    }

    if (nextCorner) {
      const setValue = nextCorner.reflect(endXCell, yCell, wave, preWave);
      inplacedArray.set(endXCell, yCell, setValue);
      endXCell -= 1;
    }

    for (const xCell of range(startXCell, endXCell + 1)) {
      const setValue = wall.reflect(xCell, yCell, wave, preWave);
      inplacedArray.set(xCell, yCell, setValue);

      // 障害物内部に波が侵入しないようにする処理
      if (wall.isBottom() && yCell > 0) {
        inplacedArray.set(xCell, yCell - 1, 0);
      }
      if (wall.isTop() && yCell + 1 < wave.grid.colLength()) {
        inplacedArray.set(xCell, yCell + 1, 0);
      }
    }
  }
}
