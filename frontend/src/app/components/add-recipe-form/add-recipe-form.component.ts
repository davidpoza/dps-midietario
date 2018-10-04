import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../../models/recipe';
import { UserService } from '../../../services/user.service';
import { AppService } from '../../../services/app.service';
import { RecipeService } from '../../../services/recipe.service';
import { FoodService } from '../../../services/food.service';
import { Global } from '../../../services/global';
import * as $ from 'jquery';
import { MatSnackBar } from '@angular/material';
import { Food } from '../../../models/food';

@Component({
  selector: 'app-add-recipe-form',
  templateUrl: './add-recipe-form.component.html',
  styleUrls: ['./add-recipe-form.component.css'],
  providers: [RecipeService, FoodService]
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
    private _recipeService: RecipeService,
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

  onClick(form){
    this._recipeService.addRecipe(this.token, this.recipe).subscribe(
      response => {
        if(this.filesToUpload) {
          this._recipeService.makeFileRequest(this.url+"uploadrecipeimage/"+ response.recipe._id, [], this.filesToUpload, "image", this.token).then((result:any) => {
            console.log("imagen subida con exito");
            
            let food = new Food(
              '', response.recipe._id, this.recipe.name, result.item.image, '', [], 0, 
              this.recipe.kcal, this.recipe.sodium, this.recipe.fiber, 0, this.recipe.protein, this.recipe.carbohydrates, this.recipe.fat,
              0,0,0,0,0,0
            );
            console.log(food);  
            // añadimos la receta como un alimento con su recipe_id correspondiente
       
            this._foodService.addFood(food, this.token).subscribe(
              response => {
                this.snackBar.open("Receta añadida con exito.", '', {
                duration: 500,
                });
                form.reset();
              }
            );

          });
        }                                
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
}
