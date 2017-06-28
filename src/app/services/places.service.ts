import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { IPlace } from "app/interfaces/iplace";
import { Observable } from "rxjs/Observable";

declare var google;

@Injectable()
export class PlacesService {
  private _placesSource = new Subject<IPlace[]>();
  private _selectedPlaceSource = new Subject<IPlace>();

  constructor() { }
  /**
   * this set the place or push the plaec 
   * @param places 
   */
  setPlaces(places: IPlace[]): void {
    this._placesSource.next(places);
  }

  /**
   * this allows for outsider to connect or subscribe to our places 
   */
  getPlaces(): Subject<IPlace[]> {
    return this._placesSource;
  }

  /**
   * this is used to update our selected place
   * @param place 
   */
  selected(place: IPlace) {
    this._selectedPlaceSource.next(place);
  }

  /**
   * allow others to subscribe and listen to the source 
   * when a source is selected
   */
  getSelectedPlace(): Subject<IPlace> {
    return this._selectedPlaceSource;
  }

  /**
     * this is used to retrieve the link for the marker to be placed on the 
     * map
     * @param colour  can either be red, green, blue or yellow or any colour code
     * @param text which is the text to diplay inside our marker
     */
  customIcon(text: string, colour: string = '#00a5fa') {
    return `data:image/svg+xml;charset=utf-8, 
      <svg width="50px" height="50px" viewBox="0 0 130 153" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g id="#ffb500ff">
        <path fill="${colour}" opacity="1.00" d=" M 14.41 0.00 L 115.54 0.00 C 122.93 0.43 129.56 6.22 130.00 13.80 L 130.00 114.20 C 129.56 121.87 122.65 127.77 115.15 127.93 C 105.13 128.09 95.11 127.97 85.09 127.99 C 77.84 136.22 70.92 144.76 63.68 153.00 L 63.30 153.00 C 56.22 144.67 49.13 136.35 42.07 128.00 C 32.69 127.90 23.31 128.21 13.95 127.85 C 6.76 127.36 0.44 121.51 0.00 114.20 L 0.00 13.81 C 0.44 6.25 7.02 0.45 14.41 0.00 Z" />
        <text xmlns="http://www.w3.org/2000/svg" id="c" x="50%" y="45%" text-anchor="middle" fill="white" stroke-width="2px" dy=".3em" style="&#10;    font-size: 70px;&#10;font-family: sans-serif;">${text}</text>
        </g>
      </svg>`;
  }

  /**
   * this is used to get the real details of a service
   * @param place 
   */
  getPlaceDetails(place: IPlace): Observable<IPlace> {

    return Observable.create((observer) => {
      let request = {
        placeId: place.place_id
      };
      let service = new google.maps.places.PlacesService(place.marker.map);
      service.getDetails(request, (place: IPlace, status) => {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          observer.next(place);
        } else {
          observer.error(status);
        }
        observer.complete();
      });
    });
  }

}
