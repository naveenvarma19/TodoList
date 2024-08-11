import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TodolistComponent } from './components/todolist/todolist.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    TodolistComponent,
    FormsModule,
    NavbarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
