"use client";

import React, { useEffect, useState } from "react";
import AddTask from "../components/AddTask";
import { TaskData } from "../types/types";
import TaskList from "../components/TaskList";

// Hirukawa
async function getAllTasks() {
  const response = await fetch("http://localhost:3000/api/input", {
    cache: "no-store",
  });
  const tasksAllData: TaskData[] = await response.json();
  return tasksAllData;
}

const Page = () => {
  // const tasksAllData = await getAllTasks();
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTasks = async () => {
    const tasks = await getAllTasks();
    setTasks(tasks);
    setLoading(false);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-200">
      <h1 className="text-4xl font-bold text-gray-700 -mt-32">TodoList</h1>
      <div className="w-full max-w-xl mt-5">
        <div className="w-full px-8 py-6 bg-white shadow-md rounded-md">
          <AddTask onTaskAdded={loadTasks} />
          {loading ? (
            <p>Loading...</p> // ローディング中の表示
          ) : (
            <TaskList tasks={tasks} onTaskUpdated={loadTasks} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
