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
     NgxGalleryModule
  ],
  providers: [GeolocationService, PlacesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
