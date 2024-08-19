import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../../usable/toast.service';
import { BuyService } from '../../../services/buy.service';
import { AuditService } from '../../../services/audit.service';

@Component({
  selector: 'ngx-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss']
})
export class FinishComponent implements OnInit {

  load = true;
  cart = [];
  total = 0;
  list_products = [];
  record = [];

  constructor(
    private router:Router,
    private toastService: ToastService,
    private buyService: BuyService,
    private auditService:AuditService,
  ) {
    this.cart = JSON.parse(localStorage.getItem('cart')) || null;

    let user = JSON.parse(localStorage.getItem('session')) || null;
    this.buyService.user_view(user.id).subscribe(
      response => {
        this.record = response
      }
    );
  }

  ngOnInit(): void {
  }

  getPrice(product) {
    let total = product.price;
    if (product.discount != undefined) {
      let discount = product.price * (product.discount/100);
      total = product.price - discount;
    }
    return total;
  }

  getTotal() {
    let total = 0;
    this.cart.forEach(element => {
      if (element.discount != undefined) {
        let discount = element.price * (element.discount/100);
        total += element.price - discount;
      } else {
        total += element.price;
      }
    });
    return total;
  }

  getTotalDiscount() {
    let total = 0;
    let discount = this.getTotal() * (0.05);
    total += this.getTotal() - discount;
    return total;
  }

  removeProduct(index) {
    this.addAudit('Retiro un producto de la compra.');
    this.cart.splice(index, 1);
  }

  cancelBuy() {
    this.addAudit('Cancelo la compra.');
    localStorage.removeItem('cart');
    this.router.navigate(['/pages/buy']);
  }

  onConfirm(): void {
    if (this.load) {
      this.load = false;

      let productIds = [];
      this.cart.forEach(element => {
        productIds.push(element.id);
      });

      let total_result = this.getTotal();
      if (this.record.length > 3) {
        total_result = this.getTotalDiscount();
      }
      let user = JSON.parse(localStorage.getItem('session')) || null;

      let data = {
        amount: this.cart.length,
        total: total_result,
        userId: user.id,
        productIds: productIds,
        status: 1,
      }
      this.buyService.create(data).subscribe(response => {
        localStorage.removeItem('cart');
        this.toastService.showToast('success', 'Gracias por tu compra!', 'Compra realizada correctamente.');
        this.addAudit('Realizado la compra correctamente.');
        this.router.navigate(['/pages/record']);
      })

      setTimeout(() => {
        this.load = true;
        }, 3000
      );

    }
  }

  addAudit(description) {
    let user = JSON.parse(localStorage.getItem('session')) || null;
    let data = {
      userId: user.id,
      description: description
    }
    this.auditService.create(data).subscribe(response => {});
  }

}
