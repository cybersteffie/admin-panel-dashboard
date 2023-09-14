import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { ChartOptions } from "chart.js/auto"; // Importing ChartOptions type

interface DoughnutChartProps {
  data: Number[] | undefined;
  //   isThirdChartLoading: boolean;
}

function DoughnutChartSignUp({ data }: DoughnutChartProps) {
  ChartJS.register(Tooltip, Legend, ArcElement);

  const options: ChartOptions<"doughnut"> = {
    // Use ChartOptions type for options
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
  };

  let doughnutData = {
    labels: ["Signed Up", "Not Signed Up"],
    datasets: [
      {
        data: data,
        backgroundColor: [
          "rgba(3, 252, 148, 0.5)",
          "rgba(255, 167, 38, 0.5)",
        ],
        borderColor: [
          "rgba(3, 252, 148, 0.99)",
          "rgba(255, 167, 38, 0.99)",
        ],
      },
    ],
  };

  //   }

  return (
    <Doughnut
      options={options}
      data={doughnutData}
      height={301}
      // type="doughnut" // Specify the chart type
      plugins={[]} // Optional: Add any plugins you might use
    />
  );
}

export default DoughnutChartSignUp;
