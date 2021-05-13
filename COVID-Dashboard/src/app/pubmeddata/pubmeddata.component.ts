import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
import firebase from 'firebase/app';
Chart.register(...registerables);
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import 'firebase/firestore';
import 'firebase/functions';
/* Gets the function from js.js */
// tslint:disable-next-line:unified-signatures
declare function createChartVisualization(firebase: any, Chart: any): any;

@Component({
  selector: 'app-pubmeddata',
  templateUrl: './pubmeddata.component.html',
  styleUrls: ['./pubmeddata.component.css']
})
export class PubmeddataComponent implements OnInit {

  constructor() {
  }

  async ngOnInit(): Promise<void> {
    // tslint:disable-next-line:prefer-const
    var ctx = document.getElementById('pubmedChart');
    await createChartVisualization(firebase, Chart);
    // tslint:disable-next-line:variable-name


  }
}
