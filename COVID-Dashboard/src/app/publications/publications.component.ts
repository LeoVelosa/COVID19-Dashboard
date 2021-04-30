import { Component, OnInit} from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
/*FOR FRONT END YOU NEED THE FOLLOWING CODE FOR FIREBASE AND MAKE SURE FIREBASE GOES INTO THE GET TWEETS COMMAND*/
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions';
/* Gets the function from js.js */
declare function initializeFirebase(firebase: any): any;

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */
  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 2,
          Abstracts: {cols: 2, rows: 2},
          Visualization: {cols: 2, rows: 2}
        };
      }
      return {
        columns: 2,
        Abstracts: {cols: 1, rows: 2},
        Visualization: {cols: 1, rows: 2}
      };
    })
  );

  async ngOnInit(): Promise<void> {

    /*puts the firebase api into the getTweets function and it returns html which will go to ___ ID*/
    await initializeFirebase(firebase);
  }

  constructor(private breakpointObserver: BreakpointObserver) {}
}
