import { Component, OnInit, Input } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions';
declare function getCountyNames(): any;
declare function getTweets(firebase: any, id: any, name: any, addToName: any): any;
declare function getNumOfTweets(firebase: any, id: any, name: any, addToName: any): any;
@Component({
  selector: 'app-elig-dd-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class EligibilityDropDownCardComponent implements OnInit {
  public countyTweets = getCountyNames();
  county = ' ';
  @Input() title!: string;
/*Gets the function from js.js  MUST BE LIKE THIS*/
  async ngOnInit(): Promise<void> {
  }
  getTweetByCounty(): void{
    getTweets(firebase, 'test2', this.county , 'Eligibility');
  }
  getNumOfTweets(name: string): any{
  }

}
function validateInput(input: string) {
  return input;
}
