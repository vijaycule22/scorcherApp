import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignupComponent } from "./signup/signup.component";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { PlayersPageComponent } from "./players-page/players-page.component";
import { TeamsPageComponent } from "./teams-page/teams-page.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "signin", component: SignInComponent },
  { path: "signup", component: SignupComponent },
  { path: "teams", component: TeamsPageComponent },
  // Add more routes here
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
