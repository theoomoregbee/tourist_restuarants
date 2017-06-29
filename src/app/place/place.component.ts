import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { IPlace } from "app/interfaces/iplace";
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { Observable } from "rxjs/Observable";
import { IReview } from "app/interfaces/ireview";
import { ReviewService } from "app/services/review.service";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";

interface IMessage {
  message: string;
  type: 'danger' | 'success'
}

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {
  @Input() place: any;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  ourReviews: IReview[] = [];

  constructor(private _reviewService: ReviewService, private fb: FormBuilder, private _changeDetector: ChangeDetectorRef) {
    this.createForm();
  }

  ngOnInit() {
    this._reviewService.fetch(this.place.place_id)
      .subscribe((reviews: IReview[]) => { 
        this.ourReviews = reviews; 
        this._changeDetector.detectChanges();//update the view since our zone is faulty
      });

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



  /**
     * New User component
     * 
     * 
     */
  openAddNew: boolean = false;//modal toggle for new branch
  addForm: FormGroup;
  addLoader: boolean = false;
  alert: IMessage
  alert_closed: boolean = true;
  appLevelAlert: boolean = false;

  /**
       * create our form for us 
       */
  private createForm(): void {
    this.addForm = this.fb.group({
      names: ['', Validators.required],
      review: ['', Validators.required],
      rating: ['', [Validators.required, Validators.max(5), Validators.min(1)]]
    });
  }



  /**
  * this is used to create new user
  */
  addReview() {
    this.addLoader = true;
    let param: any = this.addForm.value;
    param.placeID = this.place.place_id;// for this place we are inserting the new record for
    this._reviewService.add(param)
      .subscribe((review: IReview) => {
        this._pushAlert({ message: `'${review.names}' Added`, type: 'success' });
        this.ourReviews.push(review);//add it to our reviews here 
        this.addLoader = false;
        this.addForm.reset();
      }, (error) => {
        this.addLoader = false;
        this._pushAlert({ message: error.message, type: 'danger' }, true);
      });
  }

  /**
     * this simply just open our alert for us
     * @param message 
     */
  private _pushAlert(message: IMessage, appLevel: boolean = false): void {
    this.alert = message;
    this.alert_closed = false;
    this.appLevelAlert = appLevel;
  }

}
