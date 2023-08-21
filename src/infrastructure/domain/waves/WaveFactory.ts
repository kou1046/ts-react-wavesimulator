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
  private readonly walls: Walls | null;
  private waveArray: nj.NdArray<number[]>;
  private preWaveArray: nj.NdArray<number[]>;
  private time: number;

  constructor(grid: Grid, walls: Walls | null = null) {
    this.grid = grid;
    this.walls = walls;
    this.waveArray = nj
      .zeros<number[]>(grid.widthNum() * grid.heightNum())
      .reshape(grid.heightNum(), grid.widthNum());
    this.preWaveArray = nj
      .zeros<number[]>(grid.widthNum() * grid.heightNum())
      .reshape(grid.heightNum(), grid.widthNum());
    this.time = 0;
  }

  public create() {
    const newWaveArray = this.propagate();
    const wave = new Wave(newWaveArray, this.time);

    this.preWaveArray = this.waveArray.clone();
    this.waveArray = newWaveArray.clone();
    this.time += this.grid.dt;

    return wave;
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

    this.waveArray = this.waveArray.add(inputWaveArray);
    this.preWaveArray = this.preWaveArray.add(inputWaveArray);
  }

  private propagate(): nj.NdArray<number[]> {
    const vT = topShift(this.waveArray);
    const vB = bottomShift(this.waveArray);
    const vR = rightShift(this.waveArray);
    const vL = leftShift(this.waveArray);

    const v1 = this.waveArray.multiply(2).subtract(this.preWaveArray);

    const v2_1 = vL.add(vR).add(vB).add(vT);
    const v2_2 = this.waveArray.multiply(4);
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
