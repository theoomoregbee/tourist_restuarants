import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { IReview } from "app/interfaces/ireview";
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from "environments/environment";

@Injectable()
export class ReviewService {

  constructor(private _http: Http) { }

  /**
   * this is used to fetch our reviews from our backend
   */
  fetch(place_id: string): Observable<IReview[]> {
    return this._http.get(environment.endpoint + "/publicReview?place_id=" + place_id)
      .map(res => <IReview[]>res.json());
  }

}
