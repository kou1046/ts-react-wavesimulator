export class Grid {
  public readonly width: number;
  public readonly height: number;
  public readonly h: number;
  public readonly dt: number;

  constructor(width: number, height: number, h: number, dt: number) {
    this.width = width;
    this.height = height;
    this.h = h;
    this.dt = dt;
  }

  public alpha(): number {
    return (this.dt / this.h) ** 2;
  }

  public calculateCell(cor: number): number {
    return cor / this.h;
  }

  public widthNum(): number {
    return this.calculateCell(this.width);
  }

  public heightNum(): number {
    return this.calculateCell(this.height);
  }
}
