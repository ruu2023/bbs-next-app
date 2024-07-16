"use client";

import React from "react";
import { TaskData } from "../../types/types";
import Task from "./Task";
import { useRouter } from "next/navigation";

interface TaskListProps {
  tasks: TaskData[];
  onTaskUpdated: () => void; // 新しく追加
}

const TaskList = ({ tasks, onTaskUpdated }: TaskListProps) => {
  const router = useRouter();
  const defects: string[] = ["T0-1", "T0-2", "T0-3", "T0-4", "T0-5"];
  const events: string[] = ["T0-1", "T0-2", "T0-3", "T0-4", "T0-5"];

  const handleClick = (col: number, row?: number) => {
    const queryString = `?events=${events[col]}&defect=${row}`;
    router.push("../alp-input/" + queryString);
  };

  return (
    <tbody>
      {tasks.map((task) => (
        <tr key={task.id} className="p-3 text-lg border">
          <td className="border text-right px-2">{task.id}</td>
          <td className="border w-96 whitespace-nowrap">
            <Task task={task} onTaskUpdated={onTaskUpdated} />
          </td>
          <td className="border py-2">
            <div className="flex justify-center gap-1 mb-3">
              <p className="flex flex-col justify-center w-8 text-center">R</p>
              <div>
                <button
                  className="py-1 px-6 bg-red-500 rounded-lg text-white"
                  onClick={() => handleClick(1, task.id)}
                >
                  OK
                </button>
              </div>
            </div>
            <div className="flex justify-center gap-1">
              <p className="flex flex-col justify-center w-8 text-center">L</p>
              <div>
                <button
                  className="py-1 px-6 bg-red-500 rounded-lg text-white"
                  onClick={() => handleClick(1, 1)}
                >
                  OK
                </button>
              </div>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TaskList;
