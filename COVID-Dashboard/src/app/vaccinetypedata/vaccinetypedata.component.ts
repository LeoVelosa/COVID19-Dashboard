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
    //Grabs chart using "Chart" id.
    var myChart = new Chart("Chart", {
      //Makes chart a bar graph
      type: 'bar',
      //Sets labels of each bar to the vaccine name
      data: {
        labels: [
          "Pfizer-BioNTech",
          "Moderna",
          "J&J/Janssen",
        ],
        datasets: [{
          //Sets label for data at top
          label: 'People fully vaccinated by vaccine type in the US',
          //Sets data for each vaccine
          data: [
            63506002,
            49889927,
            9552103,
          ],
          
          //Sets color for each graph
          backgroundColor: [
            //pinkish red
            'rgba(255, 99, 132, 0.2)',
            //light blue
            'rgba(54, 162, 235, 0.2)',
            //purple
            'rgba(153, 102, 255, 0.2)',
          ],
          //Sets color for border of bar
          borderColor: [
            //pinkish red
            'rgba(255, 99, 132, 1)',
            //light blue
            'rgba(54, 162, 235, 1)',
            //purple
            'rgba(153, 102, 255, 1)',
          ],
          //Sets border width
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
