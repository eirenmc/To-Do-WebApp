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
  // Variables
  taskCount: number;
  notCompleted: number;
  todoText: string;
  taskStatus: boolean = false;

  // Array to hold the to-dos, set up with 2 default entries to show off styling for completed and incomplete to-dos
  tasks = [
    { taskText: 'Do the grocery shopping', complete: false },
    { taskText: 'Pick up prescription', complete: true }
  ];

  constructor() { }

  ngOnInit() {
    // On initilaizing of app, it sets the task counter for all the to-dos that was created
    // Its used to visually display the amount of to-dos the user has created, both incomplete and complete
    this.taskCount = this.tasks.length;
  }

  // Function to create a to-do task, that checks firstly that the value is not null or empty
  addToDoTask() {
    if (this.todoText != null) {
      // Pushs the new to-do task with a complete value of false into the tasks array,
      // as its a new entry and not something the user has completed yet
      this.tasks.push({taskText: this.todoText, complete: false});

      // resets todoText to null, thus emptying out the previous value that was entered
      this.todoText = null;

      // Updates the to-do counter based on the number of entries in the tasks array
      this.taskCount = this.tasks.length;
    }
  }

  // Function to remove a specified to-do task from the list and update counter
  removeTask(i) {
    this.tasks.splice(i, 1);
    this.taskCount = this.tasks.length;
  }

  // Function to remove all to-do tasks and update counter
  removeAllTasks() {
    this.tasks = [];
    this.taskCount = this.tasks.length;
  }

  // Function to update a to-do tasks status, i.e complete or pending
  // This function switches the value of whether its complete or pending
  // in the array, depending on which one is clicked on
  updateTaskStatus(i) {
    this.tasks[i].complete = !this.tasks[i].complete;
  }
}
