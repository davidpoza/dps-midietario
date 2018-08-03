import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable'; 

@Injectable()
export class AppService{
    private title: String;
    private title$: Subject<String> = new Subject<String>();
    private showMenu: boolean;
    private showMenu$: Subject<boolean> = new Subject<boolean>();

    constructor(
        
    ){
        this.title = '';
        this.showMenu = true;
    }

    setTitle(title){
        this.title = title;
        this.title$.next(this.title);
    }

    getTitle(){
        return this.title;
    }

    getTitle$() : Observable<String>{
        return this.title$.asObservable();
    }

    setShowMenu(showMenu){
        this.showMenu = showMenu;
        this.showMenu$.next(this.showMenu);
    }

    getShowMenu(){
        return this.showMenu;
    }

    getShowMenu$(){
        return this.showMenu$.asObservable();
    }
}