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

const TeamPerformanceChart = ({ tasks }) => {
  const assignees = [...new Set(tasks.map((t) => t.assignee).filter(Boolean))];

  const getData = (status) =>
    assignees.map(
      (a) =>
        tasks.filter((t) => t.assignee === a && t.status === status).length,
    );

  const chartData = {
    labels: assignees,
    datasets: [
      {
        label: "To Do",
        data: getData("todo"),
        backgroundColor: "rgba(99, 102, 241, 0.85)",
        borderRadius: 0,
        stack: "stack0",
      },
      {
        label: "In Progress",
        data: getData("inProgress"),
        backgroundColor: "rgba(245, 158, 11, 0.85)",
        borderRadius: 0,
        stack: "stack0",
      },
      {
        label: "In Review",
        data: getData("review"),
        backgroundColor: "rgba(6, 182, 212, 0.85)",
        borderRadius: 0,
        stack: "stack0",
      },
      {
        label: "Done",
        data: getData("done"),
        backgroundColor: "rgba(34, 197, 94, 0.85)",
        borderRadius: 0,
        stack: "stack0",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          padding: 16,
          usePointStyle: true,
          pointStyle: "rectRounded",
          font: { size: 12 },
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          title: (items) => `👤 ${items[0].label}`,
          label: (item) => {
            if (item.parsed.y === 0) return null;
            return ` ${item.dataset.label}: ${item.parsed.y} task${item.parsed.y > 1 ? "s" : ""}`;
          },
          afterBody: (items) => {
            const total = items.reduce((sum, i) => sum + i.parsed.y, 0);
            return [
              `─────────────`,
              `Total: ${total} task${total > 1 ? "s" : ""}`,
            ];
          },
        },
        filter: (item) => item.parsed.y > 0,
      },
    },
    scales: {
      y: {
        stacked: true,
        beginAtZero: true,
        max:
          Math.max(
            ...assignees.map(
              (a) => tasks.filter((t) => t.assignee === a).length,
            ),
          ) + 1,
        ticks: { stepSize: 1, precision: 0 },
        grid: { color: "rgba(0,0,0,0.05)" },
      },
      x: {
        stacked: true,
        grid: { display: false },
        ticks: { font: { size: 13, weight: "500" } },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default TeamPerformanceChart;
