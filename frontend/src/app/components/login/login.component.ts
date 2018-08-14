import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service'; 
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:  [UserService ]
})
export class LoginComponent implements OnInit {
  public user:User;
  public identity;
  public token;
  public status: string;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    public snackBar: MatSnackBar
  ) { 
    this.user = new User('','','','','','m',0,0,0,0,0,0,0,'');

  }

  ngOnInit() {
  }

  /*realiza login del usuario */
  onClick(){
    this._userService.login(this.user, "false" ).subscribe(
      response => {
          this.identity = response.user;
          console.log(response);
          if(!this.identity || !this.identity._id){
            this.status = 'error';
            
          }
          else{
            this.status = 'success';
            
            this._userService.login(this.user, "true").subscribe(
              response => {
                  this.token = response.token;
                  if(this.token.length <= 0){
                    this.status = 'error';
                  }
                  else{
                    this.status = 'success';
                    localStorage.setItem("token", JSON.stringify(this.token));
                    localStorage.setItem("identity", JSON.stringify(this.identity));
                    this._router.navigate(['/']);
                  }
                  
              },
              error => {
                console.log();
              }
            );
            
          }
          
      },
      error => {
        this.status = 'error';
        this.snackBar.open(error.error.message, '', {
          duration: 500,
        });
        console.log(error.error.message);
      }
    );
  }


}
