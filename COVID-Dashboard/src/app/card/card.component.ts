import { Component, OnInit, Input } from '@angular/core';
import { async } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() title!: string;
  
  ngOnInit(): void {

  }
}
function validateInput(input: string) {
  return input;
}
