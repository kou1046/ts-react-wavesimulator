export class Point {
  private readonly _x;
  private readonly _y;
  constructor(x: number, y: number) {
    if (x < 0 || y < 0) {
      throw new Error("正の数にする必要がある");
    }

    this._x = x;
    this._y = y;
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }
}
