import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AsyncValidatorFn, AbstractControl } from '@angular/forms';

import { environment } from './../../environments/environment';
import { City } from './city';
import { Country } from './../countries/country';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-city-edit',
  templateUrl: './city-edit.component.html',
  styleUrls: ['./city-edit.component.scss']
})
export class CityEditComponent implements OnInit {
  // the view title
  title?: string;
  // the form model
  // the form model
  form!: FormGroup;
  // the city object to edit or create
  city?: City;

  // the countries array for the select
  countries?: Country[];
  // the city object id, as fetched from the active route:
  // It's NULL when we're adding a new city,
  // and not NULL when we're editing an existing one.
  id?: number;

  // base URL for API requests
  baseUrl?: string = environment.baseUrl;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      lat: new FormControl('', Validators.required),
      lon: new FormControl('', Validators.required),
      countryId: new FormControl('', Validators.required),
    }, null, this.isDupeCity());

    this.loadData();

  }

  isDupeCity(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {

      var city = <City>{};
      city.id = (this.id) ? this.id : 0;
      city.name = this.form.controls['name'].value;
      city.lat = +this.form.controls['lat'].value;
      city.lon = +this.form.controls['lon'].value;
      city.countryId = +this.form.controls['countryId'].value;

      var url = environment.baseUrl + 'api/Cities/IsDupeCity';
      return this.http.post<boolean>(url, city).pipe(map(result => {
        return (result ? { isDupeCity: true } : null);
      }));
    }
  }


  loadCountries() {
    // fetch all the countries from the server
    var url = this.baseUrl + 'api/countries';
    var params = new HttpParams()
      .set("pageIndex", "0")
      .set("pageSize", "9999")
      .set("sortColumn", "name");

    this.http.get<any>(url, { params }).subscribe({
      next: (result) => this.countries = result.data,
      error: (err) => console.log("Load country failed!", err),
      complete: () => console.log("Complete")
    });

  }
  onSubmit() {
    var city = (this.id) ? this.city : <City>{};
    if (city) {
      city.name = this.form.controls['name'].value;
      city.lat = +this.form.controls['lat'].value;
      city.lon = +this.form.controls['lon'].value;
      city.countryId = +this.form.controls['countryId'].value;


      if (this.id) {
        var url = environment.baseUrl + 'api/Cities/' + city.id;
        this.http.put<City>(url, city)
          .subscribe({
            next: (result) => { console.log("City " + city!.id + " has been updated."); },
            error: (err) => console.log("Update Error: ", err),
            complete: () => this.router.navigate(['/cities'])
          })
        // .subscribe(result => {
        //   console.log("City " + city!.id + " has been updated.");
        //   this.router.navigate(['/cities']);

        // }, err => console.log(err));
        // go back to cities view

      }
      else {
        // ADD NEW
        var url = environment.baseUrl + 'api/Cities';
        this.http.post<City>(url, city)
          .subscribe(
            {
              next: (result) => console.log("City " + result.id + " has been created."),
              error: (err) => console.log("Post error", err),
              complete: () => this.router.navigate(['/cities'])
            }
          )
        // .subscribe(result => {
        //   console.log("City " + result.id + " has been created.");
        //   this.router.navigate(['/cities']);
        // }, error => console.log(error));

      }


    }
  }
  loadData() {
    this.loadCountries();
    // retrieve the ID from the 'id' parameter
    var idParam = this.activatedRoute.snapshot.paramMap.get('id');
    this.id = idParam ? +idParam : 0;

    if (this.id) {
      // fetch the city from the server
      var url = environment.baseUrl + 'api/Cities/' + this.id;

      this.http.get<City>(url).subscribe(result => {
        this.city = result;
        this.title = "Edit - " + this.city.name;

        // update the form with the city value
        this.form.patchValue(this.city);
      }, error => console.log(error))
    }
    else {
      // Add new mode
      this.title = 'Create a new city';
    }


  }
}
