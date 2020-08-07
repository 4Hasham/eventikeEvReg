import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class LanguagesService {

  constructor(private http: HttpClient) {}

  returnLangs = new Observable<any>(subscriber => {
    const header1 = { 'content-type': 'application/json' };
    this.http.get("assets/languages.json", { headers: header1 }).subscribe(data => {
        let values = Object.values(data);
        subscriber.next(values);
        subscriber.complete();
    });
  });
  
}