import { Point } from "../points/Point";
import { Wave } from "../waves/Wave";

export abstract class Wall {
  private readonly start: Point;
  private readonly end: Point;

  constructor(start: [number, number], end: [number, number]) {
    this.start = new Point(...start);
    this.end = new Point(...end);
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

  public isRight(): boolean {
    return this instanceof RightWall;
  }

  public isLeft(): boolean {
    return this instanceof LeftWall;
  }

  public isTop(): boolean {
    return this instanceof TopWall;
  }

  public isBottom(): boolean {
    return this instanceof BottomWall;
  }

  public abstract reflect(
    x: number,
    y: number,
    wave: Wave,
    preWave: Wave
  ): number;
}

export abstract class TopWall extends Wall {}
export abstract class RightWall extends Wall {}
export abstract class LeftWall extends Wall {}
export abstract class BottomWall extends Wall {}
