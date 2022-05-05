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

  allTasks!: AddTask[];

  constructor(
    public firestore: AngularFirestore,
  ) { }

  ngOnInit(): void {
    this.firestore
      .collection('addedTask')
      .valueChanges({ idField: 'id' })
      .subscribe((changes: any) => {
        // console.log('changes', changes);
        this.allTasks = changes.map((t: any) => new AddTask(t));
        this.todo = this.allTasks.filter((t: any) => t.list == 'todo');
        this.inProgress = this.allTasks.filter((t: any) => t.list == 'inProgress');
        this.testing = this.allTasks.filter((t: any) => t.list == 'testing');
        this.done = this.allTasks.filter((t: any) => t.list == 'done');
      })
  }

  drop(event: CdkDragDrop<AddTask[]>, status:string) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      console.log(event);
      event.container.data[event.currentIndex]['list'] = status;
      console.log('EVENT',  event.container.data[event.currentIndex]);
      this.updateTaskList(event.container.data[event.currentIndex]);
    }
  }

  updateTaskList(item: AddTask) {
    console.log('Updating item', item);
    this.firestore
      .collection('addedTask')
      .doc(item['id'])
      .update(item.toJson())
      .then((res: any) => {
        console.log('test', this.allTasks)
      })
  }


}
