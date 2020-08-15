import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})

export class SetupComponent implements OnInit {

  public setup_id: number;
  @Input() dates: string[];
  @Input() eventID: number;
  @Output() confs = new EventEmitter<Object[]>();
  @Output() invitees = new EventEmitter<Object[]>();

  constructor() {}

  ngOnInit(): void {
    this.setup_id = 0;
  }

  onNext = (event: any): void => {
    event.preventDefault();
    this.setup_id++;
  }

  sendData = (event: any) => {
    this.confs.emit(event);
  }

  sendInvites = (event: any) => {
    this.invitees.emit(event);
  }
}
