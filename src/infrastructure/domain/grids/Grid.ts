import nj from "numjs";
export class CFLConditionError extends Error {}
export class ValueError extends Error {}

export class Grid {
  public readonly width: number;
  public readonly height: number;
  public readonly h: number;
  public readonly dt: number;

  constructor(width: number, height: number, h: number, dt: number) {
    if (h < dt) {
      throw new CFLConditionError(
        "クーラン条件に基づき, 空間刻み幅hは時間刻みdtより大きくすること."
      );
    }
    this.width = width;
    this.height = height;
    this.h = h;
    this.dt = dt;
  }

  public generateArray(): nj.NdArray<number[]> {
    return nj
      .zeros([this.rowLength() * this.colLength()])
      .reshape<number[]>(this.rowLength(), this.colLength());
  }

  public alpha(): number {
    return (this.dt / this.h) ** 2;
  }

  public calculateXIndex(x: number): number {
    if (x > this.width) {
      throw new ValueError();
    }
    let xIndex = this.calculateCellNum(x) - 1;

    if (xIndex < 0) {
      xIndex = 0;
    }

    return xIndex;
  }

  public calculateYIndex(y: number): number {
    if (y > this.height) {
      throw new ValueError();
    }

    let yIndex = this.calculateCellNum(y) - 1;

    if (yIndex < 0) {
      yIndex = 0;
    }

    return yIndex;
  }

  public rowLength(): number {
    return this.calculateCellNum(this.width);
  }

  public colLength(): number {
    return this.calculateCellNum(this.height);
  }

  private calculateCellNum(cor: number) {
    return Math.trunc(cor / this.h);
  }
}
