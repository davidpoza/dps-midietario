import { Component, OnInit } from '@angular/core';

import { NativeDateAdapter } from '@angular/material';
import {DateAdapter} from '@angular/material/core';


class MyDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };  
    return date.toLocaleDateString("es-ES", options);
  }
}

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css'],
  providers: [
    {provide: DateAdapter, useClass: MyDateAdapter},
  ],
})

export class DiaryComponent implements OnInit {
  public date: Date;

  constructor() { 
    this.date = new Date();
  }

  ngOnInit() {
  }

  nextDay(){
    // creamos un objeto nuevo para que salte el two way data binding
    this.date.setDate(this.date.getDate() + 1);
    this.date = new Date(this.date);
    
  }


  prevDay(){
    // creamos un objeto nuevo para que salte el two way data binding
    this.date.setDate(this.date.getDate() - 1);
    this.date = new Date(this.date);    
  }
}
 