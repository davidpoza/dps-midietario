import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Global } from './global';
import { Diary } from '../models/diary';

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


    
}