import { Component, OnInit } from '@angular/core';
import { Food } from '../../../models/food';
import { UserService } from '../../../services/user.service';
import { AppService } from '../../../services/app.service';
import { FoodService } from '../../../services/food.service';

import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css'],
  providers: [FoodService]
})
export class FoodsComponent implements OnInit {
  public foods: Array<Food>;
  public foods_copy: Array<Food>;
  public token;
  public identity;
  public date;
  public meal;
  public recipe;
  public search: String;

  constructor(
    private _foodService: FoodService,
    private _userService: UserService,
    private _appService: AppService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private _route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this._appService.setTitle("Alimentos");
    this._appService.setShowMenu(false);
    //pasamos los parametros de la url al siguiente componente de food-info
    this._route.params.subscribe(params => {
      this.date = params.date;
      this.meal = params.meal;
      this.recipe = params.recipe;
    })
   }

  ngOnInit() {
    
    this.getFoods();
  }

  getFoods(){    
    this._foodService.getFoods(this.token).subscribe(
      response =>{
        this.foods = response.foods;
        this.foods_copy = this.foods.slice(); //hacemos una copia
        console.log(this.foods);
      },
      error => {
        console.log();
      }
    );
  }

  deleteList(id,i){
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data:{message: '¿Desea borrar el alimento?'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        // ha pulsado SI, borramos
        this._foodService.deleteFood(id,this.token).subscribe(
          response =>{
            this.foods.splice(i,1);
            this.getFoods();
            this.snackBar.open("Alimento borrado con exito.", '', {
              duration: 500,
            });          
          },
          error => {
            this.snackBar.open(error.error.message, '', {
              duration: 500,
            });
          }
        );
      }

    });    
  }

  onClick(food, date, meal, recipe){
    /* si le estamos pasando diary y meal como parametros en la url entonces mostramos
    la vista para insertar alimento */
    if(food && date && meal)
      this.router.navigate(['/food', food, date, meal]);
    // si estamos pasando un id de receta 
    else if(recipe){
      this.router.navigate(['/food', food, recipe]);
    }
    // en caso contrario, mostramos vista que solo da información
    else
      this.router.navigate(['/food', food]);
  }

  onSearch(){
    this.foods = this.foods_copy.slice(); //recuperamos siempre una copia de la lista completa
    this.foods = this.foods.filter(food => food.name.toLowerCase().includes(<string>this.search.toLowerCase()));     
  }

  goBack() {
    this.location.back();
  }
}
