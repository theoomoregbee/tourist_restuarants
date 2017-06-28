import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IPlace } from "app/interfaces/iplace";
import { PlacesService } from "app/services/places.service";
declare var google;
@Component({
  selector: 'app-result',
  template: `
  <div class="found-result-count">
      <strong>FOUND {{places.length}} RESULTS</strong>
      <span class="pull-right">
          <clr-dropdown clrMenuPosition="bottom-right">
          <a clrDropdownToggle>
               Rating
                <clr-icon shape="caret down"></clr-icon>
            </a>
          <clr-dropdown-menu>
            <a  clrDropdownItem>Test</a>
            <a  clrDropdownItem>Beta</a>
          </clr-dropdown-menu>
        </clr-dropdown>
        </span>
    </div> 
    <div class="progress loop" *ngIf="loader"><progress></progress></div>
    <ul class="results">
      <li *ngFor="let place of places" (mouseover)="showMarker(place)" (mouseout)="closeMarkerHover(place)">
     
        <div class="row">
          <div class="col-xs-3">
            <img *ngIf="place.photos?.length>=1" [src]="place.photos[0]">
            <img *ngIf="!place.photos" [src]="place.icon">
          </div>
          <div class="col-xs-9">
            <h1>{{place.name}}
            <span class="pull-right">
            <app-rating [rating]="place.rating"></app-rating> 
            </span>
               
            </h1>
            <p>{{place.vicinity }}</p>
            <p style="margin-top:10px">
               <span class="text-primary">Opened:</span> {{place.opening_hours?.open_now?'Yes':'No'}}
            <span class="pull-right">
             <!-- <button class="fab fab-primary" (mouseenter)="showOpeningHours(place, 'enter')" (mouseleave)="showOpeningHours(place, 'leave')">
                <clr-icon shape="clock" size="24"></clr-icon>
              </button> -->
              <a href="#" class="curved-btn" (click)="setSelected(place)">More &nbsp; &rarr;</a>
            </span>  
            </p> 
          </div>
        </div>
        <!-- working hours 
        <div class="row" style="margin-top:10px" *ngIf="place.show">
        {{place.opening_hours | json}}
           <div class="col-xs-3">
              <span style="font-weight:500; font-size:12px">{{today | date:'d MMM y'}}</span>
          </div>
          <div class="col-xs-9">
            <span class="curved-btn" *ngFor="let i of [1,2,3]">8:30 <sup>AM</sup></span> 
            <span class="curved-btn">...</span> 
          </div> 
         </div>
        working hours end -->

      </li>
    </ul>
  `,
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  places: IPlace[] = [];
  loader: boolean = false;
  today = new Date();
  rating_stars: number[] = [1, 2, 3, 4, 5];

  constructor(private _placesService: PlacesService, private _changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.loader = true;
    this._placesService.getPlaces().subscribe((places: IPlace[]) => {
      this.places = places;
      this.loader = false;
      this._changeDetector.detectChanges();
    });
  }

  showOpeningHours(place, out: "leave" | "enter") {
    place.show = out == "enter";
    this._changeDetector.detectChanges();
  }

  ceil(x: number) {
    return Math.ceil(x);
  }

  setSelected(place: IPlace) {
    this._placesService.selected(place);
  }

  /**
   * 
   * @param place 
   */
  showMarker(place: IPlace) {
    place.marker.map.setCenter(place.marker.getPosition());
    place.marker.setIcon(this._placesService.customIcon(this.places.indexOf(place).toString(), "#ffb500"));
    place.marker.setAnimation(google.maps.Animation.BOUNCE);
  }

  /**
   * this is simply here to unset our marker when the mouse is out
   * @param place 
   */
  closeMarkerHover(place: IPlace) {
    place.marker.setIcon(this._placesService.customIcon(this.places.indexOf(place).toString()));
    place.marker.setAnimation(null);
  }

}
