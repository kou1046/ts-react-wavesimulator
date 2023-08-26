import { Wave } from "../waves/Wave";
import {
  RightTopCorner,
  LeftBottomCorner,
  RightBottomCorner,
  LeftTopCorner,
} from "./Corner";
import { ICornerFactory } from "./ICornerFactory";

class DiricreCornerFactory extends ICornerFactory {
  protected createLeftTopCorner(x: number, y: number): LeftTopCorner {
    return new DiricreLeftTopCorner(x, y);
  }
  protected createLeftBottomCorner(x: number, y: number): LeftBottomCorner {
    return new DiricreLeftBottomCorner(x, y);
  }

  protected createRightBottomCorner(x: number, y: number): RightBottomCorner {
    return new DiricreRightBottomCorner(x, y);
  }

  protected createRightTopCorner(x: number, y: number): RightTopCorner {
    return new DiricreRightTopCorner(x, y);
  }
}

class DiricreRightTopCorner extends RightTopCorner {
  public reflect(x: number, y: number, wave: Wave, preWave: Wave): number {
    return 0;
  }
}

class DiricreLeftTopCorner extends LeftTopCorner {
  public reflect(x: number, y: number, wave: Wave, preWave: Wave): number {
    return 0;
  }
}

class DiricreRightBottomCorner extends RightBottomCorner {
  public reflect(x: number, y: number, wave: Wave, preWave: Wave): number {
    return 0;
  }
}

class DiricreLeftBottomCorner extends LeftBottomCorner {
  public reflect(x: number, y: number, wave: Wave, preWave: Wave): number {
    return 0;
  }
}

export const diricreCornerFactory = new DiricreCornerFactory();
