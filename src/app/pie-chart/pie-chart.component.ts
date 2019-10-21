import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  @Input('pieChartData') data: Array<{}>
  @Input() selectorDiv: string;
  @Input() chartTitle: string;

  constructor() { }

  ngOnInit() {
    console.log(this.selectorDiv);
    
    const width = document.getElementById(this.selectorDiv).clientWidth;
    const height = document.getElementById(this.selectorDiv).clientHeight - 5;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select("#"+this.selectorDiv)
        .append("svg")
            .attr("width", width)
            .attr("height", height)
        .append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, this.data.length+1 ));

    const pie = d3.pie()
        .value(d => d.count)
        .sort(null);

    const arc = d3.arc()
        .innerRadius(radius-70)
        .outerRadius(radius);

    function arcTween(a) {
        const i = d3.interpolate(this._current, a);
        this._current = i(1);
        return (t) => arc(i(t));
    }
  
    const data = this.data;
        
    const path = svg.selectAll("path")
      .data(pie(data));

    path.transition().duration(200).attrTween("d", arcTween);

    path.enter().append("path")
      .attr("fill", (d, i) => color(i))
      .attr("d", arc)
      .attr("stroke", "white")
      .attr("stroke-width", "6px")
      .each(function(d) { this._current = d; });

    svg.append("text")
    .attr("x", 0)
    .attr("y", 0)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("text-decoration", "underline")
    .text(this.chartTitle);
  }
}
