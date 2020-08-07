import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Moment } from 'moment';
import * as moment from 'moment-timezone';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TimeZoneService {

    constructor(private http: HttpClient) {}
        
    public getTimeZones = new Observable<any>(subscriber => {
        const header1 = { 'content-type': 'application/json' };
        this.http.get("assets/timezones.json", { headers: header1 }).subscribe(data => {
            subscriber.next(data);
            subscriber.complete();
        });
    });

    public userTimezone = new Observable<string>(subscriber => {
        let TimeZones: any = [];
        let selTZ: any = "";
        this.getTimeZones.subscribe({
            next(data) {
                TimeZones = data;
            },
            complete() {
                let t = moment.tz.guess().split('/')[1];
                let arr = TimeZones.filter(option => option.text.toLowerCase().includes(t.toLowerCase()));
                if(arr.length == 0) {
                    let local = new Date();
                    let localH = local.getTimezoneOffset() / -60;
                    for(let t of TimeZones) {
                        if(t.value == localH) {
                            selTZ = t.text;
                            break;
                        }
                    }
                }
                else {
                    selTZ = TimeZones.filter(option => option.text.toLowerCase().includes(t.toLowerCase()))[0].text;
                }
                subscriber.next(selTZ);
                subscriber.complete();
            }
        });
    });

    public getTimeZoneValue = new Observable<number>(subscriber => {
        let TimeZones: any = [];
        let val: number = 0;
        this.getTimeZones.subscribe({
            next(data) {
                TimeZones = data;
            },
            complete() {
                let local = new Date();
                let localH = local.getTimezoneOffset() / -60;
                for(let t of TimeZones) {
                    if(t.value == localH) {
                        val = t.value;
                        break;
                    }
                }
                subscriber.next(val);
                subscriber.complete();
            }
        });
    });
}


            // let localM = "00";
            // if(parseInt(localH.toString().split("").reverse()[2]) == 2) {
            //     localM = "15";
            // }
            // else if(parseInt(localH.toString().split("").reverse()[2]) == 5) {
            //     localM = "30";
            // }
            // else if(parseInt(localH.toString().split("").reverse()[2]) == 7) {
            //     localM = "45";
            // }
            // let str = "(GMT " + (parseInt(localH.toString()) > 0 ? "+" : "-") + "" + (localH) + ":" + localM + ")";
            // this.selTZ = this.TimeZones.filter(option => option.text.toLowerCase().includes(str.toLowerCase()))[0].text;
            // }