import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
import firebase from 'firebase/app';
Chart.register(...registerables);


@Component({
  selector: 'app-pubmeddata',
  templateUrl: './pubmeddata.component.html',
  styleUrls: ['./pubmeddata.component.css']
})

export class PubmeddataComponent implements OnInit {

  constructor() { }

   ngOnInit(): void{
    // var ctx = document.getElementById('vaccinedata');

    const pubmedChart = new Chart('pubmedChart', {
      type: 'bar',
      data: {
        labels: [
          'covid'
        ],
        datasets: [{
          label: 'Papers Published On Covid By Keyword',
          data: ['33932943'],
          backgroundColor: 'rgba(0,255,0,0.2)',
          borderWidth: 2,
          /*
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
          */
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

}
