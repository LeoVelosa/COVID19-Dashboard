import { Component, OnInit, Input } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions';
declare function getKeywords(): any;
declare function getSearches(firebase: any, id: any, name: any, addToName: any, reset: boolean): any;

@Component({
  selector: 'app-elig-dd-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class PubmedDropDownCardComponent implements OnInit {
  public countyTweets = getKeywords();
  county = this.countyTweets[0];
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
