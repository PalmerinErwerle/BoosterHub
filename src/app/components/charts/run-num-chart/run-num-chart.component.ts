import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";

import { ApexNonAxisChartSeries, ApexResponsive, ApexChart, ApexTheme, ApexTitleSubtitle, ApexFill, ApexStroke, ApexYAxis, ApexLegend, ApexPlotOptions } from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  theme: ApexTheme;
  title: ApexTitleSubtitle;
  fill: ApexFill,
  yaxis: ApexYAxis,
  stroke: ApexStroke,
  legend: ApexLegend,
  plotOptions: ApexPlotOptions
};

@Component({
  selector: 'app-run-num-chart',
  templateUrl: './run-num-chart.component.html',
  styleUrls: ['./run-num-chart.component.scss']
})
export class RunNumChartComponent implements OnInit {

  @Input() mythicNum!: number;
  @Input() raidNum!: number;
  @Input() legacyNum!: number;
  @Input() levelingNum!: number;

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;

  ngOnInit() {
    this.chartOptions = {
      series: [this.mythicNum, this.raidNum, this.legacyNum, this.levelingNum],
        chart: {
          width: 380,
          type: 'polarArea'
        },
        labels: ["Mythic+", "Raids", "Legacy Raids", "Leveling"],
        fill: {
          opacity: 1
        },
        stroke: {
          width: 1,
          colors: undefined
        },
        yaxis: {
          show: false
        },
        legend: {
          position: 'bottom'
        },
        plotOptions: {
          polarArea: {
            rings: {
              strokeWidth: 0
            }
          }
        },
        theme: {
          monochrome: {
            //    enabled: true,
            shadeTo: 'light',
            shadeIntensity: 0.6
          }
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 300
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
    };
  }

}
