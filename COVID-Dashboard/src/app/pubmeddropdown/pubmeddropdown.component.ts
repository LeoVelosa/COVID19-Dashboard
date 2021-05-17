/**
 * Drop down component for the pubmed abstracts.
 * Author: Melanie McCord
 * */
import {Component, Input, OnInit} from '@angular/core';
import firebase from 'firebase';

// declare function getSearches(firebase: any, reset: any, keyword: any): any;
declare function getpubmedKeywords(): any;
declare function getSearches(firebase: any, id: any, keyword: any, reset: any): any;
@Component({
  selector: 'app-pubmeddropdown',
  templateUrl: './pubmeddropdown.component.html',
  styleUrls: ['./pubmeddropdown.component.css']
})
export class PubmeddropdownComponent implements OnInit {

  public pubmedKeywords = getpubmedKeywords();
  public key = this.pubmedKeywords[0];
  public displayKey = this.key.replaceAll('+', ' ');
  // keyword = this.pubmedKeywords[0];
  // Cannot use title, unless you want the tooltip to be the same as title
  @Input() titleOfCard!: string;
  /*Gets the function from js.js  MUST BE LIKE THIS*/
  async ngOnInit(): Promise<void> {
    await getSearches(firebase, 'abstracts', this.key, false);
  }
  getSearchByKeyword(): void{
    getSearches(firebase, 'abstracts', this.key, true);
  }

}
function validateInput(input: string) {
  return input;
}

