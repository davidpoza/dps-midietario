import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Global } from './global';

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

    //hacemos los calculos de macros respecto de las cantidades indicadas.
    calculateDiary(diary){
        //inicializamos los totales diarios
        diary.totals = {};
        diary.totals.protein = 0;
        diary.totals.carbohydrates = 0;
        diary.totals.fat = 0;
        diary.totals.kcal = 0;    
       for(var i=0;i<diary.meals.length;i++){
           //inicializamos los subtotales de cada meal
            diary.meals[i].totals = {};
            diary.meals[i].totals.protein = 0;
            diary.meals[i].totals.carbohydrates = 0;
            diary.meals[i].totals.fat = 0;
            diary.meals[i].totals.kcal = 0;           
            for(var j=0;j<diary.meals[i].foods.length;j++){
                diary.meals[i].foods[j].refFood.protein = (diary.meals[i].foods[j].quantity * diary.meals[i].foods[j].refFood.protein) / 100;
                diary.meals[i].foods[j].refFood.carbohydrates = (diary.meals[i].foods[j].quantity * diary.meals[i].foods[j].refFood.carbohydrates) / 100;
                diary.meals[i].foods[j].refFood.fat = (diary.meals[i].foods[j].quantity * diary.meals[i].foods[j].refFood.fat) / 100;
                diary.meals[i].foods[j].refFood.kcal = (diary.meals[i].foods[j].quantity * diary.meals[i].foods[j].refFood.kcal) / 100;
                
                //calculamos subtotales de meal
                diary.meals[i].totals.protein += diary.meals[i].foods[j].refFood.protein;
                diary.meals[i].totals.carbohydrates += diary.meals[i].foods[j].refFood.carbohydrates;
                diary.meals[i].totals.fat += diary.meals[i].foods[j].refFood.fat;
                diary.meals[i].totals.kcal += diary.meals[i].foods[j].refFood.kcal;
                console.log(diary.meals[i].foods[j].refFood.name);
            }
            //acumulamos todos los meal en el total diario
            diary.totals.protein += diary.meals[i].totals.protein;
            diary.totals.carbohydrates += diary.meals[i].totals.carbohydrates;
            diary.totals.fat += diary.meals[i].totals.fat;
            diary.totals.kcal += diary.meals[i].totals.kcal;
       }
       return diary; 
    }
    
}