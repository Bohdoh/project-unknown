import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GamesListComponent} from "./landing/games-list/games-list.component";
import {HttpClientModule} from "@angular/common/http";
import {LandingComponent} from "./landing/landing.component";
import {AppComponent} from "./app.component";
import {GameDetailComponent} from "./game-detail/game-detail.component";
import {GameChaptersComponent} from "./game-detail/game-chapters/game-chapters.component";

const routes: Routes = [

  {path: "", component: LandingComponent},
  {path: "game/view/:id", component: GameDetailComponent},
  {path: "game/play/:id/:title", component: GameChaptersComponent}
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
