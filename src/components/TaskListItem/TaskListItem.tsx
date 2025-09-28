import type { Task } from "../../models/task";
import { STATUS_COMPLETE } from "../../models/taskStatus";
import styles from "./TaskListItem.module.css";

type TaskListItemProps = {
  task: Task;
  onToggle?: () => void;
};

function TaskListItem({ task, onToggle }: TaskListItemProps) {
  return (
    <li className={styles.root}>
      <label className={styles.label}>
        <input
          type="checkbox"
          checked={task.status === STATUS_COMPLETE}
          onChange={onToggle}
          className={styles.checkbox}
        />
        <span className={styles.title}>{task.title}</span>
      </label>
    </li>
  );
}

export default TaskListItem;
