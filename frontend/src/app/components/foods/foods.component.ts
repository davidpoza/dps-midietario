import { Component, OnInit } from '@angular/core';
import { Food } from '../../../models/food';
import { UserService } from '../../../services/user.service';
import { AppService } from '../../../services/app.service';
import { FoodService } from '../../../services/food.service';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css'],
  providers: [FoodService]
})
export class FoodsComponent implements OnInit {
  public foods: Array<Food>;
  public token;
  public identity;

  constructor(
    private _foodService: FoodService,
    private _userService: UserService,
    private _appService: AppService,
  ) {
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    
   }

  ngOnInit() {
    this._appService.setTitle("Alimentos");
    this.getFoods();
  }

  getFoods(){    
    this._foodService.getFoods(this.token).subscribe(
      response =>{
        this.foods = response.foods;
        console.log(this.foods);
      },
      error => {
        console.log();
      }
    );
  }
}
