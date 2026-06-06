import { useState } from "react";
import { useProject } from "../../context/ProjectContext";
import { useNotifications } from "../../context/NotificationContext";
import KanbanColumn from "../../components/kanban/KanbanColumn";
import AddTaskModal from "../../components/kanban/AddTaskModal";
import "./KanbanBoard.scss";

const KanbanBoard = () => {
  const { tasks, columns, addTask, deleteTask, moveTask, updateTask } =
    useProject();
  const { addNotification } = useNotifications();
  const [modalColumn, setModalColumn] = useState(null);

  const getColumnTasks = (columnId) => {
    return columns[columnId].taskIds
      .map((id) => tasks.find((t) => t.id === id))
      .filter(Boolean);
  };

  const handleAddTask = (columnId) => setModalColumn(columnId);

  const handleTaskAdded = (taskData) => {
    addTask(taskData);
    addNotification(`New task "${taskData.title}" added!`, "success");
  };

  const handleDeleteTask = (taskId, columnId) => {
    const task = tasks.find((t) => t.id === taskId);
    deleteTask(taskId, columnId);
    addNotification(`Task "${task?.title}" deleted`, "info");
  };

  const handleEditTask = (taskId, updates) => {
    updateTask(taskId, updates);
    addNotification(`Task updated successfully!`, "success");
  };

  return (
    <div className="kanban">
      <div className="kanban__header">
        <h1>Kanban Board</h1>
        <p>Drag and drop tasks to update their status</p>
      </div>

      <div className="kanban__board">
        {Object.values(columns).map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            tasks={getColumnTasks(column.id)}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
            onMoveTask={moveTask}
            onEditTask={handleEditTask}
          />
        ))}
      </div>

      {modalColumn && (
        <AddTaskModal
          columnId={modalColumn}
          onAdd={handleTaskAdded}
          onClose={() => setModalColumn(null)}
        />
      )}
    </div>
  );
};

export default KanbanBoard;
