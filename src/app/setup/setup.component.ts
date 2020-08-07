import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})

export class SetupComponent implements OnInit {

  public setup_id: number;
  @Input() dates: string[];

  constructor() {}

  ngOnInit(): void {
    this.setup_id = 0;
  }

  onNext = (event: any): void => {
    event.preventDefault();
    this.setup_id++;
  }

}
