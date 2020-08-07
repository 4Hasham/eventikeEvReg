import { Component, OnInit, EventEmitter, Input, Output, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Observable, Observer } from 'rxjs';
import { LanguagesService } from './../languages.service';
import { IndustriesService } from './../industries.service';

export interface DialogData {
  desc: string
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {

  public name: string;
  public type: string;
  public desc;
  public lang: string;
  public languages: Observable<string>;
  public ind: string;
  public industries: Observable<any>;
  public flag: boolean;
  public errors: boolean[];
  public Z: boolean;
  public dis: boolean;
  public edited: boolean;
  public counter: number;
  public inter1: number;
  public inter2: number
  @Output() valid = new EventEmitter<boolean>()
  @Output() event_name = new EventEmitter<string>()
  @Output() getdesc = new EventEmitter<any>()
  @Output() getlang = new EventEmitter<string>()
  @Output() event_type  = new EventEmitter<string>()
  @Output() getInd = new EventEmitter<string>()
  @Input() default: Object;

  constructor(public Dialog: MatDialog, public service: LanguagesService, public service_: IndustriesService) {}

  ngOnInit(): void {
    this.name = "";
    this.type = "free";
    this.flag = false;
    this.errors = [false, false, false];
    this.Z = true;
    this.edited = true;
    this.counter = 0;
    this.lang = "English";
    this.inter1 = 0;
    this.inter2 = 0;
    setInterval(this.checkFlag, 600);

    this.languages = new Observable<string>((observer: Observer<string>) => {
      this.service.returnLangs.subscribe({
        next(x) {
          observer.next(x);
        }
      });
    });

    this.industries = new Observable<string>((observer: Observer<string>) => {
      this.service_.returnInds.subscribe({
        next(x) {
          observer.next(x);
        }
      });
    });
    
    if(this.default) {
      this.name = this.default["name"];
      this.desc = this.default["desc"];
      this.type = this.default["type"];
      this.lang = this.default["lang"];
      this.ind = this.default["ind"];
    }

    this.event_type.emit(this.type);
    this.getlang.emit(this.lang);
  }

  saveName = (event: any) => {
    this.name = event;
    this.event_name.emit(this.name);
    if(this.inter1 == 0) {
      this.inter1 = setInterval(this.checkValidityName, 600);
    }
    // if(this.desc.trim() != "" && !this.edited) {
    //   this.edited = true;
    //   this.openDialog();
    // }
  }

  saveDesc = (event: any) => {
    this.desc = event;
    this.getdesc.emit(this.desc);
    if(this.inter2 == 0) {
      this.inter2 = setInterval(this.checkValidityDesc, 600);
    }
    this.edited = false;
  }

  changeType = (event: any) => {
    // if(this.desc.trim() != "" && !this.edited) {
    //   this.edited = true;
    //   this.openDialog();
    // }
    this.type = event;
    console.log(this.type);
    this.event_type.emit(this.type);
  } 

  count = (event: any) => {
    this.counter = event.editor.getLength() - 1;
  }

  checkValidityName = () => {
    let len: number = this.name.trim().length;
    if(len != 0) {
      if(len < 3) {
        this.flag = true;
        this.errors[0] = true;
      }
      else if(len > 100) {
        this.flag = true;
        this.errors[0] = true;
      }
      else {
        this.errors[0] = false;
      }
    }
    else {
      this.flag = true;
    }
  }

  checkValidityDesc = () => {
    if(this.counter != 0) {
      if(this.counter < 20) {
        this.flag = true;
        if(this.edited == false) {
          this.errors[1] = true;
        }
      }
      else if(this.counter > 1000) {
        this.flag = true;
        if(this.edited == false) {
          this.errors[2] = true;
        }
      }
      else {
        this.errors[1] = false;
        this.errors[2] = false;
      }
    }
    else {
      this.flag = true;
    }
  }

  checkFlag = () => {

    if(!this.errors[0] && !this.errors[1] && !this.errors[2] && this.name.trim().length != 0 && this.counter != 0) {
      this.flag = false;
    }
    else {
      this.flag = true;
    }

    if(!this.flag) {
      this.flag = false;
      this.errors[0] = false;
      this.errors[1] = false;
      this.errors[2] = false;
    }

    if(this.Z != this.flag) {
      this.valid.emit(this.flag);
      this.Z = this.flag;
    }
  }

  openDialog = (): void => {
    this.Dialog.open(OutputComponent, {
      data: {
        desc: this.desc
      }
    });
  }

  setLanguageValue = (event: any) => {
    this.lang = event;
    this.getlang.emit(this.lang);
  }

  setIndustryValue = (event: any) => {
    this.ind = event;
    this.getInd.emit(this.ind);
  }
}

@Component({
  selector: 'app-output',
  templateUrl: 'app-output.html'
})

export class OutputComponent {
  constructor(public dialogRef: MatDialogRef<OutputComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  closeDialog = () => {
    this.dialogRef.close();
  }
}