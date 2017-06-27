import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { IPlace } from "app/interfaces/iplace";

@Injectable()
export class PlacesService {
  private _placesSource = new Subject<IPlace[]>();

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

}
