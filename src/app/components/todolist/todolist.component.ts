import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChangeDetectionStrategy, inject } from '@angular/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MetadataComponent } from '../metadata/metadata.component';
import { HeaderComponent } from '../header/header.component';

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
    HeaderComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css',
})
export class TodolistComponent implements OnInit {
  taskList: Task[] = [];
  sortAsc: boolean = true;
  readonly dialog = inject(MatDialog);

  constructor() {}

  ngOnInit(): void {
    this.getFromLocalStorage();
  }

  onSubmit(form: NgForm) {
    this.dialog.open(MetadataComponent, {
      width: '750px',
      height: '500px',
    });

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
    this.sortAsc = !this.sortAsc;
  }
  onSortDsc() {
    this.taskList.reverse();
    this.saveToLocalStorage();
    this.sortAsc = !this.sortAsc;
  }
}
