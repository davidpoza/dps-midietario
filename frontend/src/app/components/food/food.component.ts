import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RecipeService } from '../../../services/recipe.service';
import { FoodService } from '../../../services/food.service';

@Component({
  selector: 'food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css'],
  providers: [RecipeService, FoodService]
})
export class FoodComponent implements OnInit {
  @Input() name: string;
  @Input() brand: number;
  @Input() protein: number;
  @Input() carbohydrates: number;
  @Input() fat: number;
  @Input() kcal: number;
  @Input() quantity: number;
  
  @Input() recipe: string; //id de receta
  @Input() date: string; // string fecha del diario
  @Input() food: string; //id de alimento o ingrediente 
  @Input() meal: number; //el indice de meal
  @Input() index: number; //indice del array de alimentos o ingredientes
  
  @Input() token: String; //token de sesion
  @Output() deletedFood = new EventEmitter();
  @Output() deletedIngredient = new EventEmitter();

  constructor(
    private _recipeService: RecipeService,
    private _foodService: FoodService,
  ) { }

  ngOnInit() {
  }


  deleteFood(food, date, meal){
    this._foodService.deleteFoodFromDiary(food,date,meal,this.token).subscribe(
      response =>{
        this.deletedFood.emit();
        console.log(response.diary);
      },
      error => {
        console.log();
      }
    );
  }

  deleteIngredient(recipe, index){
    this._recipeService.deleteIngredientFromRecipe(recipe, index, this.token).subscribe(
      response =>{
        this.deletedIngredient.emit();  
        console.log(response.recipe);
      },
      error => {
        console.log();
      }
    );
  }
}
