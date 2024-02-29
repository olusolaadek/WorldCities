import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment.prod';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isOnline?: boolean;

  constructor(private http: HttpClient) {}

  title = 'WorldCities';
  ngOnInit(): void {
    this.isOnline = navigator.onLine;
    // if (navigator.onLine) {
    //   alert('online');
    // } else {
    //   alert('offline');
    // }
    // window.addEventListener(
    //   'online',
    //   function (e) {
    //     alert('online');
    //   },
    //   false
    // );
    // window.addEventListener(
    //   'offline',
    //   function (e) {
    //     alert('offline');
    //   },
    //   false
    // );
  }
}
