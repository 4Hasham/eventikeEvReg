import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.css']
})

export class DatesComponent implements OnInit {

  public sTimeH: number;
  public eTimeH: number;
  public sTimeM: number;
  public eTimeM: number;
  public date: Date;
  public isLast: boolean;
  public hours: number[];
  public mins: number[];
  public flag: boolean;
  public ZF: boolean;
  public action: string;

  @Output() valid = new EventEmitter<boolean>()
  @Output() del = new EventEmitter<string>()
  @Output() dat = new EventEmitter<Object>()
  @Output() updat = new EventEmitter<Object>()
  @Input() id: number;
  @Input() dis: boolean;
  @Input() initial: string[];
  @Input() dates: Object[];
  @Input() num: number;

  constructor() {}

  ngOnInit(): void {
    this.isLast = true;
    this.hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    this.mins = [0, 15, 30, 45];
    this.flag = false;
    console.log(this.id);
    this.ZF = false
    this.date = new Date();
    let ar = this.initial[0].split('-');
    this.action = "present";
    this.date.setDate(parseInt(ar[2]));
    this.date.setMonth(parseInt(ar[1]));
    this.date.setFullYear(parseInt(ar[0]));
    this.date.setDate(this.date.getDate() + 1);
    this.date.setMonth(this.date.getMonth());
    this.date.setFullYear(this.date.getFullYear());
    this.sTimeH = parseInt(this.initial[1]);
    this.eTimeH = parseInt(this.initial[2]);
    this.sTimeM = parseInt(this.initial[3]);
    this.eTimeM = parseInt(this.initial[4]);
    let obj = {
      id: this.id,
      date: this.date.getFullYear() + "-" + this.date.getMonth() + "-" + this.date.getDate(),
      start_time: this.sTimeH + ":" + this.sTimeM,
      end_time: this.eTimeH + ":" + this.eTimeM,
      action: this.action
    }
    this.dat.emit(obj);
  }

  disableDate = (d: Date | null) => {
    const day = (d || new Date());
    var date = new Date();

    let dd = day.getFullYear() + "-" + day.getMonth() + "-" + day.getDate();

    for(let i = 0; i < this.dates.length; i++) {
      if(this.dates[i]['date'] == dd && this.dates[i]['action'] == 'deleted') {
        return true;
      }
    
      let din = parseInt(this.dates[i]["date"].split('-')[2]);
      let mah = parseInt(this.dates[i]["date"].split('-')[1]);
      let sal = parseInt(this.dates[i]["date"].split('-')[0]);
      if(din == d.getDate()) {
        if(mah == d.getMonth()) {
          if(sal == d.getFullYear()) {
            return false;
          }
        }
      }
    }

    if(day.getFullYear() >= date.getFullYear()) {
      if(day.getMonth() >=  date.getMonth()) {
        if(day.getDate() >= date.getDate()) {
          return true;
        }
        else if(day.getMonth() > date.getMonth()) {
          return true;
        }
        else {
          return false;
        }
      }
      else if(day.getFullYear() > date.getFullYear()) {
        return true;
      }
      else {
        return false;
      }
    }
    else {
      return false;
    }
  }

  checkValidity = (): void => {
    if(this.sTimeH <= this.eTimeH) {
      if(this.sTimeH < this.eTimeH) {
         this.flag = false;
      }
      else if(this.sTimeH == this.eTimeH) {
        if(this.sTimeM < this.eTimeM) {
          this.flag = false;
        }
        else {
          this.flag = true;
        }
      }
    }
    else {
      this.flag = true;
    }
    if(this.ZF != this.flag) {
      this.valid.emit(!this.flag);
      this.ZF = this.flag;
    }
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
    let obj = {
      id: this.id,
      date: this.date.getFullYear() + "-" + this.date.getMonth() + "-" + this.date.getDate(),
      start_time: this.sTimeH + ":" + this.sTimeM,
      end_time: this.eTimeH + ":" + this.eTimeM,
      action: this.action
    };
    this.updat.emit(obj);
    this.checkValidity();
  }

  saveDate = (event: MatDatepickerInputEvent<Date>) => {
      this.date = event.value;
      let obj = {
        id: this.id,
        date: event.value.getFullYear() + "-" + event.value.getMonth() + "-" + event.value.getDate(),
        start_time: this.sTimeH + ":" + this.sTimeM,
        end_time: this.eTimeH + ":" + this.eTimeM,
        action: this.action
      };
      this.updat.emit(obj);
      this.checkValidity();
  }

  delete = () => {
    let da: string = this.date.getFullYear() + "-" + this.date.getMonth() + "-" + this.date.getDate();
    this.del.emit(da);
  }
}