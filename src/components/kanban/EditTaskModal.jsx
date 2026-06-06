import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "./AddTaskModal.scss";

const EditTaskModal = ({ task, onSave, onClose }) => {
  const [form, setForm] = useState({
    title: task.title,
    priority: task.priority,
    assignee: task.assignee,
    dueDate: task.dueDate,
  });

  const handleSubmit = () => {
    if (!form.title.trim()) return;
    onSave(task.id, form);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h3>Edit Task</h3>
          <button className="modal__close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <div className="modal__body">
          <div className="modal__field">
            <label>Task Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div className="modal__field">
            <label>Priority</label>
            <select
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="modal__field">
            <label>Assignee</label>
            <input
              type="text"
              value={form.assignee}
              onChange={(e) => setForm({ ...form, assignee: e.target.value })}
            />
          </div>

          <div className="modal__field">
            <label>Due Date</label>
            <input
              type="date"
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            />
          </div>
        </div>

        <div className="modal__footer">
          <button className="modal__btn modal__btn--cancel" onClick={onClose}>
            Cancel
          </button>
          <button
            className="modal__btn modal__btn--submit"
            onClick={handleSubmit}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
