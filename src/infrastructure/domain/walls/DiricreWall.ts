import { Wave } from "../waves/Wave";
import { Wall } from "./Wall";

export class DiricreWall extends Wall {
  public reflect(x: number, y: number, wave: Wave, preWave: Wave): number {
    return 0;
  }
}
