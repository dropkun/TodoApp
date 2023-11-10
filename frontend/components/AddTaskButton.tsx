import { addTask } from "@/api/TaskService"
import { useState } from "react";


export const AddTaskButton: React.FC = () => {
    const [taskName, setTaskName] = useState<string>("");

    const handleAdding = () => {
        addTask(taskName)
    }

    return (
        <div>
            <input
                type="button"
                value="Add"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleAdding} />
            <input type="text" name="name" className="border border-gray-400 rounded w-64"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}/>
        </div>
    )
}