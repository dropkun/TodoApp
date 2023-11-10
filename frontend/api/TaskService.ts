import { TaskProps } from "@/components/TaskComponent";
import { ReactNode, ReactPropTypes } from "react";

export const getTasks = async () => {
    const res = await fetch("http://localhost:3001/tasks", {
        method: "GET",
    });

    console.log("Fetched to get tasks");

    const tasks = await res.json();
    console.log(tasks);
    return tasks;
};

export const getTask = async (id : string) => {
    const res = await fetch("http://localhost:3001/task/" + id, {
        method: "GET",
    });
    
    console.log("Fetched to get task");

    const task = await res.json();
    console.log(task);
    return task;
};

export const addTask = async (taskname : string) => {
    const res = await fetch("http://localhost:3001/task", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: taskname,
            date: getNowDateTime(),
            is_completed: false,
        }),
    }).then((res) => {
        if (!res.ok) {
            throw new Error("HTTP error " + res.status);
        }
        return res.json();
    });

    console.log("Fetched to add task");
}

export const deleteTask = async (id : string) => {
    console.log(id);
    try {
        const res = await fetch("http://localhost:3001/task/" + id, {
            method: "DELETE",

        });
        console.log("Fetched to delete task");
    } catch (error) {
        console.error("Error:", error);
    }

    console.log("Fetched to delete task");
}

const getNowDateTime = (): string => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    return `${year}/${month}/${date} ${hours}:${minutes}:${seconds}`;
}