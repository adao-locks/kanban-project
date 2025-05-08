import { Component, EventEmitter, Output } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  title: string = '';
  description: string = '';
  status: 'todo' | 'in-progress' | 'done' = 'todo';
  priority: 'low' | 'medium' | 'high' = 'medium';

  @Output() taskAdded = new EventEmitter<void>();

  constructor(private taskService: TaskService) {}

  addTask(): void {
    const newTask = new Task();
    newTask.title = this.title;
    newTask.description = this.description;
    newTask.status = this.status;
    newTask.priority = this.priority;

    this.taskService.addTask(newTask);
    this.taskAdded.emit(); // avisa o componente pai que uma tarefa foi adicionada

    // limpa o formulário
    this.title = '';
    this.description = '';
    this.status = 'todo';
    this.priority = 'medium';
  }
}
