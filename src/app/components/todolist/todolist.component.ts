import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from '../header/header.component';

interface Task {
  taskName: string;
  taskDescription: string;
  isCompleted: boolean;
  isNameEditable: boolean;
  isDescriptionEditable: boolean;
}

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    FontAwesomeModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    HeaderComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css'],
})
export class TodolistComponent implements OnInit {
  taskList: Task[] = []; // Array to hold tasks

  constructor() {}

  ngOnInit(): void {
    this.getFromLocalStorage(); // Load tasks from local storage on initialization
  }

  // Handle form submission
  onSubmit(form: NgForm) {
    if (form.valid) {
      const { taskName, taskDescription } = form.value;
      this.taskList.push({
        taskName,
        taskDescription,
        isCompleted: false,
        isNameEditable: false,
        isDescriptionEditable: false,
      });
      this.saveToLocalStorage(); // Save tasks to local storage
      form.reset(); // Reset form fields
    }
  }

  // Save tasks to local storage
  saveToLocalStorage() {
    localStorage.setItem('todolist', JSON.stringify(this.taskList));
  }

  // Load tasks from local storage
  getFromLocalStorage() {
    const itemsJSONString = localStorage.getItem('todolist');
    if (itemsJSONString) {
      this.taskList = JSON.parse(itemsJSONString);
    }
  }

  // Delete a task by index
  onDeleteTask(index: number) {
    this.taskList.splice(index, 1);
    this.saveToLocalStorage(); // Save changes to local storage
  }

  // Enable name editing for a task
  onEditName(index: number): void {
    this.taskList[index].isNameEditable = true;
  }

  // Save changes to task name
  onSaveName(index: number): void {
    this.taskList[index].isNameEditable = false;
  }

  // Enable description editing for a task
  onEditDescription(index: number): void {
    this.taskList[index].isDescriptionEditable = true;
  }

  // Save changes to task description
  onSaveDescription(index: number): void {
    this.taskList[index].isDescriptionEditable = false;
  }

  // Mark a task as completed
  onCompleteTask(index: number) {
    this.taskList[index].isCompleted = true;
    this.saveToLocalStorage(); // Save changes to local storage
  }
}
