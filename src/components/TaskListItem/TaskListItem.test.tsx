import { render, screen, fireEvent } from "@testing-library/react";
import TaskListItem from "./TaskListItem";

describe("TaskListItem", () => {
  it("チェックボックスクリックでonToggleが呼ばれる", () => {
    const handleToggle = vi.fn();
    render(<TaskListItem title="トグルテスト" completed={false} onToggle={handleToggle} />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(handleToggle).toHaveBeenCalledTimes(1);
  });
  it("completed=trueでチェックボックスがONになる", () => {
    render(<TaskListItem title="完了済み" completed={true} />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("completed=falseでチェックボックスがOFFになる", () => {
    render(<TaskListItem title="未完了" completed={false} />);
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("タイトルがpropsで制御される", () => {
    render(<TaskListItem title="タイトルA" completed={false} />);
    expect(screen.getByText("タイトルA")).toBeInTheDocument();
  });
});
