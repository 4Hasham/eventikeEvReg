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

  @Output() valid = new EventEmitter<boolean>()
  @Output() del = new EventEmitter<any>()
  @Output() dat = new EventEmitter<string>()
  @Output() updat = new EventEmitter<string>()
  @Input() id: number;
  @Input() dis: boolean;
  @Input() initial: string[];
  @Input() dates: string[];

  constructor() {}

  ngOnInit(): void {
    this.isLast = true;
    this.hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    this.mins = [0, 15, 30, 45];
    this.flag = false;
    this.ZF = false
    this.date = new Date();
    let ar = this.initial[0].split('/');
    this.date.setDate(parseInt(ar[0]));
    this.date.setMonth(parseInt(ar[1]));
    this.date.setFullYear(parseInt(ar[2]));
    this.date.setDate(this.date.getDate() + 1);
    this.date.setMonth(this.date.getMonth());
    this.date.setFullYear(this.date.getFullYear());
    //this.date = this.getNextEnabled(this.date.getDate(), this.date.getMonth(), this.date.getFullYear());
    this.sTimeH = parseInt(this.initial[1]);
    this.eTimeH = parseInt(this.initial[2]);
    this.sTimeM = parseInt(this.initial[3]);
    this.eTimeM = parseInt(this.initial[4]);
    console.log("ngOnInit: " + this.id);
    let obj = {
      id: this.id,
      date: this.date.getDate() + "/" + this.date.getMonth() + "/" + this.date.getFullYear(),
      startDateH: this.sTimeH,
      startDateM: this.sTimeM,
      endDateH: this.eTimeH,
      endDateM: this.eTimeM
    }
    this.dat.emit(JSON.stringify(obj));
  }

  disableDate = (d: Date | null) => {
    const day = (d || new Date());
    var date = new Date();

    for(let i = 0; i < this.dates.length; i++) {
      let din = parseInt(JSON.parse(this.dates[i])["date"].split('/')[0]);
      let mah = parseInt(JSON.parse(this.dates[i])["date"].split('/')[1]);
      let sal = parseInt(JSON.parse(this.dates[i])["date"].split('/')[2]);
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
      date: this.date.getDate() + "/" + this.date.getMonth() + "/" + this.date.getFullYear(),
      startDateH: this.sTimeH,
      startDateM: this.sTimeM,
      endDateH: this.eTimeH,
      endDateM: this.eTimeM
    };
    this.updat.emit(JSON.stringify(obj));
    this.checkValidity();
  }

  saveDate = (event: MatDatepickerInputEvent<Date>) => {
      this.date = event.value;
      let obj = {
        id: this.id,
        date: event.value.getDate() + "/" + event.value.getMonth() + "/" + event.value.getFullYear(),
        startDateH: this.sTimeH,
        startDateM: this.sTimeM,
        endDateH: this.eTimeH,
        endDateM: this.eTimeM
      };
      this.updat.emit(JSON.stringify(obj));
      this.checkValidity();
  }

  delete = () => {
    this.del.emit();
  }

  getNextEnabled = (din, mah, sal): Date => {
    let c: boolean = true;
    let temp: string;
    let next = new Date();
    next.setDate(din);
    next.setMonth(mah);
    next.setFullYear(sal);
    
    while(c) {
      next.setDate(next.getDate() + 1);
      temp = next.getDate() + "/" + next.getMonth() + "/" + next.getFullYear();
      if(this.dates.length ! = 0) {
        for(let i = 0; i < this.dates.length; i++) {
          let aj = JSON.parse(this.dates[i]["date"]);
          if(aj == temp) {
            break;
          }
          else if(aj != temp) {
            c = false;
          }
        }
      }
    }
    return next;
  }
}