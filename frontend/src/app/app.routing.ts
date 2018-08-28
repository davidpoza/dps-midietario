import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiaryComponent } from './components/diary/diary.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { FoodsComponent } from './components/foods/foods.component';
import { AddFoodFormComponent } from './components/add-food-form/add-food-form.component';
import { FoodInfoComponent } from './components/food-info/food-info.component';
import { RegisterUserFormComponent } from './components/register-user-form/register-user-form.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeInfoComponent } from './components/recipe-info/recipe-info.component';
import { AddRecipeFormComponent } from './components/add-recipe-form/add-recipe-form.component';

const appRoutes: Routes = [
    { path: '', component: DiaryComponent},
    { path: 'diary/:date', component: DiaryComponent},
    { path: 'foods', component: FoodsComponent},
    { path: 'addfood', component: AddFoodFormComponent},
    { path: 'addrecipe', component: AddRecipeFormComponent},
    { path: 'food/:id/:date/:meal', component: FoodInfoComponent}, //insertamos alimento en diario
    { path: 'food/:id/:recipe', component: FoodInfoComponent}, //insertamos alimento en receta
    { path: 'food/:id', component: FoodInfoComponent}, //simplemente consultamos alimento sin insertalo
    { path: 'foods/:date/:meal', component: FoodsComponent}, //consulta alimentos para insertar en diario
    { path: 'foods/:recipe', component: FoodsComponent}, //consulta alimentos para insertar en receta
    { path: 'profile', component: ProfileComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterUserFormComponent},
    { path: 'recipes', component: RecipesComponent},
    { path: 'recipes/:id', component: RecipeInfoComponent},
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);