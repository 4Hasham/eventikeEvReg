import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IndustriesService {

  constructor(public http: HttpClient) { }

  returnInds = new Observable<any>(subscriber => {
    const header1 = { 'content-type': 'application/json' };
    this.http.get("assets/industries.json", { headers: header1 }).subscribe(data => {
        let values = data["industries"];
        subscriber.next(values);
        subscriber.complete();
    });
  });
}
