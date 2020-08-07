import { Component, OnInit, EventEmitter, Input, Output, ChangeDetectorRef, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatTable } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { InvokeMethodExpr } from '@angular/compiler';

@Component({
  selector: 'app-conference',
  templateUrl: './conference.component.html',
  styleUrls: ['./conference.component.css']
})

export class ConferenceComponent implements OnInit {
  
  @ViewChild('table', {static: false}) table: MatTable<Element>

  public data = [
    {room: 'Room A', title: 'How to make ice-cream', date: '3/20/2014', time: '19:45 - 20:15', action: 1, desc: 'My example description.', type: 'paid', amount: 420},
    {room: 'Room A', title: 'How not to make ice-cream', date: '3/20/2014', time: '20:30 - 21:15', action: 2, desc: 'My example desc', type: 'pass', amount: 0}
  ];
  public dataSource = this.data;
  public displayedColumns = ['room', 'title', 'date', 'time', 'action'];
  public name: string;
  public title: string;
  public inter1: number;
  public edited: boolean;
  public desc;
  public inter2: number;
  public inter3: number;
  public inter4: number;
  public type: string;
  public amount: number;
  public errors: boolean[];
  public flag: boolean;
  public counter: number;
  public Z: boolean;
  public amountFlag: boolean;
  public date = new Date();
  public sTimeH: number;
  public sTimeM: number;
  public eTimeH: number;
  public eTimeM: number;
  public mins: number[];
  public hours: number[];
  public control = new FormControl();
  public suggestions: Observable<string[]>;
  public addedF: boolean;
  public edit: boolean;
  public index: number;
  @Output() valid = new EventEmitter<boolean>()
  @Input() dates: string[];
  
  constructor(private ChangeDetectorRefs: ChangeDetectorRef, private Dialog: MatDialog) { }

