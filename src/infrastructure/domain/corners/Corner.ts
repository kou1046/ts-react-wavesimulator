import { Wave } from "../waves/Wave";

export abstract class Corner {
  private readonly x: number;
  private readonly y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  public abstract reflect(
    x: number,
    y: number,
    wave: Wave,
    preWave: Wave
  ): number;
}

export abstract class RightTopCorner extends Corner {}
export abstract class RightBottomCorner extends Corner {}
export abstract class LeftTopCorner extends Corner {}
export abstract class LeftBottomCorner extends Corner {}
