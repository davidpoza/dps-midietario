import { Component, OnInit } from '@angular/core';

import { NativeDateAdapter } from '@angular/material';
import {DateAdapter} from '@angular/material/core';

import * as moment from 'moment';

import { UserService } from '../../../services/user.service';
import { DiaryService } from '../../../services/diary.service';
import { AppService } from '../../../services/app.service';


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
    DiaryService,
    
    {provide: DateAdapter, useClass: MyDateAdapter},
  ],
})

export class DiaryComponent implements OnInit {
  public date: Date;
  public token;
  public identity;
  public diary;

  constructor(
    private _diaryService: DiaryService,
    private _userService: UserService,
    private _appService: AppService,
  ) { 
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.date = new Date();
  }

  ngOnInit() {
    this._appService.setTitle("Diario de comidas");
    this.getDiary()

  }

  nextDay(){
    // creamos un objeto nuevo para que salte el two way data binding
    this.date.setDate(this.date.getDate() + 1);
    this.date = new Date(this.date);
    this.getDiary()
    
  }


  prevDay(){
    // creamos un objeto nuevo para que salte el two way data binding
    this.date.setDate(this.date.getDate() - 1);
    this.date = new Date(this.date);
    this.getDiary()
  
  }

  onChangeDate(){
    this.date = new Date(this.date);
    this.getDiary()
  }

  getDiary(){
    var dateString = moment(this.date.toDateString()).format("YYYY-MM-DD")
    this._diaryService.getDiary(this.token, dateString).subscribe(
      response =>{
        this.diary = response.diary;
        console.log(this.diary);
    
      },
      error => {
        this.diary = '';
        console.log();
      }
    );
  }
}
 