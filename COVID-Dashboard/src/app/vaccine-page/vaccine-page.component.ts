//@LV_OneLess && @JM_OneLess
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions';
declare function getTweets(firebase: any, id: any, name: any, addToName: any, reset: boolean): any;
declare function getNewsNames(): any;
@Component({
  selector: 'app-vaccine-page',
  templateUrl: './vaccine-page.component.html',
  styleUrls: ['./vaccine-page.component.css']
})
export class VaccinePageComponent implements OnInit{
  /** Based on the screen size, switch from standard to one column per row */
 public newsNames = getNewsNames();
 //Creates variable that holds whether site is in handset mode or not
  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      //if in handset mode set columns and rows to these values
      if (matches) {
        return {
          columns: 2,
          sidewayCards: {cols: 1, rows: 1},
          tabCard: {cols: 1, rows: 2},
          regCards: {cols: 1, rows: 1},
          longCards: {cols: 1, rows: 1},
        };
      }
      //if not in handset mode set columns and rows to these values
      return {
        columns: 3,
        sidewayCards: {cols: 2, rows: 1},
        tabCard: {cols: 1, rows: 2},
        regCards: {cols: 1, rows: 1},
        longCards: {cols: 1, rows: 2},
      };
    })
  );
  ngOnInit(): void {
    getTweets(firebase, 'test', 'AlachuaCounty' , 'Availability', true);
    getTweets(firebase, 'test2', 'AlachuaCounty' , 'Eligibility', true);
    getTweets(firebase, 'test3', this.newsNames[0] , 'News', false);
    getTweets(firebase, 'test3', this.newsNames[1] , 'News', false);
    getTweets(firebase, 'test3', this.newsNames[2] , 'News', false);
  }
  constructor(private breakpointObserver: BreakpointObserver) {}
}
