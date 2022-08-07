import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CitiesComponent } from "./cities/cities.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes =
  [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'home', component: CitiesComponent },
    { path: 'country', component: CitiesComponent },
    { path: 'city', component: CitiesComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
