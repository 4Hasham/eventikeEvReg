import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {

  public name: string;
  public type: string;
  public flag: boolean;
  public dis: boolean;

  @Output() valid = new EventEmitter<boolean>()

  constructor() {}

  ngOnInit(): void {
    this.name = "";
    this.type = "free";
    this.flag = false;
    this.dis = true;
    setInterval(this.checkValidity, 2500);
  }

  checkValidity = () => {
    let len: number = this.name.trim().length;
    console.log("HERE", len);
    if(len != 0) {
      if(len < 4) {
        this.flag = true;
        this.dis = false;
      }
      else if(len > 14) {
        this.flag = true;
        this.dis = false;
      }
      else {
        this.dis = false;
      }
    }
    else {
      this.flag = false;
      this.dis = true;
    }
    this.valid.emit(!this.dis);
  }
}
