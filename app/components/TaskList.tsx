"use client";

import React from "react";
import { TaskData } from "../types/types";
import Task from "./Task";

interface TaskListProps {
  tasks: TaskData[];
  onTaskUpdated: () => void; // 新しく追加
}

const TaskList = ({ tasks, onTaskUpdated }: TaskListProps) => {
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <Task key={task.id} task={task} onTaskUpdated={onTaskUpdated} />
      ))}
    </div>
  );
};

export default TaskList;
