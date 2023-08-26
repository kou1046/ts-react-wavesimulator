import nj from "numjs";

import { Point } from "../points/Point";
import { Wave } from "../waves/Wave";
import { ReflectDirection } from "../types/ReflectDirection";

export abstract class Wall {
  private readonly start: Point;
  private readonly end: Point;
  public readonly reflectDirection: ReflectDirection;

  constructor(
    start: [number, number],
    end: [number, number],
    reflectDirection: ReflectDirection
  ) {
    this.start = new Point(...start);
    this.end = new Point(...end);
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
    x: number,
    y: number,
    wave: Wave,
    preWave: Wave
  ): number;
}
