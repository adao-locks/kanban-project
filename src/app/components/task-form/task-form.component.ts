import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnChanges {
  title: string = '';
  description: string = '';
  status: 'todo' | 'in-progress' | 'done' = 'todo';
  priority: 'low' | 'medium' | 'high' = 'medium';

  @Input() taskToEdit: Task | null = null;
  @Output() taskAdded = new EventEmitter<void>();
  @Output() clearForm = new EventEmitter<void>();

  constructor(private taskService: TaskService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['taskToEdit'] && this.taskToEdit) {
      this.title = this.taskToEdit.title;
      this.description = this.taskToEdit.description || '';
      this.status = this.taskToEdit.status;
      this.priority = this.taskToEdit.priority || 'medium';
    }
  }

  addTask(): void {
    const task = new Task();
    task.title = this.title;
    task.description = this.description;
    task.status = this.status;
    task.priority = this.priority;

    if (this.taskToEdit) {
      task.id = this.taskToEdit.id; // mantém o ID da tarefa que está sendo editada
      this.taskService.updateTask(task);
    } else {
      task.id = crypto.randomUUID(); // novo ID para tarefa nova
      this.taskService.addTask(task);
    }

    this.taskAdded.emit();
    this.clearForm.emit();
    this.resetForm();
  }

  private resetForm(): void {
    this.title = '';
    this.description = '';
    this.status = 'todo';
    this.priority = 'medium';
  }
}
