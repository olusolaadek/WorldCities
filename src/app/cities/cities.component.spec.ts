import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularMaterialModule } from "../angular-material-module";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { CitiesComponent } from "./cities.component";
import { City } from "./city";
import { CityService } from "./city.service";
import { ApiResult } from "../base.service";

describe("CitiesComponent", () => {
  let component: CitiesComponent;
  let fixture: ComponentFixture<CitiesComponent>;

  beforeEach(async () => {

    // TODO: declare & initialize required providers
    await TestBed.configureTestingModule({
      declarations: [CitiesComponent],
      imports: [
        BrowserAnimationsModule,
        AngularMaterialModule,
        RouterTestingModule
      ],
      providers: [
        // TODO: reference required providers
      ]
    })
      .compileComponents();

  }); // end beforeEach

  beforeEach(() => {
    fixture = TestBed.createComponent(CitiesComponent);
    component = fixture.componentInstance;

    // TODO: configure fixture/component/children/etc.

    fixture.detectChanges();
  }); // end beforeEach

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: implement some other tests

});
