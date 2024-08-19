import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { DashboardService } from '../../../services/dashboard.service';

@Component({
  selector: 'ngx-echarts-pie',
  template: `
    <div id="graph" echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsPieComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;

  data_graph = [];

  constructor(
    private theme: NbThemeService,
    private dashboardService:DashboardService
  ) {
  }

  ngAfterViewInit() {

    this.dashboardService.getTopProducts().subscribe(
      response => {

        let data = response;
        data.forEach(value => {
          this.data_graph.push({
            'name': value['product']['name'],
            'value': value['totalSold']
          })
        });

        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

          const colors = config.variables;
          const echarts: any = config.variables.echarts;

          this.options = {
            backgroundColor: echarts.bg,
            color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)',
            },
            legend: {
              orient: 'horizontal',
              left: 'left',
              data: this.data_graph,
              textStyle: {
                color: echarts.textColor,
              },
            },
            series: [
              {
                name: 'Producto',
                type: 'pie',
                radius: '80%',
                center: ['50%', '50%'],
                data: this.data_graph,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: echarts.itemHoverShadowColor,
                  },
                },
                label: {
                  normal: {
                    textStyle: {
                      color: echarts.textColor,
                    },
                  },
                },
                labelLine: {
                  normal: {
                    lineStyle: {
                      color: echarts.axisLineColor,
                    },
                  },
                },
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
