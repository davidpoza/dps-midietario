import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../../models/recipe';
import { UserService } from '../../../services/user.service';
import { AppService } from '../../../services/app.service';
import { RecipeService } from '../../../services/recipe.service';
import { Global } from '../../../services/global';

import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-info',
  templateUrl: './recipe-info.component.html',
  styleUrls: ['./recipe-info.component.css'],
  providers: [RecipeService]
})
export class RecipeInfoComponent implements OnInit {
  public token;
  public identity;
  public url: String;
  public recipeId: String;
  public recipe: Recipe;
  public quantity: Number;

  constructor(
    private _recipeService: RecipeService,
    private _userService: UserService,
    private _appService: AppService,
    public snackBar: MatSnackBar,
    private _route: ActivatedRoute,
    private router: Router,
  ) {
    this.url = Global.url;
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.quantity = 100;
    this.recipe = new Recipe('','','','',[],0,0,0,0,0,0,0);
    this._appService.setShowMenu(false);
    this._appService.setTitle("");
    this._route.params.subscribe(params => {
      this.recipeId = params.id;
      this.getRecipe(this.recipeId);
    })
  }

  ngOnInit() {
  }

  getRecipe(id){    
    this._recipeService.getRecipe(this.token,id).subscribe(
      response =>{
        this.recipe = response.recipe;
        this.recipe = this._recipeService.calculateIngredientMacros(this.recipe);
        this.recipe = this._recipeService.calculateRecipeMacros(this.recipe, this.quantity);
        console.log(this.recipe);
      },
      error => {
        console.log();
      }
    );
  }


  onInput(){
    this.recipe = this._recipeService.calculateRecipeMacros(this.recipe, this.quantity);
  }

  onDeletedIngredient(recipe, index){
    this.recipe.ingredients.splice(index,1);
    this.snackBar.open("Ingrediente borrado de la receta con exito.", '', {
      duration: 500,
    }); 
  }

  /*deleteIngredient(recipe, index){
    this._recipeService.deleteIngredientFromRecipe(recipe, index, this.token).subscribe(
      response =>{
        this.recipe.ingredients.splice(index,1);
        this.snackBar.open("Ingrediente borrado de la receta con exito.", '', {
          duration: 500,
        });          
        console.log(response.recipe);
      },
      error => {
        console.log();
      }
    );
  }*/
}
