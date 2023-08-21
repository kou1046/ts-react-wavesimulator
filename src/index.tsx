import { useEffect, useState } from "react";
import reactDom from "react-dom";
import WaveMap from "./components/WaveMap";

import { Grid } from "./infrastructure/domain/grids/Grid";
import { Wave } from "./infrastructure/domain/waves/Wave";
import { WaveFactory } from "./infrastructure/domain/waves/WaveFactory";

const WIDTH = 2.0;
const HEIGHT = 2.0;
const H = 0.04; // 空間刻み幅 (解像度)
const DT = 0.01; //　更新時間幅
const RAD = 10; // ガウス入力の半径 (入力の鋭さ)

const grid = new Grid(WIDTH, HEIGHT, H, DT);
const waveFactory = new WaveFactory(grid);
waveFactory.inputGauss(0, HEIGHT / 2, RAD);

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
