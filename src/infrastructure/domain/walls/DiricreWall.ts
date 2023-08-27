import { Wave } from "../waves/Wave";
import { TopWall, RightWall, BottomWall, LeftWall } from "./Wall";

export class DiricreTopWall extends TopWall {
  public reflect(x: number, y: number, wave: Wave, preWave: Wave): number {
    return 0;
  }
}

export class DiricreBottomWall extends BottomWall {
  public reflect(x: number, y: number, wave: Wave, preWave: Wave): number {
    return 0;
  }
}

export class DiricreRightWall extends RightWall {
  public reflect(x: number, y: number, wave: Wave, preWave: Wave): number {
    return 0;
  }
}

export class DiricreLeftWall extends LeftWall {
  public reflect(x: number, y: number, wave: Wave, preWave: Wave): number {
    return 0;
  }
}
