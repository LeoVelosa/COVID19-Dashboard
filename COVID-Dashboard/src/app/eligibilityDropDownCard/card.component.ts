/* @JM_OneLess And @LV_OneLess (I used his card file and reformatted it to make a specific card so I want to give him credit)  */
/* This file interacts with every other file in eligibilityDropDownCard. Aside from that, it uses functions from FirebaseTweetsToHTML.js in the file COVID-Dashboard/src/javaStuff  */
import { Component, OnInit, Input } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions';
declare function getCountyNames(): any;
declare function getTweets(firebase: any, id: any, name: any, addToName: any, reset: boolean): any;

@Component({
  selector: 'app-elig-dd-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class EligibilityDropDownCardComponent implements OnInit {
  public countyTweets = getCountyNames();
  county = this.countyTweets[0].name;
  //Cannot use title, unless you want the tooltip to be the same as title
  @Input() titleOfCard!: string;
/*Gets the function from js.js  MUST BE LIKE THIS*/
  async ngOnInit(): Promise<void> {
  }
  getTweetByCounty(): void{
    getTweets(firebase, 'test2', this.county , 'Eligibility', true);
  }

}
function validateInput(input: string) {
  return input;
}
