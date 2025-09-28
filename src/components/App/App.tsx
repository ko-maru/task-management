import useTasks from "../../hooks/useTasks";
import type { Task } from "../../models/task";
import AddTask from "../AddTask";
import TaskList from "../TaskList";
import TaskListItem from "../TaskListItem";

import styles from "./App.module.css";

function App() {
  const { tasks, addTask, toggleTask } = useTasks();

  const handleAddTask = (task: Task) => {
    addTask(task);
    console.debug("タスクを追加:", task);
  };

  const handleToggleTask = (task: Task) => {
    toggleTask(task.id);
    console.debug("タスクのステータスを切り替え:", task.id);
  };

  return (
    <div className={styles.root}>
      <h1>タスク管理</h1>
      <AddTask onAdd={handleAddTask} />
      <TaskList>
        {tasks?.map((task) => (
          <TaskListItem key={task.id} task={task} onToggle={handleToggleTask} />
        ))}
      </TaskList>
    </div>
  );
}

export default App;
