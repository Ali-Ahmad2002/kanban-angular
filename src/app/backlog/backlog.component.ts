import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit {

  allTasks: any = [];

  constructor(
    public firestore: AngularFirestore,
  ) { }

  ngOnInit(): void {
    this.firestore
      .collection('addedTask')
      .valueChanges({ idField: 'id' })
      .subscribe((changes: any) => {
        this.allTasks.push(changes);
        console.log('changes', this.allTasks);
      })
  }

  showDate(day: any) {
    let today = new Date(day * 1000);
    return today
  }

}
