import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule, NbButtonModule, NbSelectModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UserService } from '../../@core/mock/users.service';

import { ThemeModule } from '../../@theme/theme.module';
import { UserComponent } from './user.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    Ng2SmartTableModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    NbButtonModule,
    NbSelectModule,
  ],
  declarations: [
    UserComponent,
  ],
  providers: [
    UserService
  ],
  entryComponents: [
  ]
})

export class UserModule { }
