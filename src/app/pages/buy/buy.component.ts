import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'ngx-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit {

  list_products = []

  constructor(
    private productService:ProductService,
  ) {
    this.productService.view().subscribe(
      response => {
        this.list_products = response
      }
    );
  }

  ngOnInit(): void {
  }

}
