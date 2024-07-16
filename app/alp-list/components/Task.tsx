"use client";

import React, { useEffect, useRef, useState } from "react";
import { TaskData } from "../../types/types";

// Hirukawa
async function editTaskData(id: number, newText: string) {
  const response = await fetch(`http://localhost:3000/api/input/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: newText }),
  });
  const updatedTaskData: string = await response.json();
  return updatedTaskData;
}

async function deleteTaskData(id: number) {
  const response = await fetch(`http://localhost:3000/api/input/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

interface TaskProps {
  task: TaskData;
  onTaskUpdated: () => void; // 新しく追加
}

const Task = ({ task, onTaskUpdated }: TaskProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskTitle, setEditedTaskTitle] = useState(task.text);

  useEffect(() => {
    if (isEditing) {
      ref.current?.focus();
    }
  }, [isEditing]);
  const handleEdit = async () => {
    setIsEditing(true);
  };
  const handleSave = async () => {
    if (!task.id) {
      return <p>不正なパラメータ</p>;
    }
    await editTaskData(task.id, editedTaskTitle);
    setIsEditing(false);
    onTaskUpdated(); // タスクが更新されたことを親コンポーネントに通知
  };
  const handleDelete = async () => {
    if (!task.id) {
      return <p>不正なパラメータ</p>;
    }
    await deleteTaskData(task.id);
    onTaskUpdated(); // タスクが更新されたことを親コンポーネントに通知
  };

  return (
    <li
      key={task.id}
      className="flex justify-between p-4 bg-white border-l-4 border-blue-500 rounded shadow"
    >
      {isEditing ? (
        <div>
          <input
            ref={ref}
            type="text"
            className="py-1 px-2 rounded border-gray-400 border"
            value={editedTaskTitle}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEditedTaskTitle(e.target.value)
            }
          />
          <button className="text-blue-500 mr-3" onClick={handleSave}>
            save
          </button>

          <button className="text-red-500" onClick={handleDelete}>
            delete
          </button>
        </div>
      ) : (
        <div>
          <button className="text-black" onClick={handleEdit}>
            <span>{task.text}</span>
          </button>
        </div>
      )}
    </li>
  );
};

export default Task;
