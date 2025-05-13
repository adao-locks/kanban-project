import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() isOpen: boolean = false;
  @Output() sidebarToggle = new EventEmitter<boolean>();

  toggleSidebar() {
    this.isOpen = !this.isOpen;
    this.sidebarToggle.emit(this.isOpen);
  }

  closeSidebar() {
    this.isOpen = false;
  }

  toggleTheme() {
    document.body.classList.toggle('dark-theme');
  }
}
