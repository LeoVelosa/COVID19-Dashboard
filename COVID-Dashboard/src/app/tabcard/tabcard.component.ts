import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions';
declare function getScrapes(firebase: any): any;
@Component({
  selector: 'app-tabcard',
  templateUrl: './tabcard.component.html',
  styleUrls: ['./tabcard.component.css']
})
export class TabcardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log(document);
    getScrapes(firebase);
  }

}
