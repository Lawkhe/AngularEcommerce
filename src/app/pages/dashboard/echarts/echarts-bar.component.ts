import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { DashboardService } from '../../../services/dashboard.service';

@Component({
  selector: 'ngx-echarts-bar',
  template: `
    <div id="bar" echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsBarComponent implements AfterViewInit, OnDestroy {

  data_graph = {
    'names': [],
    'values': [],
  };

  options: any = {};
  themeSubscription: any;

  constructor(
    private theme: NbThemeService,
    private dashboardService:DashboardService
  ) {

  }

  ngAfterViewInit() {

    this.dashboardService.getTopUsers().subscribe(
      response => {
        let data = response;

        data.forEach((value, key) => {
            this.data_graph['names'].push(value['user']['name']);
            this.data_graph['values'].push(value['totalPurchases']);
        });

        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

          const colors: any = config.variables;
          const echarts: any = config.variables.echarts;

          this.options = {
            backgroundColor: echarts.bg,
            color: [colors.primaryLight],
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow',
              },
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true,
            },
            xAxis: [
              {
                type: 'category',
                data: this.data_graph['names'],
                axisTick: {
                  alignWithLabel: true,
                },
                axisLine: {
                  lineStyle: {
                    color: echarts.axisLineColor,
                  },
                },
                axisLabel: {
                  textStyle: {
                    color: echarts.textColor,
                  },
                },
              },
            ],
            yAxis: [
              {
                type: 'value',
                axisLine: {
                  lineStyle: {
                    color: echarts.axisLineColor,
                  },
                },
                splitLine: {
                  lineStyle: {
                    color: echarts.splitLineColor,
                  },
                },
                axisLabel: {
                  textStyle: {
                    color: echarts.textColor,
                  },
                },
              },
            ],
            series: [
              {
                name: 'Compras',
                type: 'bar',
                barWidth: '60%',
                data: this.data_graph['values'],
              },
            ],
          };
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
