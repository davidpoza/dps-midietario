import { Component,OnInit,DoCheck } from '@angular/core';
import { UserService } from '../services/user.service';
import { AppService } from '../services/app.service';
import { Global } from '../services/global';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, Subscribable } from 'rxjs/Observable'; 
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ UserService, AppService ]
})
export class AppComponent implements OnInit, DoCheck {
  public identity;
  public title: String = '';
  public title$: Observable<String>;
  public titleSubscription: Subscription;
  public showRegister;
  public url: String;
  public showMenu: boolean = true;
  public showMenu$: Observable<boolean>;
  public showMenuSubscription: Subscription;

  constructor(
    private _userService: UserService,
    private _appService: AppService,
    private _route: ActivatedRoute,
    private location: Location,
    public _router: Router,
  ){
    this.url = Global.url;
    this.showRegister = false;
    if( this._router.url == '/register' )
      this.showRegister = true;
  }

  ngOnInit(){ 
    this.identity = this._userService.getIdentity();
    this.title$ = this._appService.getTitle$();
    this.showMenu$ = this._appService.getShowMenu$();

    this.titleSubscription = this.title$.subscribe((title) => {
      this.title = title;
    });
   
    this.showMenuSubscription = this.showMenu$.subscribe((showMenu) => {
      this.showMenu = showMenu;
    });
  }

  /* este evento salta cuando añadimos la key identity en el localStorage */
  ngDoCheck(){
    this.identity = this._userService.getIdentity();
  }

  logout(){
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/']);
  }

  goBack() {
    this.location.back();
    this.showMenu = true;
  }
}

