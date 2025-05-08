import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private storageKey = 'kanban-tasks';

  constructor() { }

  getTasks(): Task[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  saveTasks(tasks: Task[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }

  addTask(task: Task): void {
    const tasks = this.getTasks();
    tasks.push(task);
    this.saveTasks(tasks);
  }

  updateTask(updatedTask: Task): void {
    const tasks = this.getTasks().map(t =>
      t.id === updatedTask.id ? updatedTask : t
    );
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }

  deleteTask(id: string): void {
    const tasks = this.getTasks().filter(task => task.id !== id);
    this.saveTasks(tasks);
  }

}
