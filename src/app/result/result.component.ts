import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  template: `
    <ul class="results">
      <li *ngFor="let i of [1,2,3,4,5,6,7]">
        <div class="row">
          <div class="col-xs-3">
            <img src="assets/default-picture.jpg">
          </div>
          <div class="col-xs-9">
            <h1>Ikeja City Mall
              <span class="rating pull-right">
               <span>★</span><span>★</span><span>★</span><span>★</span><span class="not-filled">★</span>
              </span>
            </h1>
            <p>321 East, 62nd street <br> New York, 10022</p>
            <p>
              <span class="text-primary">Distance:</span> 2.4 miles
            <span class="pull-right">
              <button class="fab fab-primary">
                <clr-icon shape="clock" size="24"></clr-icon>
              </button>
              <a href="#" class="curved-btn">More &nbsp; &rarr;</a>
            </span>
            </p>
          </div>
        </div>
      </li>
    </ul>
  `,
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
