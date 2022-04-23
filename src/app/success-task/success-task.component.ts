import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-success-task',
  templateUrl: './success-task.component.html',
  styleUrls: ['./success-task.component.scss']
})
export class SuccessTaskComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SuccessTaskComponent>) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.dialogRef.close();
    }, 1500)
  }

}
