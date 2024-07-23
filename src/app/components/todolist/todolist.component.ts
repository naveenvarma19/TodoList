import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css',
})
export class TodolistComponent implements OnInit {
  taskList = [{ taskName: 'Brush', isCompleted: false, isEditable: false }];

  constructor() {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.taskList.push({
      taskName: form.controls['task'].value,
      isCompleted: false,
      isEditable: false,
    });

    form.reset();
  }

  onCheck(index: any) {
    this.taskList[index].isCompleted = !this.taskList[index].isCompleted;
  }

  onDeleteTask(index: any) {
    this.taskList.splice(index, 1);
  }

  onEditTask(index: any) {
    this.taskList[index].isEditable = true;
  }

  onSaveTask(index: any, taskInTable: string) {
    this.taskList[index].taskName = taskInTable;
    this.taskList[index].isEditable = false;
  }
}
