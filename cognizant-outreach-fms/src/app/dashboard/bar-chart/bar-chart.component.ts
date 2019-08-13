import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  @Input() barChartLabels;
  @Input() barchartLabel1 : string;
  @Input() barchartData1;
  @Input() barchartLabel2: string;
  @Input() barchartData2;

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  // public barChartLabels = ['Chennai', 'Pune', 'Coimbatore', 'Singapore', 'United Kingdom'];
  public barChartColors: any[] = [
    { backgroundColor: '#3f51b5' },
    { backgroundColor: '#2ec866' },
  ]  
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [];

  constructor() { }

  ngOnInit() {
    this.barChartData = [
      {data: this.barchartData1, label: this.barchartLabel1},
      {data: this.barchartData2, label: this.barchartLabel2}
    ]
  }

}
