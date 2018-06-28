import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './core/auth.guard';
import {UserListComponent} from "./user-list/user-list.component";
import {HomeComponent} from "./home/home.component";
import {SearchComponent} from "./search/search.component";
import {RegisterCityComponent} from "./register-city/register-city.component";
import {GabisParisComponent} from "./gabis-paris/gabis-paris.component";


export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, //home redirection
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent },
  { path: 'users', component: UserListComponent},
  { path: 'search', component: SearchComponent},
  { path: 'gabis-paris', component: GabisParisComponent}
];
