import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.scss']
})
export class RadarChartComponent implements OnInit {
  @Input() labe1: string;
  @Input() label2: string
  public radarChartLabels = ['Week1', 'Week2', 'Week3', 'Week4'];
  public radarChartData = [
    {data: [1], label: 'Chennai'},
    {data: [1], label: 'Bangalore'}
  ];
  public radarChartType = 'radar';
  
  constructor() { }

  ngOnInit() {
  }

}
