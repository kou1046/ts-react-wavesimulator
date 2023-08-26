import nj from "numjs";

import {
  topShift,
  leftShift,
  rightShift,
  bottomShift,
} from "../../utils/shift";
import { tile } from "../../utils/tile";
import { Grid } from "../grids/Grid";
import { Wave } from "./Wave";
import { Walls } from "../walls/Walls";
import { linspace } from "../../utils/linspace";

export class WaveFactory {
  private readonly grid: Grid;
  private readonly wallsCollection: Walls[] | null;
  private wave: Wave;
  private preWave: Wave;

  constructor(grid: Grid, walls: Walls[] | null = null) {
    this.grid = grid;
    this.wallsCollection = walls;
    this.wave = new Wave(
      nj
        .zeros<number[]>(grid.widthNum() * grid.heightNum())
        .reshape(grid.heightNum(), grid.widthNum()),
      0,
      grid
    );
    this.preWave = new Wave(
      nj
        .zeros<number[]>(grid.widthNum() * grid.heightNum())
        .reshape(grid.heightNum(), grid.widthNum()),
      0,
      grid
    );
  }

  public create() {
    const newWaveArray = this.propagate();

    if (this.wallsCollection) {
      this.wallsCollection.map((walls) => {
        // inplace newWaveArray
        walls.reflect(newWaveArray, this.wave, this.preWave);
      });
    }

    this.preWave = new Wave(this.wave.value, this.wave.time, this.grid);
    this.wave = new Wave(
      newWaveArray,
      this.wave.time + this.grid.dt,
      this.grid
    );

    return this.wave;
  }

  public inputGauss(x0: number, y0: number, rad: number) {
    const x = linspace(0, this.grid.height, this.grid.widthNum()).reshape<
      number[]
    >(1, -1);

    const y = linspace(0, this.grid.height, this.grid.heightNum()).reshape<
      number[]
    >(-1, 1);

    const xs = tile(x, [this.grid.heightNum() - 1, 0]);
    const ys = tile(y, [0, this.grid.widthNum() - 1]);

    const inputWaveArray = calculateInputWaveElement(xs, x0, rad).multiply(
      calculateInputWaveElement(ys, y0, rad)
    );

    this.wave.add(inputWaveArray);
    this.preWave.add(inputWaveArray);
  }

  private propagate(): nj.NdArray<number[]> {
    const vT = topShift(this.wave.value);
    const vB = bottomShift(this.wave.value);
    const vR = rightShift(this.wave.value);
    const vL = leftShift(this.wave.value);

    const v1 = this.wave.value.multiply(2).subtract(this.preWave.value);

    const v2_1 = vL.add(vR).add(vB).add(vT);
    const v2_2 = this.wave.value.multiply(4);
    const v2_3 = v2_1.subtract(v2_2);

    const v2 = v2_3.multiply(this.grid.alpha());

    const newWaveArray = v1.add(v2);

    return newWaveArray;
  }
}

const calculateInputWaveElement = (
  array: nj.NdArray<number[]>,
  init: number,
  rad: number
): nj.NdArray<number[]> => {
  const retArray = nj.exp(
    array
      .subtract(init)
      .pow(2)
      .multiply(-1)
      .multiply(rad ** 2)
  );

  return retArray;
};
