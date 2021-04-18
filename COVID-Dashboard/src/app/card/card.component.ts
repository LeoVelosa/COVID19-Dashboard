import { Component, OnInit, Input } from '@angular/core';
import { async } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions';
declare function getTweets(firebase: any): any;

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() title!: string;

  ngOnInit(): void {
    getTweets(firebase);
  }
}
function validateInput(input: string) {
  return input;
}
