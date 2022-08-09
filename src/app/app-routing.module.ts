import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CitiesComponent } from "./cities/cities.component";
import { CountriesComponent } from "./countries/countries.component";
import { HomeComponent } from "./home/home.component";


const routes: Routes =
  [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'cities', component: CitiesComponent },
    { path: 'countries', component: CountriesComponent }
    // { path: 'city', component: CitiesComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
