import { useEffect, useState } from "react";
import reactDom from "react-dom";
import WaveMap from "./components/WaveMap";

import { Grid } from "./infrastructure/domain/grids/Grid";
import { DiricreWall } from "./infrastructure/domain/walls/DiricreWall";
import { Walls } from "./infrastructure/domain/walls/Walls";
import { diricreCornerFactory } from "./infrastructure/domain/corners/DiricreCornerFactory";
import { Wave } from "./infrastructure/domain/waves/Wave";
import { WaveFactory } from "./infrastructure/domain/waves/WaveFactory";

const WIDTH = 3.0;
const HEIGHT = 3.0;
const H = 0.05; // 空間刻み幅 (解像度)
const DT = 0.01; //　更新時間幅
const RAD = 10; // ガウス入力の半径 (入力の鋭さ)

const reflectBottmWall = new DiricreWall(
  [0.0, HEIGHT],
  [WIDTH / 2, HEIGHT],
  "bottom"
);
const reflectLeftWall = new DiricreWall(
  [WIDTH / 2, HEIGHT],
  [WIDTH / 2, HEIGHT / 2],
  "left"
);

const reflecBottomWall2 = new DiricreWall(
  [WIDTH / 2, HEIGHT / 2],
  [WIDTH, HEIGHT / 2],
  "bottom"
);

const reflectLeftWall2 = new DiricreWall(
  [WIDTH, HEIGHT / 2],
  [WIDTH, 0],
  "left"
);

const reflectTopWall = new DiricreWall([WIDTH, 0], [0, 0], "top");
const reflectRightWall2 = new DiricreWall([0, 0], [0, HEIGHT], "right");

const walls = new Walls(
  [
    reflectBottmWall,
    reflectLeftWall,
    reflecBottomWall2,
    reflectLeftWall2,
    reflectTopWall,
    reflectRightWall2,
  ],
  diricreCornerFactory
);

const grid = new Grid(WIDTH, HEIGHT, H, DT);
const waveFactory = new WaveFactory(grid, [walls]);
waveFactory.inputGauss(WIDTH / 2, HEIGHT / 3, RAD);

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
