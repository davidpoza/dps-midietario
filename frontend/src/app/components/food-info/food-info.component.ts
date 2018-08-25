import { Component, OnInit } from '@angular/core';
import { Food } from '../../../models/food';
import { UserService } from '../../../services/user.service';
import { AppService } from '../../../services/app.service';
import { FoodService } from '../../../services/food.service';
import { RecipeService } from '../../../services/recipe.service';
import { Global } from '../../../services/global';

import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-food-info',
  templateUrl: './food-info.component.html',
  styleUrls: ['./food-info.component.css'],
  providers: [FoodService, RecipeService]
})
export class FoodInfoComponent implements OnInit {
  public food: Food;
  public calculatedFood: Food;
  public quantity;
  public token;
  public identity;
  public foodId;
  public date;
  public meal;
  public recipe;
  public url: String;

  constructor(
    private _foodService: FoodService,
    private _userService: UserService,
    private _recipeService: RecipeService,
    private _appService: AppService,
    public snackBar: MatSnackBar,
    private _route: ActivatedRoute,
    private router: Router,
  ) {
    this.url = Global.url;
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.food = new Food('','','','', [], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    this.calculatedFood = new Food('','','','', [], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    this.quantity = 100;
    this._appService.setTitle("Detalles");
    this._route.params.subscribe(params => {
      this.foodId = params.id;
      this.date = params.date;
      this.meal = params.meal;
      this.recipe = params.recipe;
      console.log(this.recipe);
      this.getFood(this.foodId);
    })

    
  }

  ngOnInit() {
    
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

  addFoodToDiary(){
    this._foodService.addFoodToDiary(this.foodId, this.date, this.meal, this.quantity, this.token).subscribe(
      response =>{
        this.router.navigate(['/diary', this.date]);
        this.snackBar.open("Alimento añadido al diario con exito.", '', {
          duration: 500,
        });          
        console.log(response.diary);
      },
      error => {
        console.log();
      }
    );
  }

  addIngredientToRecipe(){
    this._recipeService.addIngredientToRecipe(this.token, this.foodId, this.recipe, this.quantity ).subscribe(
      response =>{
        this.router.navigate(['/recipes', this.recipe]);
        this.snackBar.open("Ingrediente añadido a la receta con exito.", '', {
          duration: 500,
        });          
        console.log(response.recipe);
      },
      error => {
        console.log();
      }
    );
  }
}
