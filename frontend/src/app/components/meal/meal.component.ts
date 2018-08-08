import { Component, OnInit, Input } from '@angular/core';
import { FoodService } from '../../../services/food.service';
import { UserService } from '../../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material';

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
    this._route.params.subscribe(params => {
      this.date = params.date;
    })
  }

  ngOnInit() {
  }

  deleteFood(food, meal, index){
    this._foodService.deleteFoodFromDiary(food,this.date,meal,this.token).subscribe(
      response =>{
        this.foods.splice(index,1);
        this.snackBar.open("Alimento borrado del diario con exito.", '', {
          duration: 500,
        });          
        console.log(response.diary);
      },
      error => {
        console.log();
      }
    );
  }
}
