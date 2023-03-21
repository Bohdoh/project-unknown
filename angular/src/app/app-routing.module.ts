import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GamesListComponent} from "./landing/games-list/games-list.component";
import {HttpClientModule} from "@angular/common/http";
import {LandingComponent} from "./landing/landing.component";
import {AppComponent} from "./app.component";
import {GameDetailComponent} from "./game-detail/game-detail.component";
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  { path: '', component: AppComponent },
  {path: " ", component: LandingComponent},
  {path: "game/view/:id", component: GameDetailComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path: 'home',component:HomeComponent}
];




@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

