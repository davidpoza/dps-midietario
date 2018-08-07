import { Component, OnInit } from '@angular/core';
import { Food } from '../../../models/food';
import { UserService } from '../../../services/user.service';
import { AppService } from '../../../services/app.service';
import { FoodService } from '../../../services/food.service';

import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-food-form',
  templateUrl: './add-food-form.component.html',
  styleUrls: ['./add-food-form.component.css'],
  providers: [FoodService]
})
export class AddFoodFormComponent implements OnInit {
  public foods: Array<Food>;
  public token;
  public identity;
  public food: Food;
  constructor(
    private _foodService: FoodService,
    private _userService: UserService,
    private _appService: AppService,
    public snackBar: MatSnackBar,
  ) { 
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.food = new Food('','','','', [], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }

  ngOnInit() {
    this._appService.setTitle("");
  }

  onClick(form){
    this._foodService.addFood(this.food, this.token).subscribe(
      response => {
        /*if(this.filesToUpload) {
          this._itemService.makeFileRequest(this.url+"uploaditemimage/"+ response.item._id, [], this.filesToUpload, "image", this.token).then((result:any) => {
            this.snackBar.open("Item añadido con exito.", '', {
              duration: 500,
            });
              
          });
        }*/
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
}
