import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SiteRoutingModule } from './site-routing.module';
import { NbAuthModule } from '@nebular/auth';

import {
  NbFormFieldModule,
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
  NbIconModule,
  NbSpinnerModule
} from '@nebular/theme';

import { LoginComponent } from './login/login.component';
import { CodeInputModule } from 'angular-code-input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    SiteRoutingModule,
    NbAuthModule,
    NbFormFieldModule,
    NbIconModule,
    CodeInputModule,
    NbSpinnerModule,
  ],
  declarations: [
    LoginComponent
  ],
  providers: []
})
export class SiteModule { }
