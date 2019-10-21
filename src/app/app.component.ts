import { Component } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // lineChartData = d3.range(10).map(function (d) { return { "y": d3.randomUniform(1)() } });
  lineChartData = [
    {
      "y": 10,
      "x": "A"
    },
    {
      "y": 20,
      "x": "B"
    },
    {
      "y": 30,
      "x": "C"
    },
    {
      "y": 40,
      "x": "D"
    },
    {
      "y": 50,
      "x": "E"
    }
  ]

  lineChartXAxis = Object.keys(this.lineChartData[0])[1];
  lineChartYAxis = Object.keys(this.lineChartData[0])[0];

  ngOnInit() {
    console.log(JSON.stringify(this.lineChartData));
  }
  
  barChartData = [{ "year": "ab14", "value": 500 },
  { "year": "ab15 h df dsf dsf sdfs ", "value": 0 },
  { "year": "ab16", "value": 300 },
  { "year": "ab17", "value": 400 },
  { "year": "ab18", "value": 100 },
  { "year": "ab19", "value": 50 },
  { "year": "abab", "value": 40 },
  { "year": "ab21", "value": 56 },
  { "year": "ab22", "value": 95 },
  { "year": "ab23", "value": 81 },
  { "year": "ab24", "value": 13 }];
  
  barChartXAxis = Object.keys(this.barChartData[0])[0]
  barChartYAxis = Object.keys(this.barChartData[0])[1]

  pieChartData = [
    { "region": "North", "count": "53245"},
    { "region": "South", "count": "28479"},
    { "region": "East", "count": "19697"},
    { "region": "West", "count": "24037"},
    { "region": "Central", "count": "40245"}
  ]
  scatterPlotData = [
    {var1: 10, var2: 0},
    {var1: 20, var2: 10},
    {var1: 30, var2: 20},
    {var1: 40, var2: 30},
    {var1: 50, var2: 40},
    {var1: 60, var2: 50},
    {var1: 70, var2: 60},
    {var1: 80, var2: 70},
    {var1: 90, var2: 80},
    {var1: 100, var2: 90},
    {var1: 90, var2: 100},
    {var1: 80, var2: 90},
    {var1: 70, var2: 80},
    {var1: 60, var2: 70},
    {var1: 50, var2: 60},
    {var1: 40, var2: 50},
    {var1: 30, var2: 40},
    {var1: 20, var2: 30},
    {var1: 10, var2: 20},
    {var1: 0, var2: 10}
  ];
};
