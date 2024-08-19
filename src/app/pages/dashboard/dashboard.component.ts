import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  on_products = 0
  off_products = 0

  constructor(
    private dashboardService:DashboardService,
  ) {
    this.dashboardService.getProductsCount().subscribe(
      response => {
        this.on_products = response['activeProducts'];
        this.off_products = response['inactiveProducts'];
      }
    );
  }

  ngOnInit(): void {
  }

}
