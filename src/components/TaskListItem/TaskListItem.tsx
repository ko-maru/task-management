import styles from "./TaskListItem.module.css";

type TaskListItemProps = {
  title: string;
  completed: boolean;
  onToggle?: () => void;
};

function TaskListItem({ title, completed, onToggle }: TaskListItemProps) {
  return (
    <li className={styles.root}>
      <label className={styles.label}>
        <input
          type="checkbox"
          checked={completed}
          onChange={onToggle}
          className={styles.checkbox}
        />
        <span className={styles.title}>{title}</span>
      </label>
    </li>
  );
}

export default TaskListItem;
