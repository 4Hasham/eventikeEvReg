import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

export interface DialogData {
  img: string | ArrayBuffer;
}

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css']
})

export class DragDropComponent implements OnInit {

  public img: string | ArrayBuffer;

  constructor(public Dialog: MatDialog) {}

  ngOnInit(): void {}

  upload = (event: any) => {
    if(event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        console.log(event.target.result);
        this.img = event.target.result;
        this.openDialog();
      }
    }
  }

  openDialog = (): void => {
    this.Dialog.open(DialogBoxComponent, {
      width: '1000px',
      height: '500px',
      data: {
        img: this.img
      }
    });
  }
}

@Component({
  selector: 'app-dialog-box',
  templateUrl: 'app-dialog-box.html',
  styleUrls: ['app-dialog-box.css']
})

export class DialogBoxComponent {
  constructor(public dialogRef: MatDialogRef<DialogBoxComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  closeDialog = () => {
    this.dialogRef.close();
  }
}