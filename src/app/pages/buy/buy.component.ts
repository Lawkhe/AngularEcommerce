import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ToastService } from '../../usable/toast.service';
import { Router } from '@angular/router';
import { DiscountService } from '../../services/discount.service';

@Component({
  selector: 'ngx-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit {

  list_products = [];
  list_discount = [];
  random = true;

  constructor(
    private productService:ProductService,
    private discountService:DiscountService,
    private toastService: ToastService,
    private router:Router
  ) {
    this.productService.view().subscribe(
      response => {
        this.list_products = response
      }
    );
    this.discountService.getDate().subscribe(
      response => {
        this.list_discount = response
      }
    );
  }

  ngOnInit(): void {
  }

  randomProduct() {
    let position = Math.floor(Math.random() * this.list_products.length);
    console.log(position);
    let product = this.list_products[position];
    if (product) {
      product['discount'] = 50;
      this.addProduct(product, true);
      this.toastService.showToast('success', 'Descuento', product.name + ' agregado con descuento.');
      this.random = false;
    }
  }

  addProduct(product, buy=false) {
    let cart = JSON.parse(localStorage.getItem('cart')) || null;
    let data_cart = [];

    if (product.discount != 50 && this.list_discount.length > 0) {
      product['discount'] = 10;
    }

    if (cart) {
      let position = cart.map(function(e) { return e.id; }).indexOf(product.id);
      if (position != -1) {
        if (!buy) {
          this.toastService.showToast('warning', 'Ya existe!', product.name + ' ya esta agregado.');
        }
      } else {
        this.toastService.showToast('success', 'Producto Agregado', product.name + ' fue agregado correctamente.');
        cart.push(product)
      }
      data_cart = cart;

    } else {
      data_cart = [product]
      this.toastService.showToast('success', 'Producto Agregado', product.name + ' fue agregado correctamente.');
    }
    localStorage.removeItem('cart');
    localStorage.setItem('cart', JSON.stringify(data_cart));
  }

  buyProduct(product) {
    this.addProduct(product, true);
    this.goFinish();
  }

  goFinish() {
    this.router.navigate(['/pages/buy/finish']);
  }

}
