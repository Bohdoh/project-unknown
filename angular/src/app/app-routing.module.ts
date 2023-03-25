import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import {LandingComponent} from "./landing/landing.component";
import {GameDetailComponent} from "./game-detail/game-detail.component";
import { LoginComponent } from './alwaysVisible/navbar/login/login.component';
import { RegisterComponent } from './alwaysVisible/navbar/register/register.component';
import {GameChaptersComponent} from "./game-detail/game-chapters/game-chapters.component";
import {ProfilePageComponent} from "./profile-page/profile-page.component";
import {UserListComponent} from "./profile-page/user-list/user-list.component";


const routes: Routes = [
  {path: "", component: LandingComponent},
  {path: "game/view/:id", component: GameDetailComponent},
  {path: 'home',component:LandingComponent},
  { path: 'profile/:username', component: ProfilePageComponent },
  {path: "game/play/:id/:title", component: GameChaptersComponent},
  { path: 'api/users/:username/listOfUsers', component: UserListComponent }
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

