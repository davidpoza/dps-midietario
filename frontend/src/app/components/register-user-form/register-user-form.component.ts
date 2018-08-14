import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register-user-form.component.html',
  styleUrls: ['./register-user-form.component.css']
})
export class RegisterUserFormComponent implements OnInit {
  public user:User;


  constructor(
    private _userService: UserService,
    public snackBar: MatSnackBar,
  ) {
    this.user = new User('','','','','','m',0,0,0,0,0,0,0,'');

   }

  ngOnInit() {

  }

  onClick(form){
    this._userService.register(this.user).subscribe(
      response => {
        this.snackBar.open("Usuario registrado con éxito.", '', {
          duration: 500,
        });
        form.reset();           
      },
      error => {
        this.snackBar.open(error.error.message, '', {
          duration: 500,
        });
      }
    );
  }

}
