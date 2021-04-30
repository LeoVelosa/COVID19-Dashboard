import { Component, OnInit, AfterViewInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions';
declare function getScrapes(firebase: any): any;
@Component({
  selector: 'app-vaccine-page',
  templateUrl: './vaccine-page.component.html',
  styleUrls: ['./vaccine-page.component.css']
})
export class VaccinePageComponent implements OnInit, AfterViewInit{

  ngOnInit(){
    console.log(document.getElementsByTagName("app-tabcard"));
    //window.addEventListener("load", getScrapes(firebase));
  }
  ngAfterViewInit(){
    //window.addEventListener("load", getScrapes(firebase));

  }
  /** Based on the screen size, switch from standard to one column per row */
  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 2,
          sidewayCards: {cols: 1, rows: 1},
          tabCard: {cols: 1, rows: 2},
          regCards: {cols: 1, rows: 1},
          longCards: {cols: 1, rows: 1},
        };
      }
      return {
        columns: 3,
        sidewayCards: {cols: 2, rows: 1},
        tabCard: {cols: 1, rows: 2},
        regCards: {cols: 1, rows: 1},
        longCards: {cols: 1, rows: 2},
      };
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
/*
{ title: 'News Stories', cols: 2, rows: 1 },
{ title: 'Vaccine Differences', cols: 1, rows: 2 },
{ title: 'List of Comorbidities', cols: 1, rows: 1 },
{ title: 'CDC Eligibility Guidelines', cols: 1, rows: 1 },
{ title: 'Eligibility Guidelines', cols: 1, rows: 2},
{ title: 'Vaccine Eligibility', cols: 1, rows: 2},
{ title: 'Vaccine Eligibility comparison by Florida county', cols: 1, rows: 2},
*/