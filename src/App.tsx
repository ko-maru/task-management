import { useState } from "react";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import TaskListItem from "./components/TaskListItem";
import {
  addTask,
  getTaskById,
  updateTaskById,
  type Tasks,
} from "./models/tasks";
import { STATUS_COMPLETE } from "./models/taskStatus";
import type { TaskId } from "./models/taskId";
import { toggleTaskStatus } from "./models/task";

function App() {
  const [tasks, setTasks] = useState<Tasks>([]);

  const handleAddTask = (task: (typeof tasks)[number]) => {
    setTasks((prevTasks) => addTask(prevTasks, task));
    console.log("Added task:", task);
  };

  const handleToggleTask = (taskId: TaskId) => {
    setTasks((prevTasks) => {
      const task = getTaskById(prevTasks, taskId);
      if (!task) return prevTasks;

      const updatedTask = toggleTaskStatus(task);
      return updateTaskById(prevTasks, updatedTask);
    });
  };

  return (
    <div>
      <h1>タスク管理</h1>
      <AddTask onAdd={handleAddTask} />
      <TaskList>
        {tasks.map((task) => (
          <TaskListItem
            key={task.id}
            title={task.title}
            completed={task.status === STATUS_COMPLETE}
            onToggle={() => handleToggleTask(task.id)}
          />
        ))}
      </TaskList>
    </div>
  );
}

export default App;
