import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const SprintVelocityChart = () => {
  const chartData = {
    labels: [
      "Sprint 1",
      "Sprint 2",
      "Sprint 3",
      "Sprint 4",
      "Sprint 5",
      "Sprint 6",
    ],
    datasets: [
      {
        label: "Planned",
        data: [30, 35, 28, 40, 38, 42],
        backgroundColor: "rgba(99, 102, 241, 0.6)",
        borderRadius: 6,
      },
      {
        label: "Completed",
        data: [24, 32, 25, 38, 35, 40],
        backgroundColor: "rgba(34, 197, 94, 0.6)",
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      y: { beginAtZero: true, grid: { color: "rgba(0,0,0,0.05)" } },
      x: { grid: { display: false } },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default SprintVelocityChart;
