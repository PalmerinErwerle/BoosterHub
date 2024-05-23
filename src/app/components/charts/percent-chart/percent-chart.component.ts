import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { ChartComponent, ApexNonAxisChartSeries, ApexResponsive, ApexChart, ApexLegend } from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  legend: ApexLegend
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-percent-chart',
  templateUrl: './percent-chart.component.html',
  styleUrls: ['./percent-chart.component.scss']
})
export class PercentChartComponent implements OnInit {

  @Input() mythicEarnings!: number;
  @Input() raidEarnings!: number;
  @Input() legacyEarnings!: number;
  @Input() levelingEarnings!: number;

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;

  ngOnInit() {
    this.chartOptions = {
      series: [this.mythicEarnings, this.raidEarnings, this.legacyEarnings, this.levelingEarnings],
      chart: {
        width: 380,
        type: "pie",
      },
      labels: ["Mythic+", "Raids", "Legacy Raids", "Leveling"],
      legend: {
        position: "bottom"
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
