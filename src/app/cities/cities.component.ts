import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTable } from "@angular/material/table";
import { environment } from 'src/environments/environment.prod';
import { City } from './city';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {

  public cities!: City[];
  public displayedColumns: string[] = ['id', 'name', 'lat', 'lon'];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<City[]>(environment.baseUrl + 'api/cities').subscribe(
      result => {
        this.cities = result;

      }, error => {
        console.log(error);
      });
  }

}
