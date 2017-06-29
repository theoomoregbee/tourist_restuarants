import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { IReview } from "app/interfaces/ireview";
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


import { environment } from "environments/environment";

@Injectable()
export class ReviewService {

  constructor(private _http: Http) { }

  /**
   * this is used to fetch our reviews from our backend
   */
  fetch(place_id: string): Observable<IReview[]> {
    return this._http.get(environment.endpoint + "/publicReview?placeID=" + place_id)
      .map(res => <IReview[]>res.json())
      .catch(this.onCatch);
  }

/**
 * this is used to add new review to our reviews
 * @param review 
 */
  add(review: IReview): Observable<IReview> {
    return this._http.post(environment.endpoint + "/publicReview", review)
      .map(res => <IReview>res.json())
      .catch(this.onCatch);
  }

  /**
   * Error handler.
   * @param error
   * @param caught
   * @returns {ErrorObservable}
   */
  private onCatch(error: any, caught: Observable<any>): Observable<any> {
    let message = error.text();

    try {
      let res = JSON.parse(<string>message);
      if (error.status == 0)
        message = "No internet connection";
      else {

        message = "<ul>";
        //let's handle the error now
        if (res.Errors) {
          for (let property in res.Errors) {
            for (let msg of res.Errors[property]) {
              message += "<li>" + msg.message + "</li>";
            }
          }
        }
        message += "</ul>";
      }
    } catch (e) {

    }

    let x = {
      error: error,
      message: message//do any manipulation here
    }
    return Observable.throw(x);
  }

}
