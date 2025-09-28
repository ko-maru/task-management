import { render, screen, fireEvent } from "@testing-library/react";
import TaskListItem from "./TaskListItem";
import { createTask } from "../../models/task";
import { parseTaskTitle } from "../../models/taskTitle";
import {
  parseTaskStatus,
  STATUS_COMPLETE,
  STATUS_INCOMPLETE,
} from "../../models/taskStatus";

describe("TaskListItem", () => {
  it("チェックボックスクリックでonToggleが呼ばれる", () => {
    const handleToggle = vi.fn();
    render(
      <TaskListItem
        task={createTask({
          title: parseTaskTitle("トグルテスト"),
          status: parseTaskStatus(STATUS_INCOMPLETE),
        })}
        onToggle={handleToggle}
      />,
    );
    fireEvent.click(screen.getByRole("checkbox"));
    expect(handleToggle).toHaveBeenCalledTimes(1);
  });
  it("completed=trueでチェックボックスがONになる", () => {
    render(
      <TaskListItem
        task={createTask({
          title: parseTaskTitle("完了済み"),
          status: parseTaskStatus(STATUS_COMPLETE),
        })}
      />,
    );
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("completed=falseでチェックボックスがOFFになる", () => {
    render(
      <TaskListItem
        task={createTask({
          title: parseTaskTitle("未完了"),
          status: parseTaskStatus(STATUS_INCOMPLETE),
        })}
      />,
    );
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("タイトルがpropsで制御される", () => {
    render(
      <TaskListItem
        task={createTask({
          title: parseTaskTitle("タイトルA"),
          status: parseTaskStatus(STATUS_INCOMPLETE),
        })}
      />,
    );
    expect(screen.getByText("タイトルA")).toBeInTheDocument();
  });
});
