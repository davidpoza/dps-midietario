import { Component, OnInit } from '@angular/core';
import { Food } from '../../../models/food';
import { UserService } from '../../../services/user.service';
import { AppService } from '../../../services/app.service';
import { FoodService } from '../../../services/food.service';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

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

  constructor(
    private _foodService: FoodService,
    private _userService: UserService,
    private _appService: AppService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) {
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    
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
}
