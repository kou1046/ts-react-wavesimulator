import { Wave } from "../waves/Wave";
import { TopWall, RightWall, BottomWall, LeftWall } from "./Wall";

export class NeumannTopWall extends TopWall {
  public reflect(x: number, y: number, wave: Wave, preWave: Wave): number {
    const sample =
      2 * wave.get(x, y) -
      preWave.get(x, y) +
      wave.grid.alpha() *
        (wave.get(x - 1, y) +
          wave.get(x + 1, y) +
          2 * wave.get(x, y - 1) -
          4 * wave.get(x, y));

    return sample;
  }
}

export class NeumannBottomWall extends BottomWall {
  public reflect(x: number, y: number, wave: Wave, preWave: Wave): number {
    return (
      2 * wave.get(x, y) -
      preWave.get(x, y) +
      wave.grid.alpha() *
        (wave.get(x - 1, y) +
          wave.get(x + 1, y) +
          2 * wave.get(x, y + 1) -
          4 * wave.get(x, y))
    );
  }
}

export class NeumannRightWall extends BottomWall {
  public reflect(x: number, y: number, wave: Wave, preWave: Wave): number {
    return (
      2 * wave.get(x, y) -
      preWave.get(x, y) +
      wave.grid.alpha() *
        (2 * wave.get(x - 1, y) +
          wave.get(x, y - 1) +
          wave.get(x, y + 1) -
          4 * wave.get(x, y))
    );
  }
}

export class NeumannLeftWall extends LeftWall {
  public reflect(x: number, y: number, wave: Wave, preWave: Wave): number {
    return (
      2 * wave.get(x, y) -
      preWave.get(x, y) +
      wave.grid.alpha() *
        (2 * wave.get(x + 1, y) +
          wave.get(x, y - 1) +
          wave.get(x, y + 1) -
          4 * wave.get(x, y))
    );
  }
}
