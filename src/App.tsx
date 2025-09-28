import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import TaskListItem from "./components/TaskListItem";
import { STATUS_COMPLETE } from "./models/taskStatus";
import type { TaskId } from "./models/taskId";
import { type Task } from "./models/task";
import useTasks from "./hooks/useTasks";

function App() {
  const { tasks, addTask, toggleTask } = useTasks();

  const handleAddTask = (task: Task) => {
    addTask(task);
    console.debug("タスクを追加:", task);
  };

  const handleToggleTask = (taskId: TaskId) => {
    toggleTask(taskId);
    console.debug("タスクのステータスを切り替え:", taskId);
  };

  return (
    <div>
      <h1>タスク管理</h1>
      <AddTask onAdd={handleAddTask} />
      <TaskList>
        {tasks?.map((task) => (
          <TaskListItem
            key={task.id}
            task={task}
            onToggle={() => handleToggleTask(task.id)}
          />
        ))}
      </TaskList>
    </div>
  );
}

export default App;
