// Needs firebase functions to work
// This is where you put in your javascript files in
// to put your firebase firestore data into html
import { Component, OnInit, Input } from '@angular/core';
/*FOR FRONT END YOU NEED THE FOLLOWING CODE FOR FIREBASE AND MAKE SURE FIREBASE GOES INTO THE GET TWEETS COMMAND*/

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() titleOfCard!: string;
  @Input() updatedAt!: string;
  /*Gets the function from js.js  MUST BE LIKE THIS*/
  ngOnInit(){

  }
}
