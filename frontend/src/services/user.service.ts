import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Global } from './global';
import { User } from '../models/user';

@Injectable()
export class UserService{
    public url:string;
    public identity;
    public token;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    testService(){
        return 'Probando';
    }

    login(user, gettoken): Observable<any>{
        if(gettoken){
            user.gettoken = gettoken;
        }
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        let params = JSON.stringify(user);
        return this._http.post(this.url+'login/', params, {headers:headers});
    }

    register(user): Observable<any>{        
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        let params = JSON.stringify(user);
        return this._http.post(this.url+'users/', params, {headers:headers});
    }

    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity'));
        if(identity != "undefined"){
            this.identity = identity;
        }
        else{
            this.identity = null;
        }
        return this.identity;
    }

    getToken(){
        let token = JSON.parse(localStorage.getItem('token'));
        if(token != "undefined"){
            this.token = token;
        }
        else{
            this.token = null;
        }
        return this.token;
    }

    getUsers(token): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', token);
        return this._http.get(this.url+'users/', {headers:headers});
    }

    getUserByEmail(email,token): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', token);
        return this._http.get(this.url+'usersbyemail/'+email, {headers:headers});
    }

    updateUser(userId, update, token): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', token);
        let params = JSON.stringify(update);
        return this._http.put(this.url+'users/'+userId, params, {headers:headers});
    }

    /* Creamos un objeto ajax contra la url de subida de ficheros
     y un objeto formulario donde añadimos todos los ficheros.
     
     Llamaremos a esta url del api justo despues de haber añadido un item
     con exito.*/
     makeFileRequest(url: string, params: Array<string>, files: Array<File>, name: string, token){
        return new Promise(function(resolve, reject){
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();

            for(var i = 0; i < files.length; i++){
                formData.append(name, files[i], files[i].name);
            }

            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.response));
                    }
                    else{
                        reject(xhr.response);
                    }
                }
            }

            xhr.open("POST", url, true);
            //añadimos la cabecera de autorizacion
            xhr.setRequestHeader('Authorization',token);
            xhr.send(formData);
        });
    }
}