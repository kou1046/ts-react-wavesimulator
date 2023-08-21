import Highcharts from "highcharts";
import HighchartsHeatmap from "highcharts/modules/heatmap";
import HighchartsReact from "highcharts-react-official";
import { Wave } from "../infrastructure/domain/waves/Wave";
import PointClickCAllbackFunction from "highcharts";

HighchartsHeatmap(Highcharts);

type PropType = {
  wave: Wave;
};

export default function WaveMap({ wave }: PropType) {
  const options = {
    chart: {
      type: "heatmap",
    },
    title: {
      text: `Time: ${Math.round(wave.time * 100) / 100}`,
    },
    yAxis: {
      labels: {
        enabled: false,
      },
      title: {
        enabled: false,
      },
    },
    xAxis: {
      labels: {
        enabled: false,
      },
    },
    colorAxis: {
      min: -0.2,
      max: 0.2,
      stops: [
        [-1, "rgba(56, 7, 84, 0.4)"],
        [0.5, "rgba(56, 7, 84, 0.65)"],
        [1, "rgba(69, 9, 104, 1)"],
      ],
    },
    series: [
      {
        name: "Wave",
        data: wave.transformValue(),
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
