import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class LineChartComponent implements OnInit {
  @Input('lineChartData') dataset: Array<{}>;
  @Input() lineColor: string;
  @Input() xAxisLabel: string;
  @Input() yAxisLabel: string;
  @Input() xAxisColumn: string;
  @Input() yAxisColumn: string;
  @Input() selectorDiv: string;
  @Input() chartTitle: string;

  constructor() { }

  ngOnInit() {
    var margin = { top: 50, right: 50, bottom: 50, left: 50 },
      width = document.getElementById(this.selectorDiv).clientWidth - margin.left - margin.right - 10,
      height = document.getElementById(this.selectorDiv).clientHeight - margin.top - margin.bottom - 10,
      padding = 100;

    var xScale = d3.scaleBand()
    .range([padding, width - padding])
      // .range([0, width])
      .domain(this.dataset.map(d => {
        return d[this.xAxisColumn]
      }));
      
    var yRangeArray = this.dataset.map(d => {
      return d[this.yAxisColumn];
    })
    var yScale = d3.scaleLinear()
      .domain([
        Math.min(...yRangeArray), Math.max(...yRangeArray)
      ]) 
      .range([height - padding, padding]);
      // .range([height, 0]); 

    var xAxisColumn = this.xAxisColumn;
    var yAxisColumn = this.yAxisColumn;
    var line = d3.line()
      .x(function (d, i) {
        return xScale(d[xAxisColumn]); 
      })
      .y(function (d) { 
        return yScale(d[yAxisColumn]); 
      })
      .curve(d3.curveMonotoneX)

    var svg = d3.select("#lineChart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform","translate(0,"+ ( height - padding ) + ")")
      // .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale))
      .append("text")
      .style("text-anchor", "middle")
      .attr("transform","translate(" + (width/2) +  "," + ( 100 - (padding/3))+")")
      // .attr("x", (width))
      // .attr("y", "-10px")
      // .attr("dx", "1em")
      // .style("text-anchor", "end")
      .style("fill", "gray")
      .text(this.xAxisLabel);
      
    svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate("+padding+",0)")
      .call(d3.axisLeft(yScale))
      .append("text")
      .attr("transform","translate("+ ( -padding/2) +","+(height/2)+")rotate(-90)")
      // .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .style("fill", "gray")
      .text(this.yAxisLabel);

    svg.append("path")
      .datum(this.dataset)
      .attr("class", "line")
      .attr("d", line)
      .style("stroke", this.lineColor)
      .transition()

    svg.append("text")
      .attr("x", (width / 2))
      .attr("y", 0 - (margin.top / 2))
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("text-decoration", "underline")
      .text(this.chartTitle);
      
    svg.selectAll(".dot")
      .data(this.dataset)
      .enter().append("circle")
      .attr("class", "dot") 
      .attr("cx", function (d, i) { return xScale(d[xAxisColumn]) })
      .attr("cy", function (d) { return yScale(d[yAxisColumn]) })
      .attr("r", 5)
      .style("fill", this.lineColor)
      .on("mouseover", function (a) {
        console.log(a)
      })
      .on("mouseout", function () { })
  }

}
