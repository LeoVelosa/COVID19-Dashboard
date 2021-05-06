import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';

Chart.register(...registerables);
@Component({
  selector: 'app-vaccinedata',
  templateUrl: './vaccinedata.component.html',
  styleUrls: ['./vaccinedata.component.css']
})
export class VaccinedataComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //var ctx = document.getElementById('vaccinedata');
    var myChart = new Chart("myChart", {
      type: 'line',
      data: {
        labels: [
          'covid'
        ],
        datasets: [{
          label: 'PubMed',
          data: [
            '6000'
          ],
          backgroundColor: 'rgba(0,255,0,0.2)',
          fill: true,
          showLine: true,
          pointRadius: 2,
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
