import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiaryComponent } from './components/diary/diary.component';
import { LoginComponent } from './components/login/login.component';
import { FoodsComponent } from './components/foods/foods.component';
import { AddFoodFormComponent } from './components/add-food-form/add-food-form.component';
import { FoodInfoComponent } from './components/food-info/food-info.component';
import { RegisterUserFormComponent } from './components/register-user-form/register-user-form.component';


const appRoutes: Routes = [
    { path: '', component: DiaryComponent},
    { path: 'foods', component: FoodsComponent},
    { path: 'addfood', component: AddFoodFormComponent},
    { path: 'food/:id/:date/:meal', component: FoodInfoComponent},
    { path: 'food/:id', component: FoodInfoComponent},
    { path: 'foods/:date/:meal', component: FoodsComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterUserFormComponent},

];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);