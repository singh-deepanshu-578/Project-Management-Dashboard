import { useProject } from "../../context/ProjectContext";
import TaskCompletionChart from "../../components/analytics/TaskCompletionChart";
import SprintVelocityChart from "../../components/analytics/SprintVelocityChart";
import TeamPerformanceChart from "../../components/analytics/TeamPerformanceChart";
import "./Analytics.scss";

const Analytics = () => {
  const { tasks } = useProject();

  const statusCounts = {
    "To Do": tasks.filter((t) => t.status === "todo").length,
    "In Progress": tasks.filter((t) => t.status === "inProgress").length,
    "In Review": tasks.filter((t) => t.status === "review").length,
    Done: tasks.filter((t) => t.status === "done").length,
  };

  return (
    <div className="analytics">
      <div className="analytics__header">
        <h1>Analytics</h1>
        <p>Track your team's performance and sprint metrics</p>
      </div>

      <div className="analytics__grid">
        <div className="analytics__card analytics__card--half">
          <h2>Task Completion Rate</h2>
          <TaskCompletionChart data={statusCounts} />
        </div>

        <div className="analytics__card analytics__card--half">
          <h2>Team Performance</h2>
          <TeamPerformanceChart tasks={tasks} />
        </div>

        <div className="analytics__card analytics__card--full">
          <h2>Sprint Velocity</h2>
          <SprintVelocityChart />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
