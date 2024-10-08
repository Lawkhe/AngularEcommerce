import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule, NbButtonModule, NbSelectModule, NbBadgeModule, NbListModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BuyComponent } from './buy.component';
import { FinishComponent } from './finish/finish.component';

@NgModule({
  declarations: [BuyComponent, FinishComponent],
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    MatDialogModule,
    MatButtonModule,
    NbButtonModule,
    NbSelectModule,
    NbBadgeModule,
    NbListModule
  ]
})
export class BuyModule { }
