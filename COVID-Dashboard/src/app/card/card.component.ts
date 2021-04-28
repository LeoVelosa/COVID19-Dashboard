import { Component, OnInit, Input } from '@angular/core';
import { async } from 'rxjs';
/*FOR FRONT END YOU NEED THE FOLLOWING CODE FOR FIREBASE AND MAKE SURE FIREBASE GOES INTO THE GET TWEETS COMMAND*/
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions';
/* Gets the function from js.js */
declare function getAllTweets(firebase: any): any;
declare function getTweets(firebase: any): any;

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() title!: string;
/*Gets the function from js.js  MUST BE LIKE THIS*/
  async ngOnInit(): Promise<void> {

    /*puts the firebase api into the getTweets function and it returns html which will go to ___ ID*/

   await getAllTweets(firebase);

  }
}
function validateInput(input: string) {
  return input;
}
