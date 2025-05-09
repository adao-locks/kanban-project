import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isHidden = false;

  toggleSidebar() {
    this.isHidden = !this.isHidden;
  }

  toggleTheme() {
    document.body.classList.toggle('dark-theme');
  }
}
