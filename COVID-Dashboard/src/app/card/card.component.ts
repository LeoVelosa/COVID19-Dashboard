import { Component, OnInit, Input } from '@angular/core';
import { async } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions';
/* Gets the function from js.js */
declare function getAllTweets(): any;
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() title!: string;

  ngOnInit(): void {
    getAllTweets();
    }
}
function validateInput(input: string) {
  return input;
}
