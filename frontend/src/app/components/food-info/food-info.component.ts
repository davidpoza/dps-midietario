import { Component, OnInit } from '@angular/core';
import { Food } from '../../../models/food';
import { UserService } from '../../../services/user.service';
import { AppService } from '../../../services/app.service';
import { FoodService } from '../../../services/food.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-food-info',
  templateUrl: './food-info.component.html',
  styleUrls: ['./food-info.component.css'],
  providers: [FoodService]
})
export class FoodInfoComponent implements OnInit {
  public food: Food;
  public calculatedFood: Food;
  public quantity;
  public token;
  public identity;
  public foodId;
  public date;

  constructor(
    private _foodService: FoodService,
    private _userService: UserService,
    private _appService: AppService,
    private _route: ActivatedRoute,
  ) {
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.food = new Food('','','','', [], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    this.calculatedFood = new Food('','','','', [], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    this.quantity = 100;
    this._route.params.subscribe(params => {
      this.foodId = params.id;
      this.date = params.date;
      this.getFood(this.foodId);
    })

    
  }

  ngOnInit() {
    this._appService.setTitle("Detalles");
  }

  getFood(id){    
    this._foodService.getFood(this.foodId,this.token).subscribe(
      response =>{
        this.food = response.food;
        this.calculatedFood = this._foodService.calculateFoodNutrient(this.food, this.quantity);
        console.log(response.food);
      },
      error => {
        console.log();
      }
    );
  }

  onInput(){
    this.calculatedFood = this._foodService.calculateFoodNutrient(this.food, this.quantity);
  }
}
