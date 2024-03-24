import { Component, OnInit } from '@angular/core';
// import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  AsyncValidatorFn,
  AbstractControl,
} from '@angular/forms';

import { environment } from './../../environments/environment';
import { City } from './city';
import { Country } from './../countries/country';
import { map, Observable, Subscription } from 'rxjs';
import { BaseFormComponent } from '../base-form.component';
import { CityService } from './city.service';

@Component({
  selector: 'app-city-edit',
  templateUrl: './city-edit.component.html',
  styleUrls: ['./city-edit.component.scss'],
})
export class CityEditComponent extends BaseFormComponent implements OnInit {
  // the view title
  title?: string;
  // the form model
  // the form model
  // form!: FormGroup; // inherited from BaseFormComponent
  // the city object to edit or create
  city?: City;

  // the countries array for the select
  countries?: Observable<Country[]>;
  // the city object id, as fetched from the active route:
  // It's NULL when we're adding a new city,
  // and not NULL when we're editing an existing one.
  id?: number;

  // base URL for API requests
  baseUrl?: string = environment.baseUrl;

  activityLog: string = '';

  private subscriptions: Subscription = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    // private http: HttpClient,
    private cityService: CityService
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        name: new FormControl('', Validators.required),
        lat: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[-]?[0-9]+(\.[0-9]{1,4})?$/),
        ]),
        lon: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[-]?[0-9]+(\.[0-9]{1,4})?$/),
        ]),
        countryId: new FormControl('', Validators.required),
      },
      null,
      this.isDupeCity()
    );

    // Observe changes in the form.

    this.subscriptions.add(
      this.form.valueChanges.subscribe(() => {
        if (!this.form.dirty) {
          this.log('Form model has been loaded.');
        } else {
          this.log('Form was updated by the user.');
        }
      })
    );

    this.subscriptions.add(
      this.form.get('name')!.valueChanges.subscribe(() => {
        if (!this.form.dirty) {
          this.log('Name has been loaded with initial values');
        } else {
          this.log('Name was updated by the user');
        }
      })
    );

    this.loadData();
  }
  log(str: string) {
    // this.activityLog += "[" + new Date().toLocaleDateString() + "]: " + str + "<br />";
    console.log('[' + new Date().toLocaleDateString() + ']: ' + str + '<br />');
  }

  isDupeCity(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Observable<{ [key: string]: any } | null> => {
      var city = <City>{};
      city.id = this.id ? this.id : 0;
      city.name = this.form.controls['name'].value;
      city.lat = +this.form.controls['lat'].value;
      city.lon = +this.form.controls['lon'].value;
      city.countryId = +this.form.controls['countryId'].value;

      var url = environment.baseUrl + 'api/Cities/IsDupeCity';
      //return this.http.post<boolean>(url, city).pipe(map(result =>
      return this.cityService.isDupeCity(city).pipe(
        map((result) => {
          return result ? { isDupeCity: true } : null;
        })
      );
    };
  }

  loadCountries() {
    // fetch all the countries from the server
    // var url = this.baseUrl + 'api/countries';
    // var params = new HttpParams()
    //   .set("pageIndex", "0")
    //   .set("pageSize", "9999")
    //   .set("sortColumn", "name");

    this.cityService
      .getCountries(0, 9999, 'name', 'asc', null, null)
      .pipe(map((x) => x.data));

    // .subscribe({
    //   next: (result) => this.countries = result.data,
    //   error: (err) => console.log("Load country failed!", err),
    //   complete: () => console.log("Complete")
    // });
  }
  onSubmit() {
    // alert("Submitting...");
    console.log(this.city);
    var city = this.id ? this.city : <City>{};
    if (city) {
      city.name = this.form.controls['name'].value;
      city.lat = +this.form.controls['lat'].value;
      city.lon = +this.form.controls['lon'].value;
      city.countryId = +this.form.controls['countryId'].value;

      if (this.id) {
        // EDIT mode
        // var url = environment.baseUrl + 'api/Cities/' + city.id;
        this.cityService.put(city).subscribe({
          next: (result) => {
            console.log('City ' + city!.id + ' has been updated.');
          },
          error: (err) => console.log('Update Error: ', err),
          complete: () => this.router.navigate(['/cities']),
        });
        // .subscribe(result => {
        //   console.log("City " + city!.id + " has been updated.");
        //   this.router.navigate(['/cities']);

        // }, err => console.log(err));
        // go back to cities view
      } else {
        // ADD NEW
        // var url = environment.baseUrl + 'api/Cities';
        this.cityService.post(city).subscribe({
          next: (result) =>
            console.log('City ' + result.id + ' has been created.'),
          error: (err) => console.log('Post error', err),
          complete: () => this.router.navigate(['/cities']),
        });
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

      this.cityService.get(this.id).subscribe(
        (result) => {
          this.city = result;
          this.title = 'Edit - ' + this.city.name;

          // update the form with the city value
          this.form.patchValue(this.city);
        },
        (error) => console.log(error)
      );
    } else {
      // Add new mode
      this.title = 'Create a new city';
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
