import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialog } from '@angular/material/dialog';
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
  taskList: Task[] = [];

  constructor() {}

  ngOnInit(): void {
    this.getFromLocalStorage();
  }

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
      this.saveToLocalStorage();
      form.reset();
    }
  }

  saveToLocalStorage() {
    const stringJSON = JSON.stringify(this.taskList);
    localStorage.setItem('todolist', stringJSON);
  }

  getFromLocalStorage() {
    const itemsJSONString = localStorage.getItem('todolist');
    if (itemsJSONString) {
      this.taskList = JSON.parse(itemsJSONString);
    }
  }

  onDeleteTask(index: number) {
    this.taskList.splice(index, 1);
    this.saveToLocalStorage();
  }

  onEditName(index: number): void {
    this.taskList[index].isNameEditable = true;
  }

  onSaveName(index: number): void {
    this.taskList[index].isNameEditable = false;
  }

  onEditDescription(index: number): void {
    this.taskList[index].isDescriptionEditable = true;
  }

  onSaveDescription(index: number): void {
    this.taskList[index].isDescriptionEditable = false;
  }

  onCompleteTask(index: number) {
    this.taskList[index].isCompleted = true;
    this.saveToLocalStorage();
  }
}
