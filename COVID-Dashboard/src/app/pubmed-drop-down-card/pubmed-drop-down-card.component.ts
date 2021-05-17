/**
 * Creates the drop down card for pubmed abstracts.
 * @author Melanie McCord
 * */
import { Component, OnInit, Input } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions';
declare function getpubmedKeywords(): any;
declare function getSearches(firebase: any, search_query: any): any;

@Component({
  selector: 'app-elig-dd-card',
  templateUrl: './pubmed-drop-down-card.component.html',
  styleUrls: ['./pubmed-drop-down-card.component.css']
})

export class PubmedDropDownCardComponent implements OnInit {
  public pubmedKeywords = getpubmedKeywords();
  keyword = this.pubmedKeywords[0];
  // Cannot use title, unless you want the tooltip to be the same as title
  @Input() titleOfCard!: string;
  /*Gets the function from js.js  MUST BE LIKE THIS*/
  async ngOnInit(): Promise<void> {
  }
  getSearchByKeyword(): void{
    getSearches(firebase, this.keyword);
  }

}
function validateInput(input: string) {
  return input;
}
