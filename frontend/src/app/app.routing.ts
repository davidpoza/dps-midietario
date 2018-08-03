import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiaryComponent } from './components/diary/diary.component';
import { ListsComponent } from './components/lists/lists.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterUserFormComponent } from './components/register-user-form/register-user-form.component';


const appRoutes: Routes = [
    { path: '', component: DiaryComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterUserFormComponent},

];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);