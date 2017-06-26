import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

@Injectable()
export class GeolocationService {

  constructor() { }

  /**
   * this is used to get and still check if our browser supports navigator or not
   * then convert the output to observable so we can subscribe to get the output
   * @param opts 
   */
  public getLocation(opts:any = {}): Observable<any> {

    return Observable.create(observer => {

      if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
          (position) => {
            observer.next(position);
            observer.complete();
          },
          (error) => {
            switch (error.code) {
              case 1:
                observer.error("You have rejected access to your location");
                break;
              case 2:
                observer.error("GUnable to determine your location");
                break;
              case 3:
                observer.error("Service timeout has been reached");
                break;
            }
          },
          opts);
      }
      else {
        observer.error("Browser does not support location services");
      }

    });
  }

}
