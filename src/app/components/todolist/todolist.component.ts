import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css',
})
export class TodolistComponent implements OnInit {
  taskArray = [{ taskName: 'Brush', isCompleted: false }];

  constructor() {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.taskArray.push({
      taskName: form.controls['task'].value,
      isCompleted: false,
    });

    form.reset();
  }

  onCheck(index: any) {
    this.taskArray[index].isCompleted = !this.taskArray[index].isCompleted;
  }

  onDeleteTask(index: any) {
    this.taskArray.splice(index, 1);
  }
}
