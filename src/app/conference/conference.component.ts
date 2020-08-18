import { Component, OnInit, EventEmitter, Input, Output, Inject, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatTable } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-conference',
  templateUrl: './conference.component.html',
  styleUrls: ['./conference.component.css']
})

export class ConferenceComponent implements OnInit {
  
  @ViewChild('table', {static: false}) table: MatTable<Element>

  @Input() dates: Object[];
  @Input() eventID: number;

  public data = [
    {id: 0, room: 'Room A', title: 'How to make ice-cream', date: '3/20/2014', start_time: '19:45', end_time: '20:15', pos: 1, desc: 'My example description.', type: 'paid', amount: 420, action: "present"},
    {id: 0, room: 'Room A', title: 'How not to make ice-cream', date: '3/22/2014', start_time: '20:30', end_time: '21:15', pos: 2, desc: 'My example desc', type: 'pass', amount: 0, action: "present"}
  ];
  public dataSource = new MatTableDataSource(this.data);
  public displayedColumns = ['room', 'title', 'date', 'start_time', 'pos'];
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
  public invitees: Object[];

  constructor() {}

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

    this.dataSource.filterPredicate = (data, filter: string) => {
      return data.action == filter;
    }
    this.dataSource.filter = "present";
  }

  _filter = (str: string): string[] => {
    let s = str.toLowerCase();
    let sa = [];
    for(let i = 0; i < this.data.length; i++) {
      sa.push(this.data[i].room);
    }
    let ret = sa.filter(option => option.toLowerCase().includes(s));
    return ret.filter((item, index) => sa.indexOf(item) == index);
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

    if(!this.errors[0] && !this.errors[1] && !this.errors[2] && this.name.trim().length != 0  && !this.errors[3] && !this.errors[4] && this.title.trim().length != 0 && this.counter != 0) {
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
        let d = parseInt(this.dates[i]['date'].split('-')[2]);
        let m = parseInt(this.dates[i]['date'].split('-')[1]);
        let y = parseInt(this.dates[i]['date'].split('-')[0]);
        console.log(this.dates);
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
    let t = this.data.indexOf(this.data.filter(opt => opt.pos == index && opt.action != "deleted")[0]);
    //this.data.splice(t, 1);
    this.data[t].action = "deleted";
    this.dataSource.filter = "present";
    this.table.renderRows();
  }

  currentObj = (i: number): any => {
    let lastID;
    if(i == 0) {
      lastID = 0;
      for(let i = 0; i < this.data.length; i++) {
        if(this.data[i].pos > lastID) {
          lastID = this.data[i].pos;
        }
      }
    }
    else {
      lastID = i;
    }
    let d = this.date.getDate();
    let m = this.date.getMonth();
    let y = this.date.getFullYear();
    let conf = {
      id: 0,
      room: this.name,
      title: this.title,
      date: d + "/" + m + "/" + y,
      start_time: this.sTimeH + ":" + this.sTimeM,
      end_time: this.eTimeH + ":" + this.eTimeM,
      pos: lastID,
      desc: this.desc,
      type: this.type,
      amount: this.amount,
      action: "present"
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
    this.amount = data.amount
    this.sTimeH = parseInt(data.start_time.split(':')[0]);
    this.sTimeM = parseInt(data.start_time.split(':')[1]);
    this.eTimeH = parseInt(data.end_time.split(':')[0]);
    this.eTimeM = parseInt(data.end_time.split(':')[1]);
    this.date.setDate(parseInt(data.date.split('/')[0]));
    this.date.setMonth(parseInt(data.date.split('/')[1]));
    this.date.setFullYear(parseInt(data.date.split('/')[2]));
  }

  sendData = () => {
    let info = {
      event_id: this.eventID,
      data: this.data
    }

    //post req that I shall write later
  }

  newConference = (event: any): void => {
    event.preventDefault();
    let conf = this.currentObj(0);  
    this.data.push(conf);
    this.dataSource.filter = "present";
    this.table.renderRows();
    this.refreshFields();
    this.sendData();
  }

  editConference = (event: any, index: number, f: boolean) => {
    if(event) {
      event.preventDefault();
    }
    if(this.edit == false && this.index == -1) {
      this.index = index;
      this.loadData(this.data.filter(opt => opt.pos == index && opt.action != "deleted")[0]);
      this.edit = true;
    }
    else if(this.edit == true && index != this.index) {
      this.index = index;
      this.loadData(this.data.filter(opt => opt.pos == index && opt.action != "deleted")[0]);
      this.edit = true;
    }
    else if(this.edit == false && index == this.index) {
      this.index = index;
      this.loadData(this.data.filter(opt => opt.pos == index && opt.action != "deleted")[0]);
      this.edit =  true;
    }
    else if(this.edit == true && index == this.index && f == false) {
      this.edit = true;
    }
    else {
      this.data[this.data.indexOf(this.data.filter(opt => opt.pos == index && opt.action != "deleted")[0])] = this.currentObj(this.data.filter(opt => opt.pos == index && opt.action != "deleted")[0].pos);
      this.dataSource.filter = "present";
      this.table.renderRows();
      this.refreshFields();
      console.log(this.data);
      this.edit = false;
    }
  }

  cancelUpdate = (event: any) => {
    event.preventDefault();
    this.edit = false;
    this.refreshFields();
    this.index = -1;
  }
}

export interface ConferenceElement {
  id: number,
  room: string,
  title: string,
  date: string,
  start_time: string,
  end_time: string,
  pos: number,
  desc: string;
  type: string,
  amount: number,
  action: string
} 