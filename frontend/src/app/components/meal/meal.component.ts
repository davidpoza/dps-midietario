import { Component, OnInit, Input } from '@angular/core';
import { FoodService } from '../../../services/food.service';
import { UserService } from '../../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import * as moment from 'moment';

@Component({
  selector: 'meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css'],
  providers: [FoodService]
})
export class MealComponent implements OnInit {

  @Input() name: string;
  @Input() index: number;
  @Input() foods: any[];
  @Input() totals: any[];
  @Input() diary: string;
  public token;
  public identity;
  public date;
  public meal;

  constructor(
    private _foodService: FoodService,
    private _userService: UserService,
    public snackBar: MatSnackBar,
    private _route: ActivatedRoute,
    private router: Router
  ) {
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    
  }

  //@Input() diary está disponible cuando la vista ha cargado-> ngOnInit
  ngOnInit() {
    this._route.params.subscribe(params => {
      if(params.date)
        this.date = params.date;
      else{
        this.date = moment(this.diary).format("YYYY-MM-DD")
      }
    })
  }

  onDeletedFood(index){    
    this.foods.splice(index,1);
    this.snackBar.open("Alimento borrado del diario con exito.", '', {
      duration: 500,
    }); 
  }
  
}
