import { Component, OnInit, Input } from '@angular/core';
import { IPlace } from "app/interfaces/iplace";
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {
  @Input() place: IPlace;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor() { }

  ngOnInit() {
    this.galleryOptions =
      [{
        image: false,
        height: '100px'
      }, {
        breakpoint: 500,
        width: '100%'
      }];

    this.galleryImages = [
      {
        small: 'assets/img/1-small.jpeg',
        medium: 'assets/img/1-medium.jpeg',
        big: 'assets/img/1-big.jpeg'
      },
      {
        small: 'assets/img/2-small.jpeg',
        medium: 'assets/img/2-medium.jpeg',
        big: 'assets/img/2-big.jpeg'
      },
      {
        small: 'assets/img/3-small.jpeg',
        medium: 'assets/img/3-medium.jpeg',
        big: 'assets/img/3-big.jpeg'
      },
      {
        small: 'assets/img/4-small.jpeg',
        medium: 'assets/img/4-medium.jpeg',
        big: 'assets/img/4-big.jpeg'
      },
      {
        small: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/4-small.jpeg',
        medium: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/4-medium.jpeg',
        big: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/4-big.jpeg'
      }
    ];
  }


}
