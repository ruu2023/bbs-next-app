"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { TaskData } from "../types/types";
// Hirukawa
async function addTaskData(task: TaskData) {
  const response = await fetch("http://localhost:3000/api/input", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  const newTaskData: TaskData = await response.json();
  return newTaskData;
}

const AddTask = ({ onTaskAdded }: { onTaskAdded: () => void }) => {
  const [taskText, setTaskText] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await addTaskData({ text: taskText });

    setTaskText("");
    onTaskAdded();
  };

  return (
    <form className="mb-4 space-y-3 ">
      <input
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTaskText(e.target.value)
        }
        type="text"
        className="w-full border px-4 py-2 rounded-md focus:outline-none focus:border-blue-400"
        value={taskText}
      />

      <button
        onClick={handleSubmit}
        className="w-full px-4 py-2 text-white bg-blue-500 rounded-md transform hover:bg-blue-400 hover:scale-95 duration-200"
      >
        追加
      </button>
    </form>
  );
};

export default AddTask;
