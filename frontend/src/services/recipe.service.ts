import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Global } from './global';
import { Diary } from '../models/diary';
import { Recipe } from '../models/recipe';

@Injectable()
export class RecipeService{
    public url:string;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    getRecipes(token):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);

        return this._http.get(this.url+'recipes/', {headers:headers});
    }

    getRecipe(token, recipeId):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        
        return this._http.get(this.url+'recipes/'+recipeId, {headers:headers});
    }

    updateDiary(token, diaryId, update):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        let params = JSON.stringify(update);
        return this._http.put(this.url+'diaries/'+diaryId, params, {headers:headers});
    }

    createDiary(token, diary):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        let params = JSON.stringify(diary);
        return this._http.post(this.url+'diaries/', params, {headers:headers});
    }

    addRecipe(token, recipe):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        
        return this._http.post(this.url+'recipes/', recipe, {headers:headers});
    }

    addIngredientToRecipe(token, food, recipe, quantity):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        let params = {
            quantity: quantity,
            ingredient: food,
            recipe: recipe
        }
        return this._http.post(this.url+'addingredienttorecipe/', params, {headers:headers});
    }

    /*usamos un metodo post y no un metodo delete porque necesito pasar un objeto json */
    deleteIngredientFromRecipe(recipe, ingredient_index, token):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', token);
        let params = {
            recipe: recipe,
            ingredient: ingredient_index
        };
        return this._http.post(this.url+'deleteingredientfromrecipe', params, {headers:headers});
    }
    
    //calcula macros de los ingredientes segun su cantidad
    calculateIngredientMacros(recipe):Recipe{
        var result_recipe = new Recipe(
            recipe._id,
            recipe.name,
            recipe.description,
            recipe.image,
            recipe.ingredients,
            0,0,0,0,0,0,0
        );

        for(var i=0;i<recipe.ingredients.length;i++){
            result_recipe.ingredients[i].refFood.protein = result_recipe.ingredients[i].refFood.protein * result_recipe.ingredients[i].quantity/100;
            result_recipe.ingredients[i].refFood.carbohydrates = result_recipe.ingredients[i].refFood.carbohydrates * result_recipe.ingredients[i].quantity/100;
            result_recipe.ingredients[i].refFood.fat = result_recipe.ingredients[i].refFood.fat * result_recipe.ingredients[i].quantity/100;
            result_recipe.ingredients[i].refFood.fiber = result_recipe.ingredients[i].refFood.fiber * result_recipe.ingredients[i].quantity/100;
            result_recipe.ingredients[i].refFood.kcal = result_recipe.ingredients[i].refFood.kcal * result_recipe.ingredients[i].quantity/100;
        }
        return result_recipe;
    }

    //hace la suma de macros de la receta
    calculateRecipeMacros(recipe, quantity):Recipe{
        var result_recipe = new Recipe(
            recipe._id,
            recipe.name,
            recipe.description,
            recipe.image,
            recipe.ingredients,
            0,0,0,0,0,0,0
        );

        var totalProtein = 0;
        var totalCarbohydrates = 0;
        var totalFat = 0;
        var totalSodium = 0;
        var totalFiber = 0;
        var totalKcal = 0;
        var totalQuantity = 0;
        
        for(var i=0;i<recipe.ingredients.length;i++){
            totalProtein += result_recipe.ingredients[i].refFood.protein;
            totalCarbohydrates += result_recipe.ingredients[i].refFood.carbohydrates;
            totalFat += result_recipe.ingredients[i].refFood.fat;
            totalKcal += result_recipe.ingredients[i].refFood.kcal;
            totalQuantity += result_recipe.ingredients[i].quantity;
        }
        
        result_recipe.protein = totalProtein*quantity/totalQuantity;
        result_recipe.carbohydrates = totalCarbohydrates*quantity/totalQuantity;
        result_recipe.fat = totalFat*quantity/totalQuantity;
        result_recipe.sodium = totalSodium*quantity/totalQuantity;
        result_recipe.fiber = totalFiber*quantity/totalQuantity;
        result_recipe.kcal = totalKcal*quantity/totalQuantity;

        return result_recipe;
    }
    
}