import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment.prod';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public forecasts?: WeatherForecast[];

  constructor(private http: HttpClient) { }

  title = 'WorldCities';
  ngOnInit(): void {
    this.http.get<WeatherForecast[]>(environment.baseUrl + 'api/weatherforecast').subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));
  }

}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
