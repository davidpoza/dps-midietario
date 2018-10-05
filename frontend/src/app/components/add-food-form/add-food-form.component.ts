import { Component, OnInit } from '@angular/core';
import { Food } from '../../../models/food';
import { UserService } from '../../../services/user.service';
import { AppService } from '../../../services/app.service';
import { FoodService } from '../../../services/food.service';
import { Global } from '../../../services/global';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-food-form',
  templateUrl: './add-food-form.component.html',
  styleUrls: ['./add-food-form.component.css'],
  providers: [FoodService]
})
export class AddFoodFormComponent implements OnInit {
  public foods: Array<Food>;
  public filesToUpload: Array<File>;
  public token;
  public identity;
  public food: Food;
  public url:string;
  public foodId:string;

  constructor(
    private _foodService: FoodService,
    private _userService: UserService,
    private _appService: AppService,
    public snackBar: MatSnackBar,
    private _route: ActivatedRoute,
    private router: Router,
  ) {
    this.url = Global.url;
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.food = new Food('','','','', '', [], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    this._route.params.subscribe(params => {
      if(params.id){
        this.foodId = params.id;
        this.getFood(this.foodId);
      }
    })
    this._appService.setTitle("");
    this._appService.setShowMenu(false);
  }

  ngOnInit() {
    
  }

  create(form){
    this._foodService.addFood(this.food, this.token).subscribe(
      response => {
        if(this.filesToUpload) {
          this._foodService.makeFileRequest(this.url+"uploadfoodimage/"+ response.food._id, [], this.filesToUpload, "image", this.token).then((result:any) => {
            console.log("imagen subida con exito");              
          });
        }
        this.snackBar.open("Alimento añadido con exito.", '', {
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

  save(form){
    this._foodService.updateFood(this.foodId, this.food, this.token).subscribe(
      response => {
        if(this.filesToUpload) {
          this._foodService.makeFileRequest(this.url+"uploadfoodimage/"+ response.item._id, [], this.filesToUpload, "image", this.token).then((result:any) => {
            console.log("imagen subida con exito");              
          });
        }
        this.snackBar.open("Alimento modificado con exito.", '', {
          duration: 500,
        });                        
      },
      error => {
        this.snackBar.open(error.error.message, '', {
          duration: 500,
        });
      }
    );
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  getFood(id){    
    this._foodService.getFood(this.foodId,this.token).subscribe(
      response =>{
        this.food = response.food;        
        console.log(response.food);
      },
      error => {
        console.log();
      }
    );
  }
}
