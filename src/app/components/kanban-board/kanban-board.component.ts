import { Component } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.css'
})
export class KanbanBoardComponent {

  todo: Task[] = [];
  inProgress: Task[] = [];
  done: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    const tasks = this.taskService.getTasks();
    this.todo = tasks.filter(t => t.status === 'todo');
    this.inProgress = tasks.filter(t => t.status === 'in-progress');
    this.done = tasks.filter(t => t.status === 'done');
  }

  handleStatusChange(event: { task: Task, direction: 'forward' | 'back' }): void {
    const { task, direction } = event;
    const currentStatus = task.status;

    const statusOrder: Task['status'][] = ['todo', 'in-progress', 'done'];
    const index = statusOrder.indexOf(currentStatus);

    if (direction === 'forward' && index < statusOrder.length - 1) {
      task.status = statusOrder[index + 1];
    } else if (direction === 'back' && index > 0) {
      task.status = statusOrder[index - 1];
    }

    this.taskService.updateTask(task);
    this.reloadTasks();
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task.id);
    this.reloadTasks();
  }

  editingTask: Task | null = null;

  editTask(task: Task): void {
    this.editingTask = { ...task };
  }

  onFormCleared(): void {
    this.editingTask = null;
  }

  selectedPriority: 'low' | 'medium' | 'high' | '' = '';
sortByPriority: boolean = false;

reloadTasks(): void {
  let tasks = this.taskService.getTasks();

  if (this.selectedPriority) {
    tasks = tasks.filter(t => t.priority === this.selectedPriority);
  }

    if (this.sortByPriority) {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }

    this.todo = tasks.filter(t => t.status === 'todo');
    this.inProgress = tasks.filter(t => t.status === 'in-progress');
    this.done = tasks.filter(t => t.status === 'done');
  }

}
