import { Component, OnInit, Input } from '@angular/core';

import * as d3 from "d3";

@Component({
  selector: 'app-scatter-plot',
  templateUrl: './scatter-plot.component.html',
  styleUrls: ['./scatter-plot.component.css']
})
export class ScatterPlotComponent implements OnInit {

  @Input() selectorDiv: string;
  @Input('scatterPlotData') dataset: Array<{}>
  @Input() xAxisLabel: string;
  @Input() yAxisLabel: string;
  @Input() dotColor: string;
  @Input() chartTitle: string;
  constructor() { }

  ngOnInit() {
    var margin = { top: 40, right: 30, bottom: 30, left: 50 }
    var width = document.getElementById(this.selectorDiv).clientWidth - margin.left - margin.right - 10;
    var height = document.getElementById(this.selectorDiv).clientHeight - margin.top - margin.bottom -10;
    var padding = 100;
    
    var xScale = d3.scaleLinear()
      .domain([0, d3.max(this.dataset, function (d) {
        return d[Object.keys(d)[0]]; 
      })])
    .range([padding, width - padding])
      // .range([0, width]);

    var yScale = d3.scaleLinear()
      .domain([0, d3.max(this.dataset, function (d) {
        return d[Object.keys(d)[1]];
      })])
      .range([height - padding, padding]);
      // .range([height, 0]);

    var xAxis = d3.axisBottom().scale(xScale).ticks(5);

    var yAxis = d3.axisLeft().scale(yScale).ticks(5);

    var svg = d3.select("#"+this.selectorDiv)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");;

    svg.selectAll("circle")
      .data(this.dataset)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return xScale(d[Object.keys(d)[0]]);
      })
      .attr("cy", function (d) {
        return height - yScale(d[Object.keys(d)[1]]);
      })
      .attr("r", 5)
      .attr("fill", this.dotColor);

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform","translate(0,"+ ( height - padding ) + ")")
      // .attr("transform", "translate(0," +height+")")
      .call(xAxis)
      .append("text")
      .style("text-anchor", "middle")
      .attr("transform","translate(" + (width/2) +  "," + ( 100 - (padding/3))+")")
      // .attr("x", width)
      // .attr("y", "-10px")
      // .attr("dx", "1em")
      // .style("text-anchor", "end")
      .style("fill", "red")
      .text(this.xAxisLabel);;

    svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate("+padding+",0)")
      // .attr("transform", "translate(0)")
      .call(yAxis)
      .append("text")
      .attr("transform","translate("+ ( -padding/2) +","+(height/2)+")rotate(-90)")
      // .attr("transform", "rotate(-90)")
      // .attr("y", 6)
      // .attr("dy", ".71em")
      .style("text-anchor", "middle")
      .style("fill", "red")
      .text(this.yAxisLabel);

      svg.append("text")
      .attr("x", (width / 2))
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("text-decoration", "underline")
      .text(this.chartTitle);

  }

}
