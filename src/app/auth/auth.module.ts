import {RouterModule} from '@angular/router';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutes} from './auth.routing';
// Components
import {LoginComponent} from './login/login.component';
import {SharedModule} from '../shared/shared.module';
import {RegisterComponent} from './register/register.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(AuthRoutes)
  ],
  declarations: [
    // IndexComponent,
    LoginComponent,
    RegisterComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: []
})
export class AuthModule {
}
