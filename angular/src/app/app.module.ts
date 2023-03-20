import { NgModule } from '@angular/core';
import {AppComponent} from "./app.component";
import {NavbarComponent} from "./alwaysVisible/navbar/navbar.component";
import {FooterComponent} from "./alwaysVisible/footer/footer.component";
import {LandingComponent} from "./landing/landing.component";
import {GamesListComponent} from "./landing/games-list/games-list.component";
import {GameComponent} from "./game/game.component";
import {GameCardComponent} from "./landing/games-list/game-card/game-card.component";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app-routing.module";
import {DatePipe} from "@angular/common";




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    GameComponent,
    LandingComponent,
    GamesListComponent,
    GameCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    DatePipe // Add DatePipe to the providers array
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
