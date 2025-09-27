import styles from "./TaskListItem.module.css";

type TaskListItemProps = {
  title: string;
  completed: boolean;
  onToggle?: () => void;
};

function TaskListItem({ title, completed, onToggle }: TaskListItemProps) {
  return (
    <label className={styles.root}>
      <input
        type="checkbox"
        checked={completed}
        onChange={onToggle}
        className={styles.checkbox}
      />
      <span className={styles.title}>{title}</span>
    </label>
  );
}

export default TaskListItem;
