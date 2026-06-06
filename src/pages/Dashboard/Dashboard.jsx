import { useProject } from "../../context/ProjectContext";
import StatCard from "../../components/common/StatCard";
import ProjectCard from "../../components/common/ProjectCard";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import GroupIcon from "@mui/icons-material/Group";
import "./Dashboard.scss";

const Dashboard = () => {
  const { tasks, projects } = useProject();

  const doneTasks = tasks.filter((t) => t.status === "done").length;
  const inProgressTasks = tasks.filter((t) => t.status === "inProgress").length;
  const totalMembers = [...new Set(projects.flatMap((p) => p.team))].length;

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h1>Welcome back! 👋</h1>
        <p>Here's what's happening with your projects today.</p>
      </div>

      <div className="dashboard__stats">
        <StatCard
          title="Total Tasks"
          value={tasks.length}
          icon={<DashboardIcon />}
          color="#6366f1"
          change={12}
        />
        <StatCard
          title="Completed"
          value={doneTasks}
          icon={<CheckCircleIcon />}
          color="#22c55e"
          change={8}
        />
        <StatCard
          title="In Progress"
          value={inProgressTasks}
          icon={<PendingIcon />}
          color="#f59e0b"
          change={-3}
        />
        <StatCard
          title="Team Members"
          value={totalMembers}
          icon={<GroupIcon />}
          color="#ec4899"
        />
      </div>

      <div className="dashboard__section">
        <h2 className="dashboard__section-title">Active Projects</h2>
        <div className="dashboard__projects">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
