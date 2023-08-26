import { ICornerFactory } from "./ICornerFactory";
import {
  RightBottomCorner,
  RightTopCorner,
  LeftBottomCorner,
  LeftTopCorner,
} from "./Corner";
import { Wave } from "../waves/Wave";

class NeumannCornerFactory extends ICornerFactory {
  protected createLeftBottomCorner(x: number, y: number): LeftBottomCorner {
    return new NeumannLeftBottomCorner(x, y);
  }
  protected createLeftTopCorner(x: number, y: number): LeftTopCorner {
    return new NeumannLeftTopCorner(x, y);
  }
  protected createRightBottomCorner(x: number, y: number): RightBottomCorner {
    return new NeumannRightBottomCorner(x, y);
  }

  protected createRightTopCorner(x: number, y: number): RightTopCorner {
    return new NeumannRightTopCorner(x, y);
  }
}

class NeumannRightTopCorner extends RightTopCorner {
  public reflect(x: number, y: number, wave: Wave, preWave: Wave): number {
    return (
      2 * wave.get(x, y) -
      preWave.get(x, y) +
      2 *
        wave.grid.alpha() *
        (wave.get(x - 1, y) + wave.get(x, y - 1) - 2 * wave.get(x, y))
    );
  }
}

class NeumannRightBottomCorner extends RightBottomCorner {
  public reflect(x: number, y: number, wave: Wave, preWave: Wave): number {
    return (
      2 * wave.get(x, y) -
      preWave.get(x, y) +
      2 *
        wave.grid.alpha() *
        (wave.get(x - 1, y) + wave.get(x, y + 1) - 2 * wave.get(x, y))
    );
  }
}

class NeumannLeftBottomCorner extends LeftBottomCorner {
  public reflect(x: number, y: number, wave: Wave, preWave: Wave): number {
    return (
      2 * wave.get(x, y) -
      preWave.get(x, y) +
      2 *
        wave.grid.alpha() *
        (wave.get(x + 1, y) + wave.get(x, y + 1) - 2 * wave.get(x, y))
    );
  }
}

class NeumannLeftTopCorner extends LeftTopCorner {
  public reflect(x: number, y: number, wave: Wave, preWave: Wave): number {
    return (
      2 * wave.get(x, y) -
      preWave.get(x, y) +
      2 *
        wave.grid.alpha() *
        (wave.get(x + 1, y) + wave.get(x, y - 1) - 2 * wave.get(x, y))
    );
  }
}

export const neumannCornerFactory = new NeumannCornerFactory();
