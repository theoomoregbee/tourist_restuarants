import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ClarityModule } from "clarity-angular";

import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ResultComponent } from './result/result.component';
import { GeolocationService } from "app/services/geolocation.service";
import { PlacesService } from "app/services/places.service";
import { RatingComponent } from './rating/rating.component';



@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    ResultComponent,
    RatingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule.forRoot(),
  ],
  providers: [GeolocationService, PlacesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
