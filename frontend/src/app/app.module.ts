import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material';
import { MatInputModule }  from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { RegisterUserFormComponent } from './components/register-user-form/register-user-form.component';
import { DiaryComponent } from './components/diary/diary.component';
import { MealComponent } from './components/meal/meal.component';
import { FoodsComponent } from './components/foods/foods.component';
import { AddFoodFormComponent } from './components/add-food-form/add-food-form.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { FoodInfoComponent } from './components/food-info/food-info.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeInfoComponent } from './components/recipe-info/recipe-info.component';
import { FoodComponent } from './components/food/food.component';
import { AddRecipeFormComponent } from './components/add-recipe-form/add-recipe-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterUserFormComponent,
    DiaryComponent,
    MealComponent,
    FoodsComponent,
    AddFoodFormComponent,
    ConfirmationDialogComponent,
    FoodInfoComponent,
    ProfileComponent,
    RecipesComponent,
    RecipeInfoComponent,
    FoodComponent,
    AddRecipeFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    BrowserAnimationsModule,
    HttpClientModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatInputModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  entryComponents: [
    ConfirmationDialogComponent,
  ],

  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
