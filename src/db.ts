import Dexie, { type EntityTable } from "dexie";
import type { Task } from "./models/task";

const db = new Dexie("TaskManagementDB") as Dexie & {
  tasks: EntityTable<Task, "id">;
};

db.version(1).stores({
  tasks: "++id, createdAt, title, status",
});

export { db };
