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
          "1/13/2021",
          "1/14/2021",
          "1/15/2021",
          "1/16/2021",
          "1/17/2021",
          "1/18/2021",
          "1/19/2021",
          "1/20/2021",
          "1/21/2021",
          "1/22/2021",
          "1/23/2021",
          "1/24/2021",
          "1/25/2021",
          "1/26/2021",
          "1/27/2021",
          "1/28/2021",
          "1/29/2021",
          "1/30/2021",
          "1/31/2021",
          "2/1/2021",
          "2/2/2021",
          "2/3/2021",
          "2/4/2021",
          "2/5/2021",
          "2/6/2021",
          "2/7/2021",
          "2/8/2021",
          "2/9/2021",
          "2/10/2021",
          "2/11/2021",
          "2/12/2021",
          "2/13/2021",
          "2/14/2021",
          "2/15/2021",
          "2/16/2021",
          "2/17/2021",
          "2/18/2021",
          "2/19/2021",
          "2/20/2021",
          "2/21/2021",
          "2/22/2021",
          "2/23/2021",
          "2/24/2021",
          "2/25/2021",
          "2/26/2021",
          "2/27/2021",
          "2/28/2021",
          "3/1/2021",
          "3/2/2021",
          "3/3/2021",
          "3/4/2021",
          "3/5/2021",
          "3/6/2021",
          "3/7/2021",
          "3/8/2021",
          "3/9/2021",
          "3/10/2021",
          "3/11/2021",
          "3/12/2021",
          "3/13/2021",
          "3/14/2021",
          "3/15/2021",
          "3/16/2021",
          "3/17/2021",
          "3/18/2021",
          "3/19/2021",
          "3/20/2021",
          "3/21/2021",
          "3/22/2021",
          "3/23/2021",
          "3/24/2021",
          "3/25/2021",
          "3/26/2021",
          "3/27/2021",
          "3/28/2021",
          "3/29/2021",
          "3/30/2021",
          "3/31/2021",
          "4/1/2021",
          "4/2/2021",
          "4/3/2021",
          "4/4/2021",
          "4/5/2021",
          "4/6/2021",
          "4/7/2021",
          "4/8/2021",
          "4/9/2021",
          "4/10/2021",
          "4/11/2021",
          "4/12/2021",
          "4/13/2021",
          "4/14/2021",
          "4/15/2021",
          "4/16/2021",
          "4/17/2021",
          "4/18/2021",
          "4/19/2021",
          "4/20/2021",
          "4/21/2021",
          "4/22/2021",
          "4/23/2021",
          "4/24/2021",
          "4/25/2021",
          "4/26/2021",
          "4/27/2021",
          "4/28/2021",
          "4/29/2021",
          "4/30/2021",
          "5/1/2021",
          "5/2/2021",
          "5/3/2021",
          "5/4/2021",
          "5/5/2021",
        ],
        datasets: [{
          label: 'People Vaccinated in the United States',
          data: [
            7398897,
            8015434,
            9690757,
            10595866,
            0,
            0,
            0,
            13595803,
            14270441,
            15053257,
            16243093,
            17390345,
            18502131,
            19252279,
            19902237,
            20687970,
            21698606,
            22858318,
            24064165,
            25201143,
            26023153,
            26440836,
            27154956,
            27905197,
            28909497,
            30250964,
            31579100,
            32340146,
            32867213,
            33783384,
            34723964,
            35834855,
            37056122,
            38292270,
            0,
            39670551,
            40268009,
            41021049,
            41977401,
            42809595,
            43628092,
            44138118,
            44544969,
            45237143,
            46074392,
            47184199,
            48435536,
            49772180,
            50732997,
            51755447,
            52855579,
            54035670,
            55547697,
            57358849,
            58873710,
            60005231,
            61088527,
            62451150,
            64071674,
            65965305,
            68884011,
            69784210,
            71054445,
            72135616,
            73669956,
            75495716,
            77230061,
            79367225,
            81415769,
            82772416,
            83930495,
            85472166,
            87343622,
            89559225,
            91707729,
            93631163,
            95015762,
            96044046,
            97593290,
            99565311,
            101804762,
            104213478,
            106214924,
            107515428,
            108301234,
            109995734,
            112046611,
            114436039,
            117142879,
            119242902,
            120848490,
            122295530,
            123917385,
            125822868,
            127743096,
            129494179,
            131247546,
            132321628,
            133266995,
            134445595,
            135791031,
            137234889,
            138644724,
            139978480,
            140969663,
            141751857,
            142692987,
            143793565,
            144894586,
            146239208,
            147047012,
            147517734,
            147894671,
            148562891,
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
