import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  @Input() chartLabel;
  @Input() chartData;
  // public pieChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  // public pieChartData = [120, 150, 180, 90];
  // private pieChartColors = [ { backgroundColor: [ '#c800a1', '#5c068c', '#00b140', '#0033a0','#ff8f1c']}];   
  private pieChartColors = [ { backgroundColor: ['#F25022', '#7FBA00', '#00A4EF','#FFB900', '#C800A1']}];   
  public pieChartType = 'pie';
  
  constructor() { }

  ngOnInit() {
  }

}
