import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatTable } from '@angular/material/table';
 

@Component({
  selector: 'app-invitation',
  templateUrl: 'invitation.component.html',
  styleUrls: ['invitation.component.css']
})
export class InvitationComponent implements OnInit {

  @ViewChild('table', {static: false}) table: MatTable<Element>
  @Input() data_: any[]
  @Output() invitees = new EventEmitter<Object[]>()

  public counter: number;
  public name: string;
  public email: string; 
  public phone: number;
  public edited: boolean;
  public edit: boolean;
  public roles: string[];
  public flag: boolean;
  public desc;
  public errors: boolean[];
  public selConf: string;
  public inter1: number;
  public inter2: number;
  public inter3: number;
  public inter4: number;
  public id: number;
  public role: string;
  public index: number;
  public DateTime: string;
  public data = [
    {name: 'Hasham', email: 'hasham@gmail.com', phone: '7654321', role: 'Staff Member', action: 1},
    {name: 'Gabriel', email: 'gabriel@gmail.com', phone: '1234567', role: 'Organizer', action: 2}
  ];
  public dataSource = this.data;
  public displayedColumns = ['name', 'email', 'phone', 'role', 'action'];

  constructor() {}

  ngOnInit(): void {
    this.counter = 0;
    this.flag = false;
    this.edited = false;
    this.edit = false;
    this.name = "";
    this.desc = "";
    this.email = "";
    this.roles = ["Moderator", "Organizer", "Staff Member", "Panelist", "Speaker"];
    this.errors = [false, false, false, false, false];
    this.selConf = "";
    this.inter1 = 0;
    this.inter2 = 0;
    this.inter3 = 0;
    this.inter4 = 0;
    this.id = 0;
    this.index = -1;
    this.DateTime = "";
    this.role = "";
    setInterval(this.checkFlag, 600);
  }

  checkValidityDesc = () => {
    if(this.counter != 0) {
      if(this.counter < 20) {
        this.flag = true;
        if(this.edited == false) {
          this.errors[0] = true;
        }
      }
      else if(this.counter > 1000) {
        this.flag = true;
        if(this.edited == false) {
          this.errors[1] = true;
        }
      }
      else {
        this.errors[0] = false;
        this.errors[1] = false;
      }
    }
    else {
      this.flag = true;
    }
  }

  setConfValue = (event: any) => {
    this.selConf = event;
    for(let i of this.data_) {
      if(i.title == this.selConf) {
        this.id = this.data_.indexOf(i);
        break;
      }
    }
    this.returnDateTime();
  }

  returnDateTime = (): void => {
    let date = this.data_[this.id].date;
    let time = this.data_[this.id].time;
    let ret = date.split('/')[1] + "-" + date.split('/')[0] + "-" + date.split('/')[2] + ", " + time.split(' - ')[0];
    this.DateTime = ret;
  }

  saveDesc = (event: any) => {
    this.desc = event;
    if(this.inter2 == 0) {
      this.inter2 = setInterval(this.checkValidityDesc, 600);
    }
  }

  count = (event: any) => {
    this.counter = event.editor.getLength() - 1;
  }

  saveName = (event: any) => {
    this.name = event;
    if(this.inter1 == 0) {
      this.inter1 = setInterval(this.checkValidityName, 600);
    }
  }

  saveEmail = (event: any) => {
    this.email = event;
    if(this.inter3 == 0) {
      this.inter3 = setInterval(this.checkValidityEmail, 600);
    }
  }

  savePhone = (event: any) => {
    this.phone = event;
    if(this.inter4 == 0) {
      this.inter4 = setInterval(this.checkValidityPhone, 600);
    }
  }

  setRole = (event: any) => {
    this.role = event;
  }

  checkValidityName = () => {
    let len: number = this.name.trim().length;
    if(len != 0) {
      if(len < 3) {
        this.flag = true;
        this.errors[2] = true;
      }
      else if(len > 100) {
        this.flag = true;
        this.errors[2] = true;
      }
      else {
        this.errors[2] = false;
      }
    }
    else {
      this.flag = true;
    }
  }

  checkValidityEmail = () => {
    if(this.email.length != 0) {
      if(this.email.length < 10) {
        this.flag = true; 
        this.errors[3] = true;
      }
      else if (this.email.length > 50) {
        this.flag = true;
        this.errors[3] = true;
      }
      else if(!this.email.includes('.com') || !this.email.includes('@')) {
        this.flag = true;
        this.errors[3] = true;
      }
      else {
        this.errors[3] = false;
      }
    }
    else {
      this.flag = true;
    }
  }

  checkValidityPhone = () => {
    let len: number = this.phone;
    if(len != 0) {
      if(len < 999999) {
        this.flag = true;
        this.errors[4] = true;
      }
      else if(len > 10000000000000) {
        this.flag = true;
        this.errors[4] = true;
      }
      else {
        this.errors[4] = false;
      }
    }
    else {
      this.flag = true;
    }
  }

  checkFlag = () => {

    if(!this.errors[2] && !this.errors[3] && !this.errors[4] && this.role.trim().length != 0) {
      this.flag = false;
    }
    else {
      this.flag = true;
    }

    if(!this.flag) {
      this.flag = false;
      this.errors[2] = false;
      this.errors[3] = false;
      this.errors[4] = false;
    }
  }

  removeInvite = (index: number) => {
    let t = 0;
    for(let i = 0; i < this.data.length; i++) {
      if(this.data[i].action == index) {
        t = i;
        break;
      }
    }
    this.data.splice(t, 1);
    this.table.renderRows();
  }

  currentObj = (i: number): any => {
    let lastID;
    if(i == 0) {
      lastID = 0;
      for(let i = 0; i < this.data.length; i++) {
        if(this.data[i].action > lastID) {
          lastID = this.data[i].action;
        }
      }
    }
    else {
      lastID = i + 1;
    }
    let invite = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      role: this.role,
      action: lastID + 1
    };
    return invite;
  }

  refreshFields = () => {
    this.name = "";
    this.email = "";
    this.phone = 0;
    this.role = "";
  }

  loadData = (data: any) => {
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.role = data.role;
  }

  newInvite = (event: any): void => {
    event.preventDefault();
    let conf = this.currentObj(0);  
    this.data.push(conf);
    this.table.renderRows();
    this.refreshFields();
    this.invitees.emit(this.data);
  }

  editInvite = (event:any, index: number) => {
    if(this.edit == false && this.index == -1) {
      this.index = index;
      this.loadData(this.data[index - 1]);
      this.edit = true;
    }
    else if(this.edit == true && this.index == index) {
      return true;
    }
    else if(this.edit == true && this.index != index) {
      this.index = index;
      this.loadData(this.data[index - 1]);
      this.edit = true;
    }
    else {
      event.preventDefault();
      this.loadData(this.data[index - 1]);
      this.data[index - 1] = this.currentObj(index - 1);
      this.table.renderRows();
      this.refreshFields();
      this.edit = false;
    }
  }

  cancelUpdate = (event: any) => {
    event.preventDefault();
    this.edit = false;
    this.refreshFields();
    this.index = -1;
  }
}

export interface ConferenceElement {
  name: string,
  email: string,
  phone: number,
  role: string,
  action: number
} 