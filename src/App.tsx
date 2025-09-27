import TaskList from "./components/TaskList";
import TaskListItem from "./components/TaskListItem";
import { createTask } from "./models/task";
import type { Tasks } from "./models/tasks";
import { STATUS_COMPLETE } from "./models/taskStatus";
import { parseTaskTitle } from "./models/taskTitle";

const tasks: Tasks = [
  createTask({ title: parseTaskTitle("Task 1") }),
  createTask({ title: parseTaskTitle("Task 2") }),
  createTask({ title: parseTaskTitle("Task 3"), status: STATUS_COMPLETE }),
];

function App() {
  return (
    <TaskList>
      {tasks.map((task) => (
        <TaskListItem
          key={task.id}
          title={task.title}
          completed={task.status === STATUS_COMPLETE}
        />
      ))}
    </TaskList>
  );
}

export default App;
