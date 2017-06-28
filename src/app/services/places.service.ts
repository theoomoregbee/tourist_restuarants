import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { IPlace } from "app/interfaces/iplace";

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
  selected(place:IPlace){ 
    this._selectedPlaceSource.next(place);
  }

/**
 * allow others to subscribe and listen to the source 
 * when a source is selected
 */
  getSelectedPlace():Subject<IPlace>{
    return this._selectedPlaceSource;
  }

}
