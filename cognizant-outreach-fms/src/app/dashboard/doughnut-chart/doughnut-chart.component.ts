import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutChartComponent implements OnInit {
  @Input() chartLabel;
  @Input()  chartData;
  // public doughnutChartLabels = ['EA', 'EM', 'MA', 'MS', 'SW'];
  // public doughnutChartData = [200, 150, 100 , 50, 10];
  public doughnutChartType = 'doughnut';
  private donutColors = [ { backgroundColor: [ '#FF69B4', '#2ec866', '#9400D3', '#00bfff','#FF0000' ]}]; 

  constructor() { }

  ngOnInit() {
    
  }
}
