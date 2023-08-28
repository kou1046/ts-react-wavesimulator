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
import { Walls } from "./infrastructure/domain/walls/Walls";
import { diricreCornerFactory } from "./infrastructure/domain/corners/DiricreCornerFactory";
import { Wave } from "./infrastructure/domain/waves/Wave";
import { WaveFactory } from "./infrastructure/domain/waves/WaveFactory";
import { neumannCornerFactory } from "./infrastructure/domain/corners/NeumannCornerFactory";

const WIDTH = 5.0;
const HEIGHT = 5.0;
const H = 0.1; // 空間刻み幅 (解像度)
const DT = 0.05; //　更新時間幅
const RAD = 5; // ガウス入力の半径 (入力の鋭さ)

const topWall = new NeumannTopWall([0, HEIGHT], [WIDTH / 2, HEIGHT]);
const rightWall = new NeumannRightWall(
  [WIDTH / 2, HEIGHT],
  [WIDTH / 2, HEIGHT / 2]
);

const topWall2 = new NeumannTopWall(
  [WIDTH / 2, HEIGHT / 2],
  [WIDTH, HEIGHT / 2]
);
const rightWall2 = new NeumannRightWall([WIDTH, HEIGHT / 2], [WIDTH, 0]);
const bottomWall = new NeumannBottomWall([WIDTH, 0], [0, 0]);
const leftWall2 = new NeumannLeftWall([0, 0], [0, HEIGHT]);

const walls = new Walls(
  [topWall, rightWall, topWall2, rightWall2, bottomWall, leftWall2],
  neumannCornerFactory
);

const grid = new Grid(WIDTH, HEIGHT, H, DT);
const waveFactory = new WaveFactory(grid, [walls]);
waveFactory.inputGauss(WIDTH / 2, 0, RAD);

export default function Home() {
  const [wave, setWave] = useState<Wave>(waveFactory.create());

  useEffect(() => {
    setInterval(() => {
      setWave(waveFactory.create());
    }, 100);
  }, []);

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
