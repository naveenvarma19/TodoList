import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

interface Task {
  taskName: string;
  isCompleted: boolean;
  isEditable: boolean;
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
  ],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css',
})
export class TodolistComponent implements OnInit {
  taskList: Task[] = [];
  hidesort: boolean = true;

  constructor() {}

  ngOnInit(): void {
    this.getFromLocalStorage();
  }

  onSubmit(form: NgForm) {
    this.taskList.push({
      taskName: form.controls['task'].value,
      isCompleted: false,
      isEditable: false,
    });
    this.saveToLocalStorage();
    form.reset();
  }

  saveToLocalStorage() {
    let stringJSON = JSON.stringify(this.taskList);
    localStorage.setItem('todolist', stringJSON);
  }

  getFromLocalStorage() {
    let itemsJSONString = localStorage.getItem('todolist');
    if (itemsJSONString != null) {
      this.taskList = JSON.parse(itemsJSONString);
    }
  }

  onCheck(index: any) {
    this.taskList[index].isCompleted = !this.taskList[index].isCompleted;
    this.saveToLocalStorage();
  }

  onDeleteTask(index: any) {
    this.taskList.splice(index, 1);
    this.saveToLocalStorage();
  }

  onEditTask(index: any) {
    this.taskList[index].isEditable = true;
    this.saveToLocalStorage();
  }

  onSaveTask(index: any, taskInTable: string) {
    this.taskList[index].taskName = taskInTable;
    this.taskList[index].isEditable = false;
    this.saveToLocalStorage();
  }

  onSortAsc() {
    this.taskList.sort((a, b) => a.taskName.localeCompare(b.taskName));
    this.saveToLocalStorage();
    this.hidesort = !this.hidesort;
  }
  onSortDsc() {
    this.taskList.reverse();
    this.saveToLocalStorage();
    this.hidesort = !this.hidesort;
  }
}
