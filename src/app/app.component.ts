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

  // public startD: Date;
  // public endD: Date;
  // public startTH: number[];
  // public endTH: number[];
  // public startTM: number[];
  // public endTM: number[];
  public dis: Boolean;
  public TimeZones: any = [];
  // public selSD: Date;
  // public selSTH: number;
  // public selSTM: number;
  // public selED: Date;
  // public selETH: number;
  // public selETM: number;
  public selTZ: any;
  public flags: boolean[];
  public success: boolean;
  public dates: string[];
  public datesF: number;
  public datesV: string[];
  // public int1;
  public int2;
  // public interval1Set: boolean;
  public interval2Set: boolean;

  constructor(private service: TimeZoneService, private http: HttpClient) {
    // this.startD = null;
    // this.endD = null;
    // this.startTH = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    // this.endTH = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    // this.startTM = [0, 15, 30, 45];
    // this.endTM = [0, 15, 30, 45];
    this.dis = false;
    // this.selSD = null;
    // this.selSTH = 0;
    // this.selSTM = 0;
    // this.selED = null;
    // this.selETH = 0;
    // this.selETM = 0;
    this.selTZ = "";
    this.flags = [false, false, false, false];
    this.success = false;
    this.dates = ['dates_1'];
    this.datesF = 1;
    this.datesV = [];
    /*
    flags[0]: Check if each value is filled
    flags[1]: Check if start date is smaller than end date
    flags[2]: Check if start time is smaller than end time
    flags[3]: Check if the time is constant for each day.
    */
  }

  // public filteredTZT: Observable<string[]>;
  // public TZC = new FormControl();

  ngOnInit() {
  //   const header1 = { 'content-type': 'application/json' };
  //   this.http.get("assets/timezones.json", { headers: header1 }).subscribe(data => {
  //     this.TimeZones = data;
  //     let t = moment.tz.guess().split('/')[1];
  //     let arr = this.TimeZones.filter(option => option.text.toLowerCase().includes(t.toLowerCase()));
  //     if(arr.length == 0) {
  //       let local = new Date();
  //       let localH = local.getTimezoneOffset() / -60;
  //       let localM = "00";
  //       if(parseInt(localH.toString().split("").reverse()[2]) == 2) {
  //         localM = "15";
  //       }
  //       else if(parseInt(localH.toString().split("").reverse()[2]) == 5) {
  //         localM = "30";
  //       }
  //       else if(parseInt(localH.toString().split("").reverse()[2]) == 7) {
  //         localM = "45";
  //       }
  //       let str = "(GMT " + (parseInt(localH.toString()) > 0 ? "+" : "-") + "" + (localH) + ":" + localM + ")";
  //       this.selTZ = this.TimeZones.filter(option => option.text.toLowerCase().includes(str.toLowerCase()))[0].text;
  //     }
  //     else {
  //       this.selTZ = this.TimeZones.filter(option => option.text.toLowerCase().includes(t.toLowerCase()))[0].text;
  //     }
  //   });
    // this.filteredTZT = this.TZC.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this.filter3(value))
    // );

    // this.service.getTimeZones.subscribe({
    //   next(x) {
    //     this.TimeZones = x;  
    //   },
    //   complete() {
    //     console.log(this.TimeZones);
    //   }
    // });
    // this.service.userTimezone.subscribe({
    //   next(x) {
    //     this.selTZ = x;
    //   },
    //   complete() {
    //     console.log(this.selTZ);
    //   }
    // });

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

  // saveDate = (id: number, event: MatDatepickerInputEvent<Date>) => {
  //   if(!this.interval1Set) {
  //     this.int1 = setInterval(this.enableB, 2500);
  //     this.interval1Set = true;
  //     clearInterval(this.int2);
  //   }
  //   if (id == 1) {
  //     this.selED = event.value;
  //   }
  //   else {
  //     this.selSD = event.value;
  //   }
  // }


  // myFilter = (d: Date | null) => {
  //   const day = (d || new Date());
  //   var date = new Date();

  //   if (day.getFullYear() >= date.getFullYear()) {
  //     if (day.getMonth() >= date.getMonth()) {
  //       if (day.getDate() >= date.getDate()) {
  //         return true;
  //       }
  //       else if (day.getMonth() > date.getMonth()) {
  //         return true;
  //       }
  //       else {
  //         return false;
  //       }
  //     }
  //     else if (day.getFullYear() > date.getFullYear()) {
  //       return true;
  //     }
  //     else {
  //       return false;
  //     }
  //   }
  //   else {
  //     return false;
  //   }
  // }

  // myFilter_ = (d: Date | null) => {
  //   const day = (d || new Date());
  //   var date = new Date();

  //   if (day.getFullYear() >= date.getFullYear()) {
  //     if (day.getMonth() >= date.getMonth()) {
  //       if (day.getDate() >= date.getDate()) {
  //         return true;
  //       }
  //       else if (day.getMonth() > date.getMonth()) {
  //         return true;
  //       }
  //       else {
  //         return false;
  //       }
  //     }
  //     else if (day.getFullYear() > date.getFullYear()) {
  //       return true;
  //     }
  //     else {
  //       return false;
  //     }
  //   }
  //   else {
  //     return false;
  //   }
  // }

  // enableB = (): any => {
  //   if(!this.selSD || !this.selED) {
  //     this.flags[1] = false;
  //     this.flags[2] = false;
  //     this.flags[0] = true;
  //     this.dis = true;
  //   }
  //   if (this.selSD.getFullYear() <= this.selED.getFullYear()) {
  //     if (this.selSD.getFullYear() == this.selED.getFullYear()) {
  //       if (this.selSD.getMonth() <= this.selED.getMonth()) {
  //         if (this.selSD.getMonth() == this.selED.getMonth()) {
  //           if (this.selSD.getDate() <= this.selED.getDate()) {
  //             if (this.selSD.getDate() == this.selED.getDate()) {
  //               if (this.selSTH <= this.selETH) {
  //                 if (this.selSTH == this.selETH) {
  //                   if (this.selSTM < this.selETM) {
  //                     this.flags[1] = false;
  //                     this.flags[2] = false;
  //                     this.flags[0] = false;
  //                     this.dis = false;
  //                   }
  //                   else {
  //                     this.flags[1] = false;
  //                     this.flags[2] = true;
  //                     this.flags[0] = false;
  //                     this.dis = true;
  //                   }
  //                 }
  //                 else if(this.selSTH < this.selETH) {
  //                   this.flags[1] = false;
  //                   this.flags[2] = false;
  //                   this.flags[0] = false;
  //                   this.dis = false;                  }
  //                 else {
  //                   this.flags[1] = false;
  //                   this.flags[2] = true;
  //                   this.flags[0] = false;
  //                   this.dis = true;
  //                 }
  //               }
  //               else {
  //                 this.flags[1] = true;
  //                 this.flags[2] = false;
  //                 this.flags[0] = false;
  //                 this.dis = true;
  //               }
  //             }
  //             else if (this.selSD.getDate() < this.selED.getDate()) {
  //               this.flags[1] = false;
  //               this.flags[2] = false;
  //               this.flags[0] = false;
  //               this.dis = false;
  //             }
  //             else {
  //               this.flags[1] = true;
  //               this.flags[2] = false;
  //               this.flags[0] = false;
  //               this.dis = true;
  //             }
  //           }
  //           else {
  //             this.flags[1] = true;
  //             this.flags[2] = false;
  //             this.flags[0] = false;
  //             this.dis = true;
  //           }
  //         }
  //         else if (this.selSD.getMonth() < this.selED.getMonth()) {
  //           this.flags[1] = false;
  //           this.flags[2] = false;
  //           this.flags[0] = false;
  //           this.dis = false;
  //         }
  //       }
  //       else {
  //         this.flags[1] = true;
  //         this.flags[2] = false;
  //         this.flags[0] = false;
  //         this.dis = true;
  //       }
  //     }
  //     else if (this.selSD.getFullYear() < this.selED.getFullYear()) {
  //       this.flags[1] = false;
  //       this.flags[2] = false;
  //       this.flags[0] = false;
  //       this.dis = false;
  //     }
  //   }
  //   else {
  //     this.flags[1] = true;
  //     this.flags[2] = false;
  //     this.flags[0] = false;
  //     this.dis = true;
  //   }
  // }

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
        // if(date < smallest) {
        //   smallest = date;
        //   this.swap(j, i);
        // }
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
    //let url = `${apiUrl}api/event-add`;

    // if(!this.flags[3]) {
    //   eventInfo = {
    //     startDate: this.selSD.getDate() + "/" + (this.selSD.getMonth() + 1) + "/" + this.selSD.getFullYear(),
    //     endDate: this.selED.getDate() + "/" + (this.selED.getMonth() + 1) + "/" + this.selED.getFullYear(),
    //     startTimeHours: this.selSTH,
    //     startTimeMinutes: this.selSTM,
    //     endTimeHours: this.selETH,
    //     endTimeMinutes: this.selETM,
    //     timezone: selT
    //   }
    // }
    // else {
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
  //  this.sort();
  }

  checks = () => {
    console.log(this.dates.length, this.datesF);
    if(this.datesF == this.dates.length && this.datesF != 0) {
      this.dis = false;
    }
    else if(this.datesF != this.dates.length) {
      this.dis = true;
    }
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
   // this.dates.push();
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
  //  this.sort();
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

  // changeIntervals = () => {

  //   if(!this.interval1Set && this.interval2Set) {
  //     for(let i =0; i < 3; ++i) {
  //       this.flags[i] = false;
  //     }
  //     this.success = false;
  //     this.dis = true;
  //     this.int1 = setInterval(this.enableB, 2500);
  //     this.interval1Set = true;
  //     this.interval2Set = false;
  //     clearInterval(this.int2);
  //   }
  //   else if(!this.interval2Set && this.interval1Set) {
  //     for(let i = 0; i < 3; ++i) {
  //       this.flags[i] = false;
  //     }
  //     this.success = false;
  //     this.dis = true;
  //     this.interval2Set = true;
  //     this.interval1Set = false;
  //     clearInterval(this.int1);
  //     this.int2 = setInterval(this.checks, 2000);
  //   }
  // }

  title = 'app';
}