import { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditTaskModal from "./EditTaskModal";
import "./TaskCard.scss";

const ITEM_TYPE = "TASK";

const priorityColors = {
  high: "#ef4444",
  medium: "#f59e0b",
  low: "#22c55e",
};

const TaskCard = ({ task, columnId, index, onDelete, onMoveTask, onEdit }) => {
  const ref = useRef(null);
  const [showEdit, setShowEdit] = useState(false);

  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: { id: task.id, columnId, index },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    hover(item) {
      if (item.id === task.id) return;
      onMoveTask(item.id, item.columnId, columnId, index);
      item.columnId = columnId;
      item.index = index;
    },
  });

  drag(drop(ref));

  return (
    <>
      <div ref={ref} className={`task-card ${isDragging ? "dragging" : ""}`}>
        <div className="task-card__header">
          <span
            className="task-card__priority"
            style={{
              background: `${priorityColors[task.priority]}20`,
              color: priorityColors[task.priority],
            }}
          >
            {task.priority}
          </span>
          <div className="task-card__actions">
            <button
              className="task-card__edit"
              onClick={() => setShowEdit(true)}
            >
              <EditIcon fontSize="small" />
            </button>
            <button
              className="task-card__delete"
              onClick={() => onDelete(task.id, columnId)}
            >
              <DeleteIcon fontSize="small" />
            </button>
          </div>
        </div>

        <h4 className="task-card__title">{task.title}</h4>

        <div className="task-card__footer">
          <div className="task-card__assignee">
            <div className="task-card__avatar">{task.assignee[0]}</div>
            <span>{task.assignee}</span>
          </div>
          <span className="task-card__due">{task.dueDate}</span>
        </div>
      </div>

      {showEdit && (
        <EditTaskModal
          task={task}
          onSave={onEdit}
          onClose={() => setShowEdit(false)}
        />
      )}
    </>
  );
};

export default TaskCard;
