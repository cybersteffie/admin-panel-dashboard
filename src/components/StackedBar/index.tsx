import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { ChartOptions } from "chart.js/auto"; // Importing ChartOptions type

interface StackedBarChartProps {
  data: { labels: string[]; completed: Number[]; partial: Number[]; hints: Number[] };
}

function StackedBarChart({ data }: StackedBarChartProps) {
  ChartJS.register(Tooltip, Legend, CategoryScale, LinearScale, BarElement);

  const options: ChartOptions<"bar"> = {
    // Use ChartOptions type for options
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  let stackBarData = {
    labels: data.labels,
    datasets: [
      {
        label: "Successful Attempt",
        data: data.completed,
        backgroundColor: "rgba(3, 252, 148, 0.5)",
        borderColor: "rgba(3, 252, 148, 0.99)",
        borderWidth: 2.1,
      },
      {
        label: "Failed Attempt",
        data: data.partial,
        backgroundColor: "rgba(171, 71, 188, 0.5)",
        borderColor: "rgba(171, 71, 188, 0.99)",
        borderWidth: 2.1,
      },
      {
        label: "Hints Used",
        data: data.hints,
        backgroundColor: "rgba(3, 140, 252, 0.5)",
        borderColor: "rgba(3, 140, 252, 0.99)",
        borderWidth: 2.1,
      },
    ],
  };

  return (
    <Bar
      options={options}
      data={stackBarData}
      height={301}
      // type="doughnut" // Specify the chart type
      plugins={[]} // Optional: Add any plugins you might use
    />
  );
}

export default StackedBarChart;
