import { Component, Injectable, OnInit } from '@angular/core';
import { NbLoginComponent } from '@nebular/auth';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { SiteService } from '../../services/site.service';
import { ToastService } from '../../usable/toast.service';
import { NbAuthService } from '@nebular/auth';
import { decodeJwtPayload } from '@nebular/auth';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
@Injectable()
export class LoginComponent extends NbLoginComponent implements OnInit {
  loading = false;

  constructor(
    service: NbAuthService,
    cd: ChangeDetectorRef,
    router: Router,
    private siteService: SiteService,
    private toastService: ToastService,
  ) {
    super(service, {}, cd, router);
  }

  ngOnInit(): void {}

  login() {
    this.loading = true;
    let data = {
      'username': this.user.email,
      'password': this.user.password
    };
    this.onLogin(data);
  }

  onLogin(data) {
    this.siteService.login(data).subscribe(response => {
      let token_response = decodeJwtPayload(response['token']);
      this.siteService.getUserLogin(response['token'], token_response['sub']).subscribe(data_user => {
        data_user['token'] = response['token']
        localStorage.setItem('session', JSON.stringify(data_user));
        const view:string = data_user['role'] == 'ADMIN' ? '/pages/dashboard' : '/pages/buy';
        this.router.navigate([view, {}]);
      });
    }, error => {
      this.toastService.showToast('danger', 'Error', '¡Intenta más tarde!');
      this.loading = false;
    });
  }

  showPassword = false;

  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