  ngOnInit(): void {
    this.name = "";
    this.title = "";
    this.type = "free";
    this.flag = false;
    this.errors = [false, false, false, false, false];
    this.Z = true;
    this.edited = true;
    this.counter = 0;
    this.inter1 = 0;
    this.inter2 = 0;
    this.inter3 = 0;
    this.inter4 = 0;
    this.amountFlag = true;
    this.date = new Date();
    this.sTimeH = 0;
    this.sTimeM = 0;
    this.eTimeH = 0;
    this.eTimeM = 0;
    this.hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    this.mins = [0, 15, 30, 45];
    this.addedF = false;
    this.edit = false;
    this.index = -1;
    setInterval(this.checkFlag, 600);
    this.suggestions = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  _filter = (str: string): string[] => {
    let s = str.toLowerCase();
    let sa = [];
    for(let i = 0; i < this.data.length; i++) {
      sa.push(this.data[i].room);
    }
    return sa.filter(option => option.toLowerCase().includes(s));
  }

  saveName = (event: any) => {
    this.name = event;
    if(this.inter1 == 0) {
      this.inter1 = setInterval(this.checkValidityName, 600);
    }
  }

  saveTitle = (event: any) => {
    this.title = event;
    if(this.inter3 == 0) {
      this.inter3 = setInterval(this.checkValidityTitle, 600);
    }
  }

  checkValidityName = () => {
    let len: number = this.name.trim().length;
    if(len != 0) {
      if(len < 3) {
        this.flag = true;
        this.errors[0] = true;
      }
      else if(len > 100) {
        this.flag = true;
        this.errors[0] = true;
      }
      else {
        this.errors[0] = false;
      }
    }
    else {
      this.flag = true;
    }
  }

  checkValidityTitle = () => {
    let len: number = this.title.trim().length;
    if(len != 0) {
      if(len < 3) {
        this.flag = true;
        this.errors[3] = true;
      }
      else if(len > 100) {
        this.flag = true;
        this.errors[3] = true;
      }
      else {
        this.errors[3] = false;
      }
    }
    else {
      this.flag = true;
    }
  }

  count = (event: any) => {
    this.counter = event.editor.getLength() - 1;
  }

  checkValidityDesc = () => {
    if(this.counter != 0) {
      if(this.counter < 20) {
        this.flag = true;
        if(this.edited == false) {
          this.errors[1] = true;
        }
      }
      else if(this.counter > 1000) {
        this.flag = true;
        if(this.edited == false) {
          this.errors[2] = true;
        }
      }
      else {
        this.errors[1] = false;
        this.errors[2] = false;
      }
    }
    else {
      this.flag = true;
    }
  }

  checkFlag = () => {

    if(!this.errors[0] && !this.errors[1] && !this.errors[2] && this.name.trim().length != 0  && !this.errors[3] && this.title.trim().length != 0 && this.counter != 0) {
      this.flag = false;
    }
    else {
      this.flag = true;
    }

    if(!this.flag) {
      this.flag = false;
      this.errors[0] = false;
      this.errors[1] = false;
      this.errors[2] = false;
      this.errors[3] = false;
      this.errors[4] = false;
    }

    if(this.Z != this.flag) {
      this.valid.emit(this.flag);
      this.Z = this.flag;
    }
  }

  saveDesc = (event: any) => {
    this.desc = event;
    if(this.inter2 == 0) {
      this.inter2 = setInterval(this.checkValidityDesc, 600);
    }
    this.edited = false;
  }

  changeType = (event: any) => {
    this.type = event;
    if(this.type == 'free') {
      this.amountFlag = true;
    }
    else if(this.type == 'pass') {
      this.amountFlag = true;
    }
    else {
      this.amountFlag = false;
    }
  } 

  saveDate = (event: MatDatepickerInputEvent<Date>) => {
    this.date = event.value;
  }

  setNewTime = (event: any, id: number) => {
    switch(id) {
      case 1:
        this.sTimeH = event;
      break;
      case 2:
        this.sTimeM = event;
      break;
      case 3:
        this.eTimeH = event;
      break;
      case 4: 
        this.eTimeM = event;
      break;
    }
    if(this.inter4 == 0) {
      this.inter4 = setInterval(this.checkValidity, 2500);
    }
  }

  disableDate = (d: Date | null) => {
    console.log(this.dates);
      const day = (d || new Date());
      if(this.dates.length != 0) {
        for(let i = 0; i < this.dates.length; i++) {
          let d = parseInt(this.dates[i].split('/')[0]);
          let m = parseInt(this.dates[i].split('/')[1]);
          let y = parseInt(this.dates[i].split('/')[2]);
          if(y == day.getFullYear()) {
            if(m == day.getMonth()) {
              if(d == day.getDate()) {
                return false;
              }
              else {
                return true;
              }
            }
            else {
              return true;
            }
          }
          else {
            return true;
          }
        }
      }
      else {
        return true;
      }
  }

  checkValidity = (): void => {
    if(this.sTimeH <= this.eTimeH) {
      if(this.sTimeH < this.eTimeH) {
         this.errors[4] = false;
      }
      else if(this.sTimeH == this.eTimeH) {
        if(this.sTimeM < this.eTimeM) {
          this.errors[4] = false;
        }
        else {
          this.errors[4] = true;
        }
      }
    }
    else {
      this.errors[4] = true;
    }
  }

  removeConference = (index: number) => {
    let t = 0;
    for(let i = 0; i < this.data.length; i++) {
      if(this.data[i].action == index) {
        t = i;
        break;
      }
    }
    this.data.splice(t, 1);
    this.table.renderRows();
  }

  currentObj = (i: number): any => {
    let lastID;
    if(i == 0) {
      lastID = 0;
      for(let i = 0; i < this.data.length; i++) {
        if(this.data[i].action > lastID) {
          lastID = this.data[i].action;
        }
      }
    }
    else {
      lastID = i + 1;
    }
    let d = this.date.getDate();
    let m = this.date.getMonth();
    let y = this.date.getFullYear();
    let conf = {
      room: this.name,
      title: this.title,
      date: d + "/" + m + "/" + y,
      time: this.sTimeH + ":" + this.sTimeM + " - " + this.eTimeH + ":" + this.eTimeM,
      action: lastID + 1,
      desc: this.desc,
      type: this.type,
      amount: this.amount
    };
    return conf;
  }

  refreshFields = () => {
    this.name = "";
    this.title = "";
    this.desc = "";
    this.type = "free";
    this.amount = 0;
    this.date = new Date();
    this.sTimeH = 0;
    this.sTimeM = 0;
    this.eTimeH = 0;
    this.eTimeM = 0;
  }

  loadData = (data: any) => {
    this.name = data.room;
    this.title = data.title;
    this.desc = data.desc;
    this.type = data.type;
    this.amount = data.amount;
    this.sTimeH = parseInt(data.time.split(' - ')[0].split(':')[0]);
    this.sTimeM = parseInt(data.time.split(' - ')[0].split(':')[1]);
    this.eTimeH = parseInt(data.time.split(' - ')[1].split(':')[0]);
    this.eTimeM = parseInt(data.time.split(' - ')[1].split(':')[1]);
    this.date.setDate(parseInt(data.date.split('/')[0]));
    this.date.setMonth(parseInt(data.date.split('/')[1]));
    this.date.setFullYear(parseInt(data.date.split('/')[2]));
  }

  newConference = (): void => {
    let conf = this.currentObj(0);  
    this.data.push(conf);
    this.table.renderRows();
    this.refreshFields();
  }

  // openDialog = (i: number): void => {
  //   const DialogRef =  this.Dialog.open(ModifyComponent, {
  //     data: {
  //       data: this.data[i - 1]
  //     }
  //   });

  //   DialogRef.afterClosed().subscribe(result => {
  //     this.data[i - 1] = result;
  //     this.table.renderRows();
  //   });
  // }

  editConference = (index: number) => {
    if(this.edit == false) {
      this.index = index;
      this.loadData(this.data[index - 1]);
      this.edit = true;
    } 
    else {
      this.data[index - 1] = this.currentObj(index - 1);
      this.table.renderRows();
      this.refreshFields();
      this.edit = false;
    }
  }
}

export interface ConferenceElement {
  room: string,
  title: string,
  date: string,
  time: string,
  action: number,
  desc: string;
  type: string,
  amount: number
} 

// export interface DialogData {
//   data: Object
// }

// @Component({
//   selector: 'modify-conf',
//   templateUrl: 'modify-conf.component.html',
//   styleUrls: ['modify-conf.component.css']
// })

// export class ModifyComponent extends ConferenceComponent {

//    constructor(public dialogRef: MatDialogRef<ModifyComponent>, @Inject(MAT_DIALOG_DATA) public data_: DialogData) {
//      super(null, null);
//      this.data = [
//       {room: 'Room A', title: 'How to make ice-cream', date: '3/20/2014', time: '19:45 - 20:15', action: 1, desc: 'My example description.', type: 'paid', amount: 420},
//       {room: 'Room A', title: 'How not to make ice-cream', date: '3/20/2014', time: '20:30 - 21:15', action: 2, desc: 'My example desc', type: 'pass', amount: 0}
//      ];
//      this.name = this.data_.data["room"];
//      this.title = this.data_.data["title"];
//      this.sTimeH = parseInt(this.data_.data["time"].split(' - ')[0].split(':')[0]);
//      this.sTimeM = parseInt(this.data_.data["time"].split(' - ')[0].split(':')[1]);
//      this.eTimeH = parseInt(this.data_.data["time"].split(' - ')[1].split(':')[0]);
//      this.eTimeM = parseInt(this.data_.data["time"].split(' - ')[1].split(':')[1]);
//      this.errors = [false, false, false, false, false];
//      this.hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
//      this.mins = [0, 15, 30, 45];
//      this.Z = true;
//      this.edited = true;
//      this.counter = 0;
//      this.inter1 = 0;
//      this.inter2 = 0;
//      this.inter3 = 0;
//      this.inter4 = 0;
//      this.flag = false;
//      this.desc = this.data_.data["desc"];
//      this.type = this.data_.data["type"];
//      if(this.type != 'paid') {
//       this.amountFlag = true;
//      }
//      else {
//        this.amountFlag = false;
//      }
//      this.amount = this.data_.data["amount"];
//      this.date = new Date();
//      this.date.setDate(parseInt(this.data_.data["date"].split('/')[0]));
//      this.date.setMonth(parseInt(this.data_.data["date"].split('/')[1]));
//      this.date.setFullYear(parseInt(this.data_.data["date"].split('/')[2]));
//      this.suggestions = new Observable<string[]>();
//    }

//    ngOnInit() {
//     this.suggestions = this.control.valueChanges.pipe(
//       startWith(''),
//       map(value => this._filter(value))
//     );
//    }

//    public updateConference = (): void => {
//     let lastID = 0;
//     for(let i = 0; i < this.data.length; i++) {
//       if(this.data[i].action > lastID) {
//         lastID = this.data[i].action;
//       }
//     }
//     let d = this.date.getDate();
//     let m = this.date.getMonth();
//     let y = this.date.getFullYear();
//     let conf = {
//       room: this.name,
//       title: this.title,
//       date: d + "/" + m + "/" + y,
//       time: this.sTimeH + ":" + this.sTimeM + " - " + this.eTimeH + ":" + this.eTimeM,
//       action: lastID + 1,
//       desc: this.desc,
//       type: this.type,
//       amount: this.amount
//     }    
//     this.data_.data = conf;
//     this.name = "";
//     this.title = "";
//     this.desc = "";
//     this.type = "free";
//     this.amount = 0;
//     this.date = new Date();
//     this.sTimeH = 0;
//     this.sTimeM = 0;
//     this.eTimeH = 0;
//     this.eTimeM = 0;
//     this.closeDialog();
//   }

//   closeDialog = () => {
//     this.dialogRef.close();
//   }
// }