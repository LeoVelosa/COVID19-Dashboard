import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { async } from 'rxjs';
/*FOR FRONT END YOU NEED THE FOLLOWING CODE FOR FIREBASE AND MAKE SURE FIREBASE GOES INTO THE GET TWEETS COMMAND*/
/* Gets the function from js.js */
declare function getScrapes(firebase: any): any;

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, AfterViewInit {

  @Input() title!: string;
/*Gets the function from js.js  MUST BE LIKE THIS*/
  async ngOnInit(): Promise<void> {

    /*puts the firebase api into the getTweets function and it returns html which will go to ___ ID*/

   //await getScrapes(firebase);

  }
  async ngAfterViewInit() {
    //await getScrapes(firebase);
  }
}

