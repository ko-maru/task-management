import React, { useState } from "react";
import { createTask } from "../../models/task";
import { parseTaskTitle } from "../../models/taskTitle";

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={handleInputChange}
        placeholder="タスクのタイトルを入力"
      />
      <button type="submit">追加</button>
      {error && <div style={{ color: "red", fontSize: "0.9em" }}>{error}</div>}
    </form>
  );
}

export default AddTask;
