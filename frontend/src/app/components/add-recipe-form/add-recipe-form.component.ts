import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../../models/recipe';
import { UserService } from '../../../services/user.service';
import { AppService } from '../../../services/app.service';
import { FoodService } from '../../../services/food.service';
import { Global } from '../../../services/global';
import * as $ from 'jquery';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-recipe-form',
  templateUrl: './add-recipe-form.component.html',
  styleUrls: ['./add-recipe-form.component.css'],
  providers: [FoodService]
})
export class AddRecipeFormComponent implements OnInit {
  public filesToUpload: Array<File>;
  public token;
  public identity;
  public recipe: Recipe;
  public url:string;
  public froalaOptions: Object = {
    placeholderText: 'Descripción para realizar la receta',
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat', 'emoticons', 'undo', 'redo', 'fullscreen'],
  }
  constructor(
    private _foodService: FoodService,
    private _userService: UserService,
    private _appService: AppService,
    public snackBar: MatSnackBar,
  ) {
    this.url = Global.url;
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.recipe = new Recipe('', '','', '', [], 0, 0, 0, 0, 0, 0, 0);
    this._appService.setTitle("");
    this._appService.setShowMenu(false);
  }

  ngOnInit() {
    
  }


  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}
