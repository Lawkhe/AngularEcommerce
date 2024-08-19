import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule, NbButtonModule, NbSelectModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BuyComponent } from './buy.component';

@NgModule({
  declarations: [BuyComponent],
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
  ]
})
export class BuyModule { }
