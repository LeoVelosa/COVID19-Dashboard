/**
 * Drop down component for the pubmed abstracts.
 * Author: Melanie McCord
 * */
import {Component, Input, OnInit} from '@angular/core';
import firebase from 'firebase';

// declare function getSearches(firebase: any, keyword: any): any;
declare function getKeywords(): any;
@Component({
  selector: 'app-pubmeddropdown',
  templateUrl: './pubmeddropdown.component.html',
  styleUrls: ['./pubmeddropdown.component.css']
})
export class PubmeddropdownComponent implements OnInit {

  public keywords = getKeywords();
  keyword = this.keywords[0];
  // Cannot use title, unless you want the tooltip to be the same as title
  @Input() titleOfCard!: string;
  /*Gets the function from js.js  MUST BE LIKE THIS*/
  async ngOnInit(): Promise<void> {
  }
  getSearchByKeyword(): void{
    // getSearches(firebase, this.keyword);
  }

}
function validateInput(input: string) {
  return input;
}

