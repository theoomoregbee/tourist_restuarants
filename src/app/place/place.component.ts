import { Component, OnInit, Input } from '@angular/core';
import { IPlace } from "app/interfaces/iplace";
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { Observable } from "rxjs/Observable";
import { IReview } from "app/interfaces/ireview";
import { ReviewService } from "app/services/review.service";

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {
  @Input() place: any;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  opened: boolean = false;//modal for adding review
  ourReviews: Observable<IReview[]>;

  constructor(private _reviewService: ReviewService) { }

  ngOnInit() {
    this.ourReviews = this._reviewService.fetch(this.place.place_id);

    this.galleryOptions =
      [{
        image: false,
        height: '100px',
        width: '100%'
      }, {
        breakpoint: 500,
        width: '100%'
      }];

    this.galleryImages = [];

    if (this.place.photos)
      for (let photo of this.place.photos) {
        this.galleryImages.push({
          small: photo.getUrl({ maxWidth: 200, maxHeight: 133 }),
          medium: photo.getUrl({ maxWidth: 600, maxHeight: 400 }),
          big: photo.getUrl({ maxWidth: 1200, maxHeight: 800 })
        });
      }
  }




}
