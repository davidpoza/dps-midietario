import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Global } from './global';

@Injectable()
export class ListService{
    public url:string;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    testService(){
        return 'Probando';
    }

    getLists(token):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);

        return this._http.get(this.url+'lists', {headers:headers});
    }

    getSharedLists(userId, token):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);

        return this._http.get(this.url+'sharedlistuser/'+userId, {headers:headers});
    }

    getUserSharedWith(listId, token):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);

        return this._http.get(this.url+'usersharedlist/'+listId, {headers:headers});
    }

    addSharedList(listId, userId, token):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        let params = JSON.stringify({
            list: listId,
            user: userId
        });

        return this._http.post(this.url+'sharedlist/', params, {headers:headers});
    }

    removeSharedList(sharedListId, token):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        
        return this._http.delete(this.url+'sharedlist/'+sharedListId, {headers:headers});
    }

    getList(listId,token):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        return this._http.get(this.url+'lists/'+listId, {headers:headers});
    }

    getListItems(listId,token):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', token);
        return this._http.get(this.url+'listitems/'+listId, {headers:headers});
    }

    addList(list,token):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', token);
        let params = JSON.stringify(list);
        return this._http.post(this.url+'lists/', params, {headers:headers});
    }

    deleteList(listId,token):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', token);
        return this._http.delete(this.url+'lists/'+listId, {headers:headers});
    }
}