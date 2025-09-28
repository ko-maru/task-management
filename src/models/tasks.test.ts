import { describe, it, expect } from "vitest";
import { addTask, getTaskById, updateTaskById, removeTaskById } from "./tasks";
import { createTask } from "./task";
import { parseTaskId } from "./taskId";
import { parseTaskTitle } from "./taskTitle";

describe("getTaskById", () => {
  it("指定したIDのタスクを取得できる", () => {
    const id1 = parseTaskId("123e4567-e89b-12d3-a456-426614174000");
    const id2 = parseTaskId("123e4567-e89b-12d3-a456-426614174001");
    const tasks = [
      createTask({ id: id1, title: parseTaskTitle("task1") }),
      createTask({ id: id2, title: parseTaskTitle("task2") }),
    ];
    const found = getTaskById(tasks, id2);
    expect(found).not.toBeUndefined();
    expect(found?.id).toBe(id2);
    expect(found?.title).toBe("task2");
  });

  it("存在しないIDの場合はundefinedを返す", () => {
    const id1 = parseTaskId("123e4567-e89b-12d3-a456-426614174000");
    const id2 = parseTaskId("123e4567-e89b-12d3-a456-426614174001");
    const id3 = parseTaskId("123e4567-e89b-12d3-a456-426614174002");
    const tasks = [
      createTask({ id: id1, title: parseTaskTitle("task1") }),
      createTask({ id: id2, title: parseTaskTitle("task2") }),
    ];
    const found = getTaskById(tasks, id3);
    expect(found).toBeUndefined();
  });

  describe("removeTaskById", () => {
    it("指定したIDのタスクを削除できる", () => {
      const id1 = parseTaskId("123e4567-e89b-12d3-a456-426614174000");
      const id2 = parseTaskId("123e4567-e89b-12d3-a456-426614174001");
      const tasks = [
        createTask({ id: id1, title: parseTaskTitle("task1") }),
        createTask({ id: id2, title: parseTaskTitle("task2") }),
      ];
      const updatedTasks = removeTaskById(tasks, id2);
      expect(updatedTasks).toHaveLength(1);
      expect(updatedTasks[0].id).toBe(id1);
    });

    it("存在しないIDの場合は元のTasksリストを返す", () => {
      const id1 = parseTaskId("123e4567-e89b-12d3-a456-426614174000");
      const id2 = parseTaskId("123e4567-e89b-12d3-a456-426614174001");
      const id3 = parseTaskId("123e4567-e89b-12d3-a456-426614174002");
      const tasks = [
        createTask({ id: id1, title: parseTaskTitle("task1") }),
        createTask({ id: id2, title: parseTaskTitle("task2") }),
      ];
      const updatedTasks = removeTaskById(tasks, id3);
      expect(updatedTasks).toEqual(tasks);
    });

    it("空のリストでもエラーなく動作する", () => {
      const id1 = parseTaskId("123e4567-e89b-12d3-a456-426614174000");
      const tasks: any[] = [];
      const updatedTasks = removeTaskById(tasks, id1);
      expect(updatedTasks).toEqual([]);
    });
  });

  describe("updateTaskById", () => {
    it("指定したIDのタスクを更新できる", () => {
      const id1 = parseTaskId("123e4567-e89b-12d3-a456-426614174000");
      const id2 = parseTaskId("123e4567-e89b-12d3-a456-426614174001");
      const tasks = [
        createTask({ id: id1, title: parseTaskTitle("task1") }),
        createTask({ id: id2, title: parseTaskTitle("task2") }),
      ];
      const updatedTask = createTask({
        id: id2,
        title: parseTaskTitle("updated task2"),
      });
      const updatedTasks = updateTaskById(tasks, updatedTask);

      expect(updatedTasks).toHaveLength(2);
      expect(updatedTasks[1].id).toBe(id2);
      expect(updatedTasks[1].title).toBe("updated task2");
    });

    it("存在しないIDの場合は元のTasksリストを返す", () => {
      const id1 = parseTaskId("123e4567-e89b-12d3-a456-426614174000");
      const id2 = parseTaskId("123e4567-e89b-12d3-a456-426614174001");
      const id3 = parseTaskId("123e4567-e89b-12d3-a456-426614174002");
      const tasks = [
        createTask({ id: id1, title: parseTaskTitle("task1") }),
        createTask({ id: id2, title: parseTaskTitle("task2") }),
      ];
      const updatedTask = createTask({
        id: id3,
        title: parseTaskTitle("updated task3"),
      });
      const updatedTasks = updateTaskById(tasks, updatedTask);

      expect(updatedTasks).toEqual(tasks);
    });

    describe("addTask", () => {
      it("新しいタスクを追加できる", () => {
        const id1 = parseTaskId("123e4567-e89b-12d3-a456-426614174000");
        const id2 = parseTaskId("123e4567-e89b-12d3-a456-426614174001");
        const tasks = [createTask({ id: id1, title: parseTaskTitle("task1") })];
        const newTask = createTask({ id: id2, title: parseTaskTitle("task2") });
        const updatedTasks = addTask(tasks, newTask);

        expect(updatedTasks).toHaveLength(2);
        expect(updatedTasks[1].id).toBe(id2);
        expect(updatedTasks[1].title).toBe("task2");
      });

      it("同じIDのタスクを追加しようとするとエラーを投げる", () => {
        const id1 = parseTaskId("123e4567-e89b-12d3-a456-426614174000");
        const tasks = [createTask({ id: id1, title: parseTaskTitle("task1") })];
        const duplicateTask = createTask({
          id: id1,
          title: parseTaskTitle("duplicate task"),
        });

        expect(() => addTask(tasks, duplicateTask)).toThrowError(
          `IDが重複しています: ${id1}`,
        );
      });
    });
  });
});
