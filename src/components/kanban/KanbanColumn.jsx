import { useDrop } from 'react-dnd';
import TaskCard from './TaskCard';
import AddIcon from '@mui/icons-material/Add';
import './KanbanColumn.scss';

const ITEM_TYPE = 'TASK';

const columnColors = {
  todo:       '#6366f1',
  inProgress: '#f59e0b',
  review:     '#3b82f6',
  done:       '#22c55e',
};

const KanbanColumn = ({ column, tasks, onAddTask, onDeleteTask, onMoveTask, onEditTask }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ITEM_TYPE,
    drop(item) {
      if (item.columnId !== column.id) {
        onMoveTask(item.id, item.columnId, column.id, tasks.length);
        item.columnId = column.id;
      }
    },
    collect: monitor => ({ isOver: monitor.isOver() }),
  });

  const color = columnColors[column.id];

  return (
    <div ref={drop} className={`kanban-column ${isOver ? 'over' : ''}`}>
      <div className="kanban-column__header">
        <div className="kanban-column__title-wrap">
          <span className="kanban-column__dot" style={{ background: color }} />
          <h3 className="kanban-column__title">{column.title}</h3>
          <span className="kanban-column__count">{tasks.length}</span>
        </div>
        <button className="kanban-column__add" onClick={() => onAddTask(column.id)}>
          <AddIcon fontSize="small" />
        </button>
      </div>

      <div className="kanban-column__tasks">
        {tasks.map((task, index) => (
          <TaskCard
            key={task.id}
            task={task}
            columnId={column.id}
            index={index}
            onDelete={onDeleteTask}
            onMoveTask={onMoveTask}
            onEdit={onEditTask}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;