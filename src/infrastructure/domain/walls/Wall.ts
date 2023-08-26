import nj from "numjs";

import { Point } from "../points/Point";
import { Wave } from "../waves/Wave";
import { ReflectDirection } from "../types/ReflectDirection";

export abstract class Wall {
  private readonly start: Point;
  private readonly end: Point;
  public readonly reflectDirection: ReflectDirection;

  constructor(start: Point, end: Point, reflectDirection: ReflectDirection) {
    this.start = start;
    this.end = end;
    this.reflectDirection = reflectDirection;
  }

  public xs(): [number, number] {
    return [this.start.x, this.end.x];
  }

  public ys(): [number, number] {
    return [this.start.y, this.end.y];
  }

  public isRightWard(): boolean {
    return this.start.x < this.end.x;
  }

  public isLeftWard(): boolean {
    return this.start.x > this.end.x;
  }

  public isUpWard(): boolean {
    return this.start.y < this.end.y;
  }

  public isDownWard(): boolean {
    return this.start.y > this.end.y;
  }

  public isVertical(): boolean {
    return this.start.x === this.start.x;
  }

  public isHorizontal(): boolean {
    return this.end.y === this.end.y;
  }

  public abstract reflect(
    inplacedArray: nj.NdArray<number[]>,
    wave: Wave,
    preWave: Wave
  ): void;
}
