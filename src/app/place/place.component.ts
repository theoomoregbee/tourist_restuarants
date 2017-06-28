import { Component, OnInit, Input } from '@angular/core';
import { IPlace } from "app/interfaces/iplace";

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {
  @Input() place: IPlace;
  constructor() { }

  ngOnInit() { 
  }
 

}
