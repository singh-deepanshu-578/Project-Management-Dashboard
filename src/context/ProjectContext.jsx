import { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { initialData } from "../data/initialData";

const ProjectContext = createContext();

const loadFromStorage = (key, fallback) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
};

const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
};

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState(() =>
    loadFromStorage("pm_projects", initialData.projects),
  );
  const [tasks, setTasks] = useState(() =>
    loadFromStorage("pm_tasks", initialData.tasks),
  );
  const [columns, setColumns] = useState(() =>
    loadFromStorage("pm_columns", initialData.columns),
  );

  const persistTasks = (newTasks) => {
    setTasks(newTasks);
    saveToStorage("pm_tasks", newTasks);
  };

  const persistColumns = (newColumns) => {
    setColumns(newColumns);
    saveToStorage("pm_columns", newColumns);
  };

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    const newTasks = [...tasks, newTask];
    const newColumns = {
      ...columns,
      [task.status]: {
        ...columns[task.status],
        taskIds: [...columns[task.status].taskIds, newTask.id],
      },
    };
    persistTasks(newTasks);
    persistColumns(newColumns);
    return newTask;
  };

  const updateTask = (id, updates) => {
    const newTasks = tasks.map((t) => (t.id === id ? { ...t, ...updates } : t));
    persistTasks(newTasks);
  };

  const deleteTask = (id, columnId) => {
    const newTasks = tasks.filter((t) => t.id !== id);
    const newColumns = {
      ...columns,
      [columnId]: {
        ...columns[columnId],
        taskIds: columns[columnId].taskIds.filter((tid) => tid !== id),
      },
    };
    persistTasks(newTasks);
    persistColumns(newColumns);
  };

  const moveTask = (taskId, fromColumn, toColumn, newIndex) => {
    const newColumns = { ...columns };
    newColumns[fromColumn] = {
      ...newColumns[fromColumn],
      taskIds: newColumns[fromColumn].taskIds.filter((id) => id !== taskId),
    };
    const toIds = [...newColumns[toColumn].taskIds];
    toIds.splice(newIndex, 0, taskId);
    newColumns[toColumn] = { ...newColumns[toColumn], taskIds: toIds };

    const newTasks = tasks.map((t) =>
      t.id === taskId ? { ...t, status: toColumn } : t,
    );
    persistTasks(newTasks);
    persistColumns(newColumns);
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        tasks,
        columns,
        addTask,
        updateTask,
        deleteTask,
        moveTask,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => useContext(ProjectContext);
