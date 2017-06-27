import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { GeolocationService } from "app/services/geolocation.service";
import { PlacesService } from "app/services/places.service";
declare var google;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  mapLoader: boolean = false;

  constructor(private _geolocationService: GeolocationService, private _placesService: PlacesService) {

  }

  ngOnInit() {
    this.loadMap();
  }

  /**
* set up our map for us here
*/
  private loadMap(): void {
    this.mapLoader = true;
    this._geolocationService.getLocation().subscribe((position) => {


      let mapOptions = {
        center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        zoom: 16,//17,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      //add my location to the mapper
      let loc = this.map.getCenter();
      this.addMarker({ lat: loc.lat(), lng: loc.lng() }, "Me",null, "#ffb500");

      this.mapLoader = false;
      var service = new google.maps.places.PlacesService(this.map);
      service.nearbySearch({
        location: { lat: loc.lat(), lng: loc.lng() },
        // location: { lat: 43.2136281, lng: -74.5003516 },
        radius: 500,
        type: ['restaurant']
      }, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          let places = results.map((place, index) => {
            place.location = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
            if (place.photos) {
              place.photos = place.photos.map(photo => {
                return photo.getUrl({ 'maxWidth': 80, 'maxHeight': 80 });
              });
            }

            //we need markers now 
            this.addMarker(place.location, index, true);

            return place;
          });
          this._placesService.setPlaces(places);



        }
      });


    }, (err) => {
      this.mapLoader = false;
      alert(err);
    });
  }

  /**
   * this is used to add marker to our map instance 
   * and it collects this params 
   * @param position which is used to determine if the marker is to be placed in the current map view port or 
   * the position specified
   * @param icon_colour  which is a string of either 
   */
  private addMarker(position: { lat: number, lng: number }, place_index: string, hover: boolean = false, icon_colour?: string): void {

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: position,
      icon: {
        // anchor: new google.maps.Point(16, 16),
        url: this.customIcon(place_index, icon_colour)
      }
    });

    //add over event 
    if (hover)
      this.addHoverToMaker(marker, place_index);


    // if (marker_information != null) {
    //   let content = marker_information;
    //   this.addInfoWindow(marker, content);
    // }

  }

  /**
     * this is used to retrieve the link for the marker to be placed on the 
     * map
     * @param colour  can either be red, green, blue or yellow or any colour code
     * @param text which is the text to diplay inside our marker
     */
  private customIcon(text: string, colour: string = '#00a5fa') {
    return `data:image/svg+xml;charset=utf-8, 
      <svg width="50px" height="50px" viewBox="0 0 130 153" version="1.1" xmlns="http://www.w3.org/2000/svg">
<g id="#ffb500ff">
<path fill="${colour}" opacity="1.00" d=" M 14.41 0.00 L 115.54 0.00 C 122.93 0.43 129.56 6.22 130.00 13.80 L 130.00 114.20 C 129.56 121.87 122.65 127.77 115.15 127.93 C 105.13 128.09 95.11 127.97 85.09 127.99 C 77.84 136.22 70.92 144.76 63.68 153.00 L 63.30 153.00 C 56.22 144.67 49.13 136.35 42.07 128.00 C 32.69 127.90 23.31 128.21 13.95 127.85 C 6.76 127.36 0.44 121.51 0.00 114.20 L 0.00 13.81 C 0.44 6.25 7.02 0.45 14.41 0.00 Z" />
<text xmlns="http://www.w3.org/2000/svg" id="c" x="50%" y="45%" text-anchor="middle" fill="white" stroke-width="2px" dy=".3em" style="&#10;    font-size: 70px;&#10;font-family: sans-serif;">${text}</text>
</g>
</svg>`
  }


  /**
   * this is used to add the information window to our marker when it's clicked, so users
   * can read about the marker
   * @param marker 
   * @param content 
   */
  private addInfoWindow(marker, content): void {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

  /**
   * 
   * @param marker 
   * @param marker_text this is used to hold on to our marker text, so we can perform hovering on our marker
   */
  addHoverToMaker(marker, marker_text) {
    let owk = this;
    google.maps.event.addListener(marker, 'mouseover', function () {
      this.setIcon(owk.customIcon(marker_text,"#ffb500"));
    });

    google.maps.event.addListener(marker, 'mouseout', function () {
      this.setIcon(owk.customIcon(marker_text));
    });
  }

}
