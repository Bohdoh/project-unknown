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
import {ProfilInfoComponent} from "./profile-page/profil-info/profil-info.component";
import {UserReviewComponent} from "./profile-page/user-review/user-review.component";
import {UserCommentsComponent} from "./profile-page/user-comments/user-comments.component";
import {AboutComponent} from "./about/about.component";


const routes: Routes = [
  {path: "", component: LandingComponent},
  {path: "game/view/:id", component: GameDetailComponent},
  {path: 'home',component:LandingComponent},
  { path: 'profile', component: ProfilePageComponent, data: { title: 'Profile' } },
  { path: 'profile/:username', component: ProfilePageComponent },
  { path: 'profile/:username/details', component: ProfilInfoComponent },
  { path: 'profile/:username/comments', component: UserCommentsComponent },
  { path: 'profile/:username/reviews', component: UserReviewComponent },
  {path: "game/play/:id/:title", component: GameChaptersComponent},
  { path: 'api/users/:username/listOfUsers', component: UserListComponent },
  { path: 'about', component: AboutComponent }
];

// data: { title: 'Profile' }


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

