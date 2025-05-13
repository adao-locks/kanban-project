import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'kanban-project';
  isSidebarOpen: boolean = false;

  togglesSidebar(open: boolean) {
    this.isSidebarOpen = open;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

}
