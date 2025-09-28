import type { Task } from "../../models/task";
import { STATUS_COMPLETE } from "../../models/taskStatus";
import styles from "./TaskListItem.module.css";

type TaskListItemProps = {
  task: Task;
  onToggle?: (task: Task) => void;
  onDelete?: (task: Task) => void;
};

function TaskListItem({ task, onToggle, onDelete }: TaskListItemProps) {
  return (
    <li className={styles.root}>
      <label className={styles.label}>
        <input
          type="checkbox"
          checked={task.status === STATUS_COMPLETE}
          onChange={() => onToggle?.(task)}
          className={styles.checkbox}
        />
        <span className={styles.title}>{task.title}</span>
      </label>
      <button
        type="button"
        className={styles.deleteButton}
        aria-label="削除"
        onClick={() => onDelete?.(task)}
      />
    </li>
  );
}

export default TaskListItem;
