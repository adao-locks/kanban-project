import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Output() statusChanged = new EventEmitter<{ task: Task, direction: 'forward' | 'back' }>();
  @Output() deleteTask = new EventEmitter<Task>();
  @Output() editTask = new EventEmitter<Task>();
  showConfirm = false;

  moveTask(direction: 'forward' | 'back'): void {
    this.statusChanged.emit({ task: this.task, direction});
  }

  delete(): void {
    this.deleteTask.emit(this.task);
  }

  onEditClick(): void {
    this.editTask.emit(this.task); // Emite a tarefa, não o click
  }

  traduzirPrioridade(prio: 'low' | 'medium' | 'high'): string {
    switch (prio) {
      case 'low': return 'Baixa';
      case 'medium': return 'Média';
      case 'high': return 'Alta';
      default: return '';
    }
  }

  confirmDelete() {
    this.showConfirm = true;
  }

  cancelDelete() {
    this.showConfirm = false;
  }

  confirmDeleteFinal() {
    this.showConfirm = false;
    this.delete();
  }
}
