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
import { PlaceComponent } from './place/place.component';

import 'hammerjs';
import { NgxGalleryModule } from 'ngx-gallery';
import { ReviewService } from "app/services/review.service";
import { HttpModule } from "@angular/http";

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    ResultComponent,
    RatingComponent,
    PlaceComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule.forRoot(),
    NgxGalleryModule,
    HttpModule,
  ],
  providers: [GeolocationService, PlacesService, ReviewService],
  bootstrap: [AppComponent]
})
export class AppModule { }
