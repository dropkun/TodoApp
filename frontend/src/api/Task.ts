import axios from 'axios';

export interface Task {
  id: string;
  title: string;
  date: string;
  isCompleted: boolean;
}

class TaskAPI {
  private baseUrl: string;

  constructor(baseUrl: string) {
    if (baseUrl === undefined) {
      throw new EvalError("Invalid api url");
    }
    this.baseUrl = baseUrl;
  }

  public async createTask(title: string): Promise<Task | undefined> {
    try {
      const response = await axios.post<Task>(`${this.baseUrl}/task`, { title });
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      return undefined;
    }
  }

  public async getAllTasks(): Promise<Task[]> {
    try {
      const response = await axios.get<Task[]>(`${this.baseUrl}/tasks`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return [];
    }
  }

  public async updateTaskCompletion(id: string, isCompleted: boolean): Promise<Task | undefined> {
    try {
      const response = await axios.put<Task>(`${this.baseUrl}/task/${id}`, { isCompleted });
      return response.data;
    } catch (error) {
      console.error('Error updating task completion:', error);
      return undefined;
    }
  }

  public async deleteTask(id: string): Promise<Task | undefined> {
    try {
      const response = await axios.delete<Task>(`${this.baseUrl}/task/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting task:', error);
      return undefined;
    }
  }
}

export const taskAPI = new TaskAPI(import.meta.env.VITE_BACKAPI_URL);
