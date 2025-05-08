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

  moveTask(direction: 'forward' | 'back'): void {
    this.statusChanged.emit({ task: this.task, direction});
  }
}
