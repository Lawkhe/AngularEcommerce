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
import { FinishComponent } from './buy/finish/finish.component';
import { RecordComponent } from './record/record.component';
import { AuditComponent } from './audit/audit.component';

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
      path: 'audit',
      component: AuditComponent,
    },
    {
      path: 'buy',
      children:[
        {
          path:'',
          component: BuyComponent,
        },
        {
          path:'finish',
          component: FinishComponent,
        }
      ]
    },
    {
      path: 'record',
      component: RecordComponent,
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
