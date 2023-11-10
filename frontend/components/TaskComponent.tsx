'use client'
import React, { useState } from 'react'
import { deleteTask, getTask } from '@/api/TaskService'
import { get } from 'http';
import { ObjectId } from 'mongodb';

export interface TaskProps {
    id: string;
    title?: string;
    date?: string;
    is_completed?: boolean;
}

export const TaskComponent: React.FC<TaskProps> = ({
    id,
    title,
    date,
    is_completed,

}) => {
    const [isCompleted, setIsCompleted] = useState<boolean>(is_completed ?? false);

    const taskClick = () => {
        setIsCompleted(!isCompleted);
    };

    const deleteClick = () => {
        console.log(id);
        getTask(id);
        deleteTask(id);
    }

    return (
        <div className='flex flex-wrap my-2'>
            <div className='flex flex-wrap bg-cyan-100 hover:bg-cyan-200 rounded-md p-2 mr-2 w-4/5'
                onClick={taskClick}>
                <div className='w-1/12'>
                    {isCompleted && <span className="material-icons">☑️</span>}
                    {!isCompleted && <span className="material-icons">◻️</span>}
                </div>
                <p className='w-1/2'>{title}</p>
                <p>{date}</p>
            </div>
            <input
                type="button"
                value="Delete"
                className="bg-red-500
            hover:bg-red-700
            text-white font-bold
            w-1/7
            py-2 px-4 rounded"
                onClick={deleteClick} />
        </div>
    )
}
