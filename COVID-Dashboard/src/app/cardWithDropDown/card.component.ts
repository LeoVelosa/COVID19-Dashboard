import { Component, OnInit, Input } from '@angular/core';
/* Gets the function from js.js */
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions';
declare function getCountyTweets(firebase: any, id: any, addToName: any): any;

@Component({
  selector: 'app-drop-down-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardWithDropDownComponent implements OnInit {
  public countyTweets = getCountyTweets(firebase, 'test', 'Eligibility');
  @Input() title!: string;
/*Gets the function from js.js  MUST BE LIKE THIS*/
  async ngOnInit(): Promise<void> {
  }

}
function validateInput(input: string) {
  return input;
}
