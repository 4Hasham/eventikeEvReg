import { Component, OnInit, Input } from '@angular/core';
import { TimeZoneService } from './timezone.service';
import { DatesService } from './dates.service';
import { Observable, Observer } from 'rxjs';
import { apiUrl } from '../environments/settings';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './newevent.component.html',
  styleUrls: ['./newevent.component.css'],
  providers: [TimeZoneService, DatesService]
})

export class NewEventComponent implements OnInit {

  public dis: Boolean;
  public TimeZones: any = [];
  public selTZ: any;
  public flags: boolean[];
  public success: boolean;
  public dates: string[];
  public datesF: number;
  public descF: boolean;
  public datesV: Object[];
  public dateV: any = [];
  public int2;
  public interval2Set: boolean;
  public eventName: string;
  public eventDesc: any;
  public eventType: string;
  public eventLanguage: string;
  public eventIndustry: string;
  public event_id: number;
  public tab_id: number;
  public tab: number;
  public details: Object;
  public dateID: number;

  @Input() id_event: number;

  constructor(private service: TimeZoneService, private service_: DatesService, private http: HttpClient) {}

  ngOnInit() {

    this.dis = true;
    this.selTZ = "";
    this.flags = [false, false, false, false];
    this.success = false;
    this.dates = ['date_1'];
    this.datesV = [];
    this.datesF = 1;
    this.event_id = 0;
    this.tab_id = 0;
    this.dateID = 0;
    if(this.id_event) {
      this.event_id = this.id_event;
    }

    this.selTZ = new Observable<string>((observer: Observer<string>) => {
      this.service.userTimezone.subscribe({
        next(x) {
          observer.next(x);
        }
      });
    });

    this.TimeZones = new Observable<any>((observer: Observer<any>) => {
      this.service.getTimeZones.subscribe({
        next(x) {
          observer.next(x);
        }
      });
    });

    this.dateV = new Observable<any>((observer: Observer<any>) => {
      this.service_.returnDates.subscribe({
        next(x) {
          observer.next(x);
        }
      });
    });
  }

  getDates() {
    return new Promise<string>(resolve => {
      this.dateV.subscribe({
        next(x) {
          resolve(x);
        }
      });
    })
  }

  getTimeZone() {
    return new Promise<string>(resolve => {
      this.selTZ.subscribe({
        next(x) {
          resolve(x);
        }
      });
    })
  }

  getTimeZoneValue() {
    return new Promise<number>(resolve => {
      this.service.getTimeZoneValue.subscribe({
        next(x) {
          resolve(x);
        }
      });
    })
  }

  swap = (id: number, sid: number): void => {
    let s = this.datesV[id];
    let ss = this.datesV[sid];
    this.datesV[sid] = s;
    this.datesV[id] = ss;
    
    let temp = this.dates[id];
    this.dates[id] = this.dates[sid];
    this.dates[sid] = temp;
  }

  sort = (): void => {
    let smallestDate: number = 10000;
    let smallestMon: number = 10000;
    let smallestYear: number = 10000;
    for(let i = 0; i < this.datesV.length - 1; i++) {
      smallestDate = parseInt(this.datesV[i]["date"].split('-')[2]);
      smallestMon = parseInt(this.datesV[i]["date"].split('-')[1]);
      smallestYear = parseInt(this.datesV[i]["date"].split('-')[0]);
      for(let j = i + 1; j < this.datesV.length; j++) {
        let date = parseInt(this.datesV[j]["date"].split('-')[2]);
        let mon = parseInt(this.datesV[j]["date"].split('-')[1]);
        let year = parseInt(this.datesV[j]["date"].split('-')[0]);

        if(year <= smallestYear) {
          if(year == smallestYear) {
            if(mon <= smallestMon) {
              if(mon == smallestMon) {
                if(date < smallestDate) {
                  this.swap(j, i);
                }
              }
              else if(mon < smallestMon) {
                this.swap(j, i);
              }
            }
          }
          else if(year < smallestYear) {
            this.swap(j, i);
          }
        }
      }
    }
    console.log(this.dates, this.datesV);
  }

  async sendResult() {

    let eventInfo = new Object();
    let selT =  await this.getTimeZone();

    eventInfo = {
      event_id: this.event_id,
      tab_id: this.tab_id + 1,
      dates: this.datesV,
      timezone: selT,
      timezoneValue: await this.getTimeZoneValue(),
      eventName: this.eventName,
      eventDesc: this.eventDesc,
      eventType: this.eventType,
      eventLanguage: this.eventLanguage,
      eventIndustry: this.eventIndustry
    }

    let url = `${apiUrl}api/update-event`;

    this.http.post(url, eventInfo).subscribe(
    (data) => {
      if(data['status']) {
        console.log(data);
        this.event_id = data['event_id'];
      }
      else {
        console.log(data['message']);
      }
    },
    (error) => {
      console.log(error);
    });
  }

