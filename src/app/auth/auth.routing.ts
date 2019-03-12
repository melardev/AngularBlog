import {LoginComponent} from './login/login.component';
import {Routes} from '@angular/router';
import {RegisterComponent} from './register/register.component';


export const AuthRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },

];
