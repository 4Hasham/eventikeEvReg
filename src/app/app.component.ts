import { Component, OnInit, ɵCodegenComponentFactoryResolver } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { TimeZoneService } from './timezone.service';
import { Observable, Observer } from 'rxjs';
//import { apiUrl } from '../../../../../environments/settings';
import { HttpClient } from '@angular/common/http';
//import { FormControl } from '@angular/forms';
//import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TimeZoneService]
})

export class AppComponent implements OnInit {

  public dis: Boolean;
  public TimeZones: any = [];
  public selTZ: any;
  public flags: boolean[];
  public success: boolean;
  public dates: string[];
  public datesF: number;
  public descF: boolean;
  public datesV: string[];
  public int2;
  public interval2Set: boolean;

  constructor(private service: TimeZoneService, private http: HttpClient) {

    this.dis = true;
    this.selTZ = "";
    this.flags = [false, false, false, false];
    this.success = false;
    this.dates = ['dates_1'];
    this.datesF = 1;
    this.datesV = [];
  }

  ngOnInit() {

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
      smallestDate = parseInt(JSON.parse(this.datesV[i])["date"].split('/')[0]);
      smallestMon = parseInt(JSON.parse(this.datesV[i])["date"].split('/')[1]);
      smallestYear = parseInt(JSON.parse(this.datesV[i])["date"].split('/')[2]);
      for(let j = i + 1; j < this.datesV.length; j++) {
        let date = parseInt(JSON.parse(this.datesV[j])["date"].split('/')[0]);
        let mon = parseInt(JSON.parse(this.datesV[j])["date"].split('/')[1]);
        let year = parseInt(JSON.parse(this.datesV[j])["date"].split('/')[2]);

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
    console.log(this.datesV);
  }

  async check() {
    
    let eventInfo = new Object();
    let selT =  await this.getTimeZone();

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
    eventInfo = {
      dates: this.datesV,
      timezone: selT
    }

  //   this.http.post(url, eventInfo).subscribe(
  //   (data) => {
  //     if(data['status']) {
  //       console.log(data);
  //     }
  //     else {
  //       console.log(data['message']);
  //     }
  //   },
  //   (error) => {
  //     console.log(error);
  //   });
  }

  pushDate = (event: any): any => {
    event.preventDefault();
    this.dates.push('date_' + (this.dates.length + 1));
    this.datesF++;
  }

  pushDateV = (event: string): void => {
    this.sort();
    console.log(event);
    this.datesV.push(event);
    console.log(this.datesV);
  }

  checkDesc = (event: any) => {
    console.log("FIRED");
    this.descF = event;
  }

  checks = () => {
    console.log(this.dates.length, this.datesF);
    if(this.datesF == this.dates.length && this.datesF != 0) {
      this.dis = false;
    }
    else if(this.datesF != this.dates.length) {
      this.dis = true;
    }
    console.log("OH YEA");
    this.dis = this.descF;
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

  delete(i: number) {
    this.dates.splice(i, 1);
    this.datesV.splice(i, 1);
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

  lastDate = (id: number): string[] => {
    if(this.datesV.length != 0 && id != 0) {
      let last: Object = JSON.parse(this.datesV[this.datesV.length - 1]);
      let date = last["date"];
      let sh = last["startDateH"];
      let eh = last["endDateH"];
      let sm = last["startDateM"];
      let em = last["endDateM"];
      return [date, sh, eh, sm, em];
    }
    else {
      let today = new Date();
      let s = today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear();
      let sh = "9";
      let eh = "18";
      return [s, sh, eh, "0", "0"];
    }
  }

  updateData = (event: string): void => {
    let data = JSON.parse(event);
    let j = 0;
    for(let i = 0; i < this.datesV.length; i++) {
      if(parseInt(JSON.parse(this.datesV[i])["id"]) == parseInt(data["id"])) {
        j = i;
        break;
      }
    }
    this.datesV[j] = event;
    this.sort();
  }

  title = 'app';
}