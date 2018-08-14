import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Global } from './global';
import { Diary } from '../models/diary';

@Injectable()
export class DiaryService{
    public url:string;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    testService(){
        return 'Probando';
    }

    getDiary(token, date):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);

        return this._http.get(this.url+'diaries/'+date, {headers:headers});
    }

    updateDiary(token, diaryId, update):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        let params = JSON.stringify(update);
        return this._http.put(this.url+'diaries/'+diaryId, params, {headers:headers});
    }

    //hacemos los calculos de macros respecto de las cantidades indicadas.
    calculateDiary(diary):Diary{
        var result_diary = new Diary(
            diary._id, 
            diary.date,
            diary.proteinTarget,
            diary.carbohydratesTarget,
            diary.kcalTarget, 
            0, 0, 0, 0, 0, 0, 0, 0,
            diary.meals
        );
        //inicializamos los totales diarios
  
       for(var i=0;i<diary.meals.length;i++){
           //inicializamos los subtotales de cada meal
            result_diary.meals[i].totals = {};
            result_diary.meals[i].totals.protein = 0;
            result_diary.meals[i].totals.carbohydrates = 0;
            result_diary.meals[i].totals.fat = 0;
            result_diary.meals[i].totals.kcal = 0;           
            for(var j=0;j<diary.meals[i].foods.length;j++){
                result_diary.meals[i].foods[j].refFood.protein = (diary.meals[i].foods[j].quantity * diary.meals[i].foods[j].refFood.protein) / 100;
                result_diary.meals[i].foods[j].refFood.carbohydrates = (diary.meals[i].foods[j].quantity * diary.meals[i].foods[j].refFood.carbohydrates) / 100;
                result_diary.meals[i].foods[j].refFood.fat = (diary.meals[i].foods[j].quantity * diary.meals[i].foods[j].refFood.fat) / 100;
                result_diary.meals[i].foods[j].refFood.kcal = (diary.meals[i].foods[j].quantity * diary.meals[i].foods[j].refFood.kcal) / 100;
                
                //calculamos subtotales de meal
                result_diary.meals[i].totals.protein += diary.meals[i].foods[j].refFood.protein;
                result_diary.meals[i].totals.carbohydrates += diary.meals[i].foods[j].refFood.carbohydrates;
                result_diary.meals[i].totals.fat += diary.meals[i].foods[j].refFood.fat;
                result_diary.meals[i].totals.kcal += diary.meals[i].foods[j].refFood.kcal;
                console.log(diary.meals[i].foods[j].refFood.name);
            }
            //acumulamos todos los meal en el total diario
            result_diary.totalProtein += diary.meals[i].totals.protein;
            result_diary.totalCarbohydrate += diary.meals[i].totals.carbohydrates;
            result_diary.totalFat += diary.meals[i].totals.fat;
            result_diary.totalKcal += diary.meals[i].totals.kcal;
       }
       return result_diary; 
    }
   
    calculateMacros(diary):Diary{
        var result_diary = new Diary(
            diary._id, 
            diary.date,
            diary.proteinTarget,
            diary.carbohydratesTarget,
            diary.kcalTarget, 
            diary.totalProtein,
            diary.totalCarbohydrate,
            diary.totalFat,
            diary.totalKcal,
            diary.carbohydratesTargetInGrams,
            diary.fatTargetInGrams,
            diary.proteinTargetInPercentage,
            diary.fatTargetInPercentage,
            diary.meals
        );
       result_diary.carbohydratesTargetInGrams =  Math.trunc((result_diary.carbohydratesTarget * result_diary.kcalTarget) / (4*100));
       result_diary.fatTargetInGrams =  Math.trunc((result_diary.kcalTarget - diary.proteinTarget*4 - ((result_diary.carbohydratesTarget * result_diary.kcalTarget) / (100))) / (9));
       result_diary.proteinTargetInPercentage = Math.trunc(diary.proteinTarget*4*100/result_diary.kcalTarget);
       result_diary.fatTargetInPercentage = 100 - result_diary.proteinTargetInPercentage - result_diary.carbohydratesTarget;
       return result_diary; 
    }
    
}