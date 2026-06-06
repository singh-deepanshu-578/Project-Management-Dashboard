import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const TaskCompletionChart = ({ data }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: ["#6366f1", "#f59e0b", "#06b6d4", "#22c55e"],
        borderWidth: 0,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: { padding: 20, usePointStyle: true },
      },
    },
    cutout: "65%",
  };

  return <Doughnut data={chartData} options={options} />;
};

export default TaskCompletionChart;
