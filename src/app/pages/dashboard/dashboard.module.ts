import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DashboardComponent } from './dashboard.component';

import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    NbButtonModule,
    ThemeModule,
    MatDialogModule,
    MatButtonModule,
    LeafletModule,
    NgxEchartsModule,
  ],
  declarations: [
    DashboardComponent,
  ],
  providers: [
  ],
  entryComponents: [
  ]
})
export class DashboardModule { }
