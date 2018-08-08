import { Component, OnInit } from '@angular/core';
import { Food } from '../../../models/food';
import { UserService } from '../../../services/user.service';
import { AppService } from '../../../services/app.service';
import { FoodService } from '../../../services/food.service';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css'],
  providers: [FoodService]
})
export class FoodsComponent implements OnInit {
  public foods: Array<Food>;
  public token;
  public identity;
  public date;
  public meal;

  constructor(
    private _foodService: FoodService,
    private _userService: UserService,
    private _appService: AppService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private _route: ActivatedRoute,
    private router: Router
  ) {
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    
    //pasamos los parametros de la url al siguiente componente de food-info
    this._route.params.subscribe(params => {
      this.date = params.date;
      this.meal = params.meal;
    })
   }

  ngOnInit() {
    this._appService.setTitle("Alimentos");
    this.getFoods();
  }

  getFoods(){    
    this._foodService.getFoods(this.token).subscribe(
      response =>{
        this.foods = response.foods;
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

  onClick(food, date, meal){
    // si le estamos pasando diary y meal como parametros en la url entonces insertamos alimento
    if(food && date && meal)
      this.router.navigate(['/food', food, date, meal]);
    // en caso contrario, mostramos 
  }

}
