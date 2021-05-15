/**
 * @JM_OneLess This is modified code from Card (Leo made that).
 * I made Modifications as this card needed a drop down, and
 * long story short, for formatting, making a new card was the
 *  best way to go. This card is for Vaccine Avalibility Information
 *  in Florida.
 */

import { Component, OnInit, Input } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions';
declare function getCountyNames(): any;
declare function getTweets(firebase: any, id: any, name: any, addToName: any, reset: boolean): any;

@Component({
  selector: 'app-aval-dd-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class AvalibilityDropDownCardComponent implements OnInit {
  public countyTweets = getCountyNames();
  county = this.countyTweets[0].name;
  //Cannot use title, unless you want the tooltip to be the same as title
  @Input() titleOfCard!: string;
/*Gets the function from js.js  MUST BE LIKE THIS*/
  async ngOnInit(): Promise<void> {
  }
  getTweetByCounty(): void{
    getTweets(firebase, 'test', this.county , 'Availability', true);
  }


}
function validateInput(input: string) {
  return input;
}