  async check() {
    
    let selT =  await this.getTimeZone();

    switch (this.tab_id) {
      case 0:
        if (selT.trim() != "") {
          this.success = true;
          this.flags[0] = false;
          this.flags[1] = false;
          this.flags[2] = false;
        }
        else {
          this.flags[0] = true;
          this.flags[1] = false;
          this.flags[2] = false;
        }
        break;
      case 1:
        this.dis = false;
        break;
      default:
        break;
    }

    this.sendResult();
  }

  onNext = (event: any) => {
    event.preventDefault();
    this.check();
    this.tab_id++;
  }

  pushDate = (event: any): any => {
    event.preventDefault();
    this.dateID++;
    this.dates.push('date_' + (this.dateID + 1));
    console.log(this.dates);
    this.datesF++;
    this.sort();
  }

  pushDateV = (event: string): void => {
    this.sort();
    this.datesV.push(event);
    console.log(this.datesV);
  }

  checkDesc = (event: any) => {
    this.descF = event;
    this.dis  = this.descF;
  }

  checks = () => {
    if(this.datesF == this.dates.length && this.datesF != 0) {
      if(!this.descF) {
        this.dis = false;
      }
    }
    else if(this.datesF != this.dates.length) {
      this.dis = true;
    }
  }

  setEventDesc = (event: any) => {
    this.eventDesc = event;
  }

  setEventType = (event: any) => {
    this.eventType = event;
  }
  
  setEventName = (event: any) => {
    this.eventName = event;
  }

  setLanguage = (event: any) => {
    this.eventLanguage = event;
  }

  setIndustry = (event: any) => {
    this.eventIndustry = event;
  }
  
  peek = (event: any, index: number): void => {
    if(!this.interval2Set) {
      this.int2 = setInterval(this.checks, 2500);
      this.interval2Set = true;
    }
    if(event) {
      ++this.datesF;
    }
    else if(!event) {
      --this.datesF;
    }
  }

  getArrayIndex = (index: number, date: string): number => {
    for (let i = 0; i < this.datesV.length; i++) {
      if(i == index && date == this.datesV[i]['date']) {
        if(this.datesV[i]['action'] == 'deleted') {
          return this.getArrayIndex(i+1, date);
        }
        else {
          return i;
        }
      }
      else if(i == index && date != this.datesV[i]['date']) {
        return this.getArrayIndex(i+1, date);
      }
      else if(i != index) {
        continue;
      }
      else {
        return i;
      }
    }
  }

  delete(num: number, event: string) {
    let i = this.getArrayIndex(num, event);
    this.datesV[i]['action'] = 'deleted';
    this.datesF--;
    this.sort();
  }

  setTimeZoneValue = (event: any) => {
    let n = new Observable<string>(s => {
      s.next(event);
      s.complete();
    });
    this.selTZ = new Observable<string>((observer: Observer<string>) => {
      n.subscribe({
        next(x) {
          observer.next(x);
          observer.complete();
        }
      });
    });
  }

  verifyFirst = (id: number): boolean => {
    if(id == 0) {
      return true;
    }
    else {
      return false;
    }
  }

  lastDate = (id: number) => {
    //this.datesV = await this.getDates();
    if(this.datesV.length != 0 && id != 0) {
      let i = this.datesV.length - 1;
      let last: Object = this.datesV[i]
      while(last['action'] == 'deleted') {
        last = this.datesV[i];
        i--;
      }
      let date = last["date"];
      let sh = last["start_time"].split(':')[0];
      let eh = last["end_time"].split(':')[0];
      let sm = last["start_time"].split(':')[1];
      let em = last["end_time"].split(':')[1];
      return [date, sh, eh, sm, em];
    }
    else {
      let today = new Date();
      let s = today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate();
      let sh = "9";
      let eh = "18";
      return [s, sh, eh, "0", "0"];
    }
  }

  updateData = (event: Object) => {
    //this.datesV = await this.getDates();
    console.log(event);
    let data = event;
    let j = 0;
    for(let i = 0; i < this.datesV.length; i++) {
      if(parseInt(this.datesV[i]["id"]) == parseInt(data["id"])) {
        j = i;
        break;
      }
    }
    this.datesV[j] = event;
    this.sort();
  }

  filterDates = (date: any): boolean => {
    let i = this.dates.indexOf(date);
    if(i == 0) {
      return true;
    } 
    if(this.datesV[i]) {
      return this.datesV[i]['action'] != 'deleted';
    }
    else {
      return true;
    }
  }

  trackDate = (index: number, item: string): number => {
    return index;
  }

  title = 'app';
}