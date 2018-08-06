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
       for(var i=0;i<diary.meals.length;i++){           
            for(var j=0;j<diary.meals[i].foods.length;j++){
                diary.meals[i].foods[j].refFood.protein = (diary.meals[i].foods[j].quantity * diary.meals[i].foods[j].refFood.protein) / 100;
                diary.meals[i].foods[j].refFood.carbohydrates = (diary.meals[i].foods[j].quantity * diary.meals[i].foods[j].refFood.carbohydrates) / 100;
                diary.meals[i].foods[j].refFood.fat = (diary.meals[i].foods[j].quantity * diary.meals[i].foods[j].refFood.fat) / 100;
                diary.meals[i].foods[j].refFood.kcal = (diary.meals[i].foods[j].quantity * diary.meals[i].foods[j].refFood.kcal) / 100;
                console.log(diary.meals[i].foods[j].refFood.name);
            }
       }
       return diary; 
    }
    
}