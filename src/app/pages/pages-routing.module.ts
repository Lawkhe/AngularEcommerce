import { ComponentFixture } from '@angular/core/testing';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { DiscountComponent } from './discount/discount.component';
import { BuyComponent } from './buy/buy.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'user',
      component: UserComponent,
    },
    {
      path: 'category',
      component: CategoryComponent,
    },
    {
      path: 'product',
      component: ProductComponent,
    },
    {
      path: 'discount',
      component: DiscountComponent,
    },
    {
      path: 'buy',
      component: BuyComponent,
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    { path: '**', redirectTo: 'dashboard'},
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
