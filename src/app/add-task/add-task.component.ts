import { Component, OnInit } from '@angular/core';
import { addTask } from '../models/addTask.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  task = new addTask();
  taskTitle!: any;
  date!: any;
  description!: any;
  selectedValueCategory!: any;
  selectedValueUrgency!: any;
  categorys: any[] = [
    { value: 'Marketing', viewValue: 'Marketing' },
    { value: 'IT', viewValue: 'IT' },
    { value: 'Organisation', viewValue: 'Organisation' },
  ];
  urgencys: any[] = [
    { value: 'low', viewValue: 'Low' },
    { value: 'middle', viewValue: 'Middle' },
    { value: 'high', viewValue: 'High' },
  ];
  loading = false;

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  saveTask() {
    this.task.taskTitle = this.taskTitle;
    this.task.date = this.date.getTime();
    this.task.category = this.selectedValueCategory;
    this.task.urgency = this.selectedValueUrgency;
    this.task.description = this.description;
    this.loading = true;
    console.log('current task', this.task);
    this.firestore.collection('addedTask')
      .add(this.task.toJson())
      .then((result: any) => {
        this.loading = false;
        console.log('added Task', result);
        
      })
    this.clearFields()
  }

  clearFields() {
    this.taskTitle = '';
    this.date = '';
    this.selectedValueCategory = '';
    this.selectedValueUrgency = '';
    this.description = '';
  }


}
