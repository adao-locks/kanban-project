export class Task {
  id: string = crypto.randomUUID();
  title!: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'done' = 'todo';
  priority: 'low' | 'medium' | 'high' = 'medium';
  createdAt: Date = new Date();
  dueDate?: Date;
}
