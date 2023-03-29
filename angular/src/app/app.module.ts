import { NgModule } from '@angular/core';
import {AppComponent} from "./app.component";

import {FooterComponent} from "./alwaysVisible/footer/footer.component";
import {LandingComponent} from "./landing/landing.component";
import {GamesListComponent} from "./landing/games-list/games-list.component";
import {GameCardComponent} from "./landing/games-list/game-card/game-card.component";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app-routing.module";
import {DatePipe} from "@angular/common";
import { GameDetailComponent } from './game-detail/game-detail.component';
import { LoginComponent } from './alwaysVisible/navbar/login/login.component';
import { LogoutComponent } from './alwaysVisible/navbar/logout/logout.component';
import { RegisterComponent } from './alwaysVisible/navbar/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { GameChaptersComponent } from './game-detail/game-chapters/game-chapters.component';


import { HomeComponent } from './home/home.component';
import {NgxWebstorageModule} from "ngx-webstorage";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {NavbarComponent} from "./alwaysVisible/navbar/navbar.component";
import {AuthInterceptor} from "./auth.interceptor";
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { CommentsComponent } from './game-detail/comments/comments.component';
import { ReviewsComponent } from './game-detail/reviews/reviews.component';
import { UserListComponent } from './profile-page/user-list/user-list.component';
import { ProfilInfoComponent } from './profile-page/profil-info/profil-info.component';
import { UserReviewComponent } from './profile-page/user-review/user-review.component';
import { UserCommentsComponent } from './profile-page/user-comments/user-comments.component';
import { MenuBarComponent } from './profile-page/menu-bar/menu-bar.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LandingComponent,
    GamesListComponent,
    GameCardComponent,
    GameDetailComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    HomeComponent,
    GameChaptersComponent,
    ProfilePageComponent,
    CommentsComponent,
    ReviewsComponent,
    UserListComponent,
    ProfilInfoComponent,
    UserReviewComponent,
    UserCommentsComponent,
    MenuBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    AppRoutingModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    DatePipe // Add DatePipe to the providers array
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
