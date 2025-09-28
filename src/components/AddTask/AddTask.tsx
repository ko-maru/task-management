import React, { useState } from "react";
import { createTask } from "../../models/task";
import { parseTaskTitle } from "../../models/taskTitle";

import styles from "./AddTask.module.css";

type AddTaskProps = {
  onAdd: (task: ReturnType<typeof createTask>) => void;
};

function AddTask({ onAdd }: AddTaskProps) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const validTitle = parseTaskTitle(title);
      const task = createTask({ title: validTitle });
      onAdd(task);
      setTitle("");
      setError(null);
    } catch (err: any) {
      setError(err.message || "タイトルが不正です");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.root}>
      <div className={styles.control}>
        <label htmlFor="task-title" className={styles.label}>
          <span className="sr-only">タスクのタイトル</span>
          <input
            type="text"
            value={title}
            onChange={handleInputChange}
            placeholder="タスクのタイトルを入力"
            className={styles.input}
          />
        </label>
        <button type="submit" className={styles.button} aria-label="タスクを追加">
          ＋
        </button>
      </div>
      {error && <p role="alert" className={styles.error}>{error}</p>}
    </form>
  );
}

export default AddTask;
