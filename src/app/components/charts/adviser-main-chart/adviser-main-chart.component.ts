import { Component, Input, OnInit, ViewChild } from "@angular/core";
import {ApexChart, ApexAxisChartSeries, ChartComponent, ApexDataLabels, ApexPlotOptions, ApexYAxis, ApexLegend, ApexGrid } from "ng-apexcharts";

type ApexXAxis = {
  type?: "category" | "datetime" | "numeric";
  categories?: any;
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
    };
  };
};

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
};

@Component({
  selector: 'app-adviser-main-chart',
  templateUrl: './adviser-main-chart.component.html',
  styleUrls: ['./adviser-main-chart.component.scss']
})
export class AdviserMainChartComponent implements OnInit {

  @Input() mythicEarnings!: number;
  @Input() raidEarnings!: number;
  @Input() legacyEarnings!: number;
  @Input() levelingEarnings!: number;

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;

  ngOnInit() {
    this.chartOptions = {
      series: [
        {
          name: "Gold earned",
          data: [this.mythicEarnings, this.raidEarnings, this.legacyEarnings, this.levelingEarnings]
        }
      ],
      chart: {
        height: 360,
        type: "bar",
        events: {
          click: function(chart, w, e) {
          }
        }
      },
      colors: [
        "#00985B",
        "#00985B",
        "#00985B",
        "#00985B"
      ],
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      xaxis: {
        categories: [
          ["Mythic+"],
          ["Raids"],
          ["Legacy Raids"],
          ["Leveling"]
        ],
        labels: {
          style: {
            colors: [
              "#00985B",
              "#00985B",
              "#00985B",
              "#00985B"
            ],
            fontSize: "16px"
          }
        }
      }
    };
  }

}
