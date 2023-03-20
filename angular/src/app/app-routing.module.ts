import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import {AppComponent} from "./app.component";
const routes: Routes = [ { path: '', component: AppComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
