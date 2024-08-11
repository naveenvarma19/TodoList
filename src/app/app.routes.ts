import { Routes } from '@angular/router';
import { TodolistComponent } from './components/todolist/todolist.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'todolist',
    component: TodolistComponent,
  },
];
