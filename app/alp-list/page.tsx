"use client";

import { useRouter } from "next/navigation";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import { TaskData } from "../types/types";
import { useEffect, useState } from "react";

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

  const events: string[] = ["T0-1", "T0-2", "T0-3", "T0-4", "T0-5"];
  const tabs: string[] = ["#1", "#2", "#3", "#4"];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-200">
      <h1 className="text-4xl font-bold text-gray-700 -mt-32">List</h1>

      <div className="w-full mt-5">
        <div className="w-full flex justify-between">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-2 rounded-t-lg ${
                tab === activeTab
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
              style={{
                backgroundColor: tab === activeTab ? "white" : "black",
                color: tab === activeTab ? "blue" : "white",
              }}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="w-full px-8 py-6 bg-white shadow-md rounded-md">
          <AddTask onTaskAdded={loadTasks} />
          <div>{activeTab} content</div>
        </div>
        <div className="overflow-x-auto px-8 py-6 bg-white shadow-md rounded-md">
          <table className="p-3 divide-y-2 divide-gray-200">
            <thead className="p-3 text-2xl">
              <tr>
                <th className="w-18 whitespace-nowrap">No</th>
                <th className="w-96 whitespace-nowrap">name</th>
                {events.map((event, index) => (
                  <th className="w-40  whitespace-nowrap" key={index}>
                    {event}
                  </th>
                ))}
              </tr>
            </thead>
            <TaskList tasks={tasks} onTaskUpdated={loadTasks} />
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;
