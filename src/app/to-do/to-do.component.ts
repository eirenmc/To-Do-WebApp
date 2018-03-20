import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css'],
  animations: [
    trigger('tasks', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(':enter', stagger('300ms', [
          animate('.4s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-25%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(5px)', offset: .3}),
            style({opacity: 1, transform: 'translateY(0)', offset: 1}),
          ]))
        ]), {optional: true})
      ])
    ])
  ]
})

export class ToDoComponent implements OnInit {
  taskCount: number;
  notCompleted: number;
  todoText: string;
  taskStatus: boolean = false;
  tasks = [
    {taskText: 'Do the grocery shopping', complete: false},
    {taskText: 'Pick up prescription', complete: true}
  ];

  constructor() { }

  ngOnInit() {
    this.taskCount = this.tasks.length;
   /* for (let j = 0; j < this.tasks.length; j++) {
     // console.log(this.tasks[j]);
      if (this.tasks[j].complete === true) {
        this.notCompleted = this.tasks[j].length;
        console.log(this.notCompleted[j]);
      }else{
        this.notCompleted = 0;
      }
    }*/
  }

  addToDoTask() {
    if (this.todoText != null) {
      this.tasks.push({taskText: this.todoText, complete: false});
      this.todoText = '';
      this.taskCount = this.tasks.length;
    }
  }

  removeTask(i) {
    this.tasks.splice(i, 1);
    this.taskCount = this.tasks.length;
  }

  removeAllTasks() {
    this.tasks = [];
    this.taskCount = this.tasks.length;
  }

  updateTaskStatus(i) {
    this.tasks[i].complete = !this.tasks[i].complete;
  }
}
