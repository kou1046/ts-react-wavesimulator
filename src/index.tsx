import { useEffect, useState } from "react";
import reactDom from "react-dom";
import WaveMap from "./components/WaveMap";

import { Grid } from "./infrastructure/domain/grids/Grid";
import {
  DiricreBottomWall,
  DiricreLeftWall,
  DiricreRightWall,
  DiricreTopWall,
} from "./infrastructure/domain/walls/DiricreWall";
import {
  NeumannBottomWall,
  NeumannLeftWall,
  NeumannRightWall,
  NeumannTopWall,
} from "./infrastructure/domain/walls/NeumannWall";
import { neumannCornerFactory } from "./infrastructure/domain/corners/NeumannCornerFactory";
import { Walls } from "./infrastructure/domain/walls/Walls";
import { Wave } from "./infrastructure/domain/waves/Wave";
import { WaveFactory } from "./infrastructure/domain/waves/WaveFactory";

const WIDTH = 5.0;
const HEIGHT = 5.0;
const H = 0.08; // 空間刻み幅 (解像度)
const DT = 0.05; //　更新時間幅
const RAD = 5; // ガウス入力の半径 (入力の鋭さ)

const obstacleXs = [1, 2, 2, 3, 3, 4, 4, 3, 3, 2, 2, 1];
const obstacleYs = [3, 3, 4, 4, 3, 3, 2, 2, 1, 1, 2, 2];
const wallClasses = [
  NeumannBottomWall,
  NeumannRightWall,
  NeumannBottomWall,
  NeumannLeftWall,
  NeumannBottomWall,
  NeumannLeftWall,
  NeumannTopWall,
  NeumannLeftWall,
  NeumannTopWall,
  NeumannRightWall,
  NeumannTopWall,
  NeumannRightWall,
];
const wallCollection = obstacleXs.map((_, i) => {
  const start: [number, number] = [obstacleXs[i], obstacleYs[i]];
  const end: [number, number] =
    i !== obstacleXs.length
      ? [obstacleXs[i + 1], obstacleYs[i + 1]]
      : [obstacleXs[0], obstacleYs[0]];

  return new wallClasses[i](start, end);
});

console.log(wallCollection);

const walls = new Walls(wallCollection, neumannCornerFactory);
const walls2 = new Walls(
  [
    new NeumannBottomWall([3.5, 4], [4, 4]),
    new NeumannLeftWall([4, 4], [4, 3.5]),
    new NeumannTopWall([4, 3.5], [3.5, 3.5]),
    new NeumannRightWall([3.5, 3.5], [3.5, 4]),
  ],
  neumannCornerFactory
);

const grid = new Grid(WIDTH, HEIGHT, H, DT);
const waveFactory = new WaveFactory(grid, [walls]);
waveFactory.inputGauss(WIDTH / 2, 0, RAD);

export default function Home() {
  const [wave, setWave] = useState<Wave>(waveFactory.create());

  // useEffect(() => {
  //   setInterval(() => {
  //     setWave(waveFactory.create());
  //   }, 100);
  // }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <div style={{ width: "100vw", maxWidth: 300 }}>
          <WaveMap wave={wave} />
        </div>
        <button
          style={{ width: 100, height: 100 }}
          onClick={() => {
            waveFactory.inputGauss(
              Math.random() * WIDTH,
              Math.random() * HEIGHT,
              RAD
            );
          }}
        >
          <strong></strong>
        </button>
      </div>
    </>
  );
}

reactDom.render(<Home />, document.querySelector("#app"));
