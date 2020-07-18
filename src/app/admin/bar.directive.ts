import { Directive, ElementRef, Input } from '@angular/core';
import * as d3 from 'd3';
import { DataPoint } from '../shared/types';

@Directive({
  selector: '[appBar]'
})
export class BarDirective {
  @Input() dataSource: DataPoint[];
  @Input() width: number;
  @Input() height: number;

  private margin = { top: 20, right: 20, bottom: 30, left: 40 };
  get barWidth(): number { return this.width - this.margin.left - this.margin.right; }
  get barHeight(): number { return this.height - this.margin.top - this.margin.bottom; }
  // group containers (X axis, Y axis and bars)
  private gx: any; private gy: any; private bars: any;
  // Scales and Axis
  private xAxis: any;  private xScale: any;  private yAxis: any;  private yScale: any;
  // Drawing containers
  private svg: any;  private mainContainer: any;
  // Labels
  private labels: any; 

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.svg = d3.select('#bar').select('svg');
    this.xScale = d3.scaleBand();
    this.yScale = d3.scaleLinear();
    this.setSVGDimensions();
    this.mainContainer = this.svg.append('g').attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
    this.gy = this.mainContainer.append('g').attr('class', 'axis axis--y');
    this.gx = this.mainContainer.append('g').attr('class', 'axis axis--x');
    this.draw();
  }

  private resize() {
    this.setSVGDimensions();
    this.setAxisScales();
    this.repaint();
  }

  private repaint() {
    this.drawAxis();
    this.drawBars();
    this.drawLabels();
  }

  private drawBars() {
    this.bars = this.mainContainer.selectAll('.bar')
      .remove().exit()
      .data(this.dataSource).enter().append('rect');

    this.bars
      .attr('x', d => this.xScale(d.name))
      .attr('y', d => this.yScale(d.value))
      .attr('width', this.xScale.bandwidth())
      .attr('height', d =>  this.yScale(0) - this.yScale(d.value));
  }

  private drawAxis() {
    this.gy.attr('transform', `translate(0, 0)`).call(this.yAxis);
    this.gx.attr('transform', `translate(0, ${this.yScale(0)})`).call(this.xAxis);
  }

  private setSVGDimensions() {
    this.svg.style('width', this.width).style('height', this.height);
  }

  private setAxisScales() {
    this.xScale = d3.scaleBand();
    this.yScale = d3.scaleLinear();

    this.xScale
      .rangeRound([0, this.barWidth]).padding(.5)
      .domain(this.dataSource.map(d => d.name));
    this.yScale
      .range([this.barHeight, 0])
      .domain([0, Math.max(...this.dataSource.map(x => x.value))]);
    this.xAxis = d3.axisBottom(this.xScale);
    this.yAxis = d3.axisLeft(this.yScale);
  }

  private drawLabels() {
    this.labels = this.mainContainer.selectAll('.label')
      .remove().exit()
      .data(this.dataSource)
      .enter().append('text').attr('class', 'label')
      .attr('x', d => this.xScale(d.name))
      .attr('y', d => this.yScale(d.value) - 5)
      .text(d => Math.floor(d.value));
  }

  private draw() {
    this.setAxisScales();
    this.drawAxis();
    this.drawBars();
    this.drawLabels();
  }
}
