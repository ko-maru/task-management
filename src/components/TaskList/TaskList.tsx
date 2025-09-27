import styles from "./TaskList.module.css";

function TaskList({ children }: { children: React.ReactNode }) {
  return <ul className={styles.root}>{children}</ul>;
}

export default TaskList;
