import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Global } from '../../../services/global';

import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public url:string;
  public token;
  public identity;
  public filesToUpload: Array<File>;
  constructor(
    private _userService: UserService,
    public snackBar: MatSnackBar,
    private _router: Router,
  ) {
    this.url = Global.url;
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
  }

  ngOnInit() {
  }

  onSave(form){
    this._userService.updateUser(this.identity._id, this.identity, this.token).subscribe(
      response => {        
        if(this.filesToUpload) {
          this._userService.makeFileRequest(this.url+"uploaduserimage/"+ response.user._id, [], this.filesToUpload, "image", this.token).then((result:any) => {
            
          });
        }
        this.snackBar.open("Cambios guardados.", '', {
          duration: 500,
        });
        //cargamos los datos nuevos en la sesión
        localStorage.setItem("identity", JSON.stringify(response.user));
      },
      error => {
        this.snackBar.open("Error al guardar cambios.", '', {
          duration: 500,
        });
      }
    );
  }
  
  recalculate(){
    this.identity.tmb = this._userService.calculateBMR(
      this.identity.formula,
      this.identity.sex,
      this.identity.age,
      this.identity.height,
      this.identity.weight,
      this.identity.fat,      
      this.identity.activity_level);
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}
