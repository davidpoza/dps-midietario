import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Global } from './global';
import { Food } from '../models/food';

@Injectable()
export class FoodService{
    public url:string;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    testService(){
        return 'Probando';
    }

    getFoods(token):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);

        return this._http.get(this.url+'foods/', {headers:headers});
    }

    getFood(foodId,token):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);

        return this._http.get(this.url+'foods/'+foodId, {headers:headers});
    }


    addFood(item, token):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        let params = JSON.stringify(item);
        return this._http.post(this.url+'foods', params,  {headers:headers});
    }
    
    deleteFood(foodId,token):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', token);
        return this._http.delete(this.url+'foods/'+foodId, {headers:headers});
    }

    addFoodToDiary(food, diary, mealIndex, quantity, token):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', token);
        let params = {
            food: food,
            date: diary,
            meal: mealIndex,
            quantity:quantity,
        };
        return this._http.post(this.url+'addfoodtodiary', params, {headers:headers});
    }
    
    /*usamos un metodo post y no un metodo delete porque necesito pasar un objeto json */
    deleteFoodFromDiary(food, date, mealIndex, token):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', token);
        let params = {
            food: food,
            date: date,
            meal: mealIndex,
        };
        return this._http.post(this.url+'deletefoodfromdiary', params, {headers:headers});
    }

    calculateFoodNutrient(food, quantity){
        var food_result = new Food('','','','', [], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        food_result.protein = food.protein * quantity / 100;
        food_result.carbohydrates = food.carbohydrates * quantity / 100;
        food_result.fat = food.fat * quantity / 100;
        food_result.fiber = food.fiber * quantity / 100;
        food_result.kcal = food.kcal * quantity / 100;
        return food_result;
    }
}