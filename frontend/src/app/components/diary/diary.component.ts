import { Component, OnInit } from '@angular/core';

import { Diary } from '../../../models/diary';
import { NativeDateAdapter } from '@angular/material';
import {DateAdapter} from '@angular/material/core';

import * as moment from 'moment';

import { UserService } from '../../../services/user.service';
import { DiaryService } from '../../../services/diary.service';
import { AppService } from '../../../services/app.service';

import { Router, ActivatedRoute, Params } from '@angular/router';

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
  public diary: Diary;
  public dateString;

  constructor(
    private _diaryService: DiaryService,
    private _userService: UserService,
    private _appService: AppService,
    private _route: ActivatedRoute,
    private router: Router,
  ) { 
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this._route.params.subscribe(params => {
      this.date = params.date;
      //si pasamos una fecha como parametro en la url mostramos el diario de esa fecha
      if(this.date)
        this.date = new Date(this.date);
      else
        this.date = new Date();
    })

    
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
    this.dateString = moment(this.date.toDateString()).format("YYYY-MM-DD")
    this._diaryService.getDiary(this.token, this.dateString).subscribe(
      response =>{
        this.diary = this._diaryService.calculateDiary(response.diary);
        //console.log(this.diary);
    
      },
      error => {
        this.diary = null;
        console.log();
      }
    );
  }
}
 