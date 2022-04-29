import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AddTask } from '../models/addTask.class';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  todo!: AddTask[];
  inProgress!: AddTask[];
  testing!: AddTask[];
  done!: AddTask[];
  taskList!: string;

  allTasks!: AddTask[];

  constructor(
    public firestore: AngularFirestore,
  ) { }

  ngOnInit(): void {
    this.firestore
      .collection('addedTask')
      .valueChanges({ idField: 'id' })
      .subscribe((changes: any) => {
        console.log('changes', changes);
        this.allTasks = changes.map((t: any) => new AddTask(t));
        this.todo = this.allTasks.filter((t: any) => t.list == 'todo');
        this.inProgress = this.allTasks.filter((t: any) => t.list == 'inProgress');
        this.testing = this.allTasks.filter((t: any) => t.list == 'testing');
        this.done = this.allTasks.filter((t: any) => t.list == 'done');


      })
  }

  drop(event: CdkDragDrop<AddTask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      for (let i = 0; i < this.allTasks.length; i++) {
        this.updateTaskList(this.allTasks[i].list)
      }

    }
  }

  updateTaskList(list: any) {
    this.firestore
      .collection('addedTask')
      .doc(list)
      .update(list)
      .then((res: any) => {
        console.log(list)
      })
  }


}
