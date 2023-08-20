export class Grid {
  private readonly width: number;
  private readonly height: number;
  private readonly h: number;
  private readonly dt: number;

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
