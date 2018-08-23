import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AppService } from '../../../services/app.service';
import { RecipeService } from '../../../services/recipe.service';
import { Recipe } from '../../../models/recipe';

import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  public token;
  public identity;
  public search: String;
  public recipes: Array<Recipe>;
  public recipes_copy: Array<Recipe>;

  constructor(
    private _userService: UserService,
    private _appService: AppService,
    private _recipeService: RecipeService,
  ) {
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();

   }

  ngOnInit() {
    this._appService.setTitle("Recetas");
    this._appService.setShowMenu(false);
    this.getRecipes();
  }


  getRecipes(){    
    this._recipeService.getRecipes(this.token).subscribe(
      response =>{
        this.recipes = response.recipes;
        this.recipes_copy = this.recipes.slice(); //hacemos una copia
      },
      error => {
        console.log();
      }
    );
  }
}
