//@LV_OneLess
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';

Chart.register(...registerables);
@Component({
  selector: 'app-vaccinetypedata',
  templateUrl: './vaccinetypedata.component.html',
  styleUrls: ['./vaccinetypedata.component.css']
})
export class VaccinetypedataComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    //var ctx = document.getElementById('vaccinedata');
    var myChart = new Chart("Chart", {
      type: 'bar',
      data: {
        labels: [
          "Pfizer-BioNTech",
          "Moderna",
          "J&J/Janssen",
        ],
        datasets: [{
          label: 'People fully vaccinated by vaccine type in the US',
          data: [
            63506002,
            49889927,
            9552103,
          ],
          //backgroundColor: 'rgba(0,255,0,0.2)',
          
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            
            
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            
            
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
          
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
