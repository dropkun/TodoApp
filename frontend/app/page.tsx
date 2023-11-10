"use client"
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { TaskComponent, TaskProps } from '@/components/TaskComponent'
import { AddTaskButton } from '@/components/AddTaskButton'
import { getTasks } from '@/api/TaskService'
import './globals.css'


export default function Home(): JSX.Element {
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  useEffect(() => {
    getTasks()
      .then((tasks) => {
        setTasks(tasks)
      })
  }, []);
  return (
    <main>
      <div>
        <div className='flex flex-wrap'>
          <h2> Task list </h2>
          <AddTaskButton />
        </div>
        <ul className=''>
          {tasks.map((task) => (
            <TaskComponent key={task.id}
              id={task.id}
              title={task.title}
              date={task.date}
              is_completed={task.is_completed}/>
          ))}
        </ul>
      </div>
    </main>
  )
}
