import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  template: `
        <span class="rating" *ngIf="rating != -1">
               <span *ngFor="let rate of rating_stars"> 
                <small *ngIf="ceil(rating) >= rate">★</small>
               </span>
               <span *ngFor="let no_rate of rating_stars"  class="not-filled">
                <small *ngIf="ceil(rating) < no_rate">★</small>
               </span> 
        <span>
        <span class="rating" *ngIf="!rating">No rating</span>
  `,
  styles: [
    `
.rating {
  color: #00A5FA;
  font-size: 12px;
}

.rating .not-filled{
color: rgba(224, 222, 222, 0.44);
  }
  `]
})
export class RatingComponent implements OnInit {
  rating_stars: number[] = [1, 2, 3, 4, 5];
  @Input() rating: number;//means no rating

  constructor() { }

  ngOnInit() {
  }

  ceil(x: number) {
    return Math.ceil(x);
  }

}
