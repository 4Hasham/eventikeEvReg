import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from '../environments/settings';

@Injectable({
  providedIn: 'root'
})

export class DatesService {

  constructor(private http: HttpClient) { }

  private url =  `${apiUrl}api/get-event`;

  returnDates = new Observable<any>(subscriber => {
    this.http.post(this.url, null).subscribe(data => {
      console.log(data);
      subscriber.next(data["dates"]);
      subscriber.complete();
    });
  });
}
