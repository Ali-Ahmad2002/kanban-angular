import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AddTask } from '../models/addTask.class';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit {

  allTasks: any = [];
  taskId: any = '';

  constructor(
    public firestore: AngularFirestore,
    public router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.firestore
      .collection('addedTask')
      .valueChanges({ idField: 'id' })
      .subscribe((changes: any) => {
        this.allTasks.push(changes);
        console.log('changes', this.allTasks[0]);
      })
    // this.route.paramMap.subscribe(paramap => {
    //   this.taskId = paramap.get('list');
    //   console.log('taskId', this.taskId)
    // })
  }

  showDate(day: any) {
    let today = new Date(day * 1000);
    return today
  }

  deletTask(task: any) {
    console.log('TASK', task)
    this.firestore
      .collection('addedTask')
      .doc(task.id)
      .delete()
      .then(res => {
        console.log('Product deleted Successfully');
        this.reloadCurrentRoute();
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

}
