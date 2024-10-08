import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { DiscountModule } from './discount/discount.module';
import { BuyModule } from './buy/buy.module';
import { RecordModule } from './record/record.module';
import { AuditModule } from './audit/audit.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    UserModule,
    CategoryModule,
    ProductModule,
    DiscountModule,
    BuyModule,
    RecordModule,
    AuditModule
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
