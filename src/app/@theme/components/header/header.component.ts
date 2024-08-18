import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { LayoutService } from '../../../@core/utils';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { BASE_URL } from '../../../services/site.service';
import { EnterpriseService } from '../../../services/enterprise.service';
import { WsSendService } from '../../../services/ws-send.service';
import { ToastService } from '../../../usable/toast.service';
import { UserService } from '../../../services/user.service';

export interface Notification_Scheme {
  icon: string,
  title: string,
  description : string,
  status: string,
  extra?:any,
  id?,
}

export const THEMES = [
  {
    value: 1,
    name: 'Light',
  },
  {
    value: 2,
    name: 'Dark',
  },
  {
    value: 3,
    name: 'Material-Light',
  },
  {
    value: 4,
    name: 'Corporate',
  },
];

const USER_MENU = [
  {
    icon: 'log-out-outline',
    title: 'Cerrar Sesión'
  }
];

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  themes = THEMES;

  time_now = new Date();

  currentTheme = 1;

  userMenu = [
  ];

  mainTitle = 'Ecommerce';

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserService,
              private enterpriseService: EnterpriseService,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private router:Router,
              private http:HttpClient,
              private toastService:ToastService) {
  }

  ngOnInit() {
    // this.currentTheme = this.themeService.currentTheme;
    this.user = JSON.parse(localStorage.getItem('session'));
    // console.log(this.user.theme);
    // this.changeTheme(this.user.theme);
    this.userMenu = USER_MENU;
    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

      this.menuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'profile-context-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => {
        if (title == "Cerrar Sesión"){
          let user = JSON.parse(localStorage.getItem('session')) || null;
          if (user){
            // const reqHeader = new HttpHeaders({
            //   'Content-Type': 'application/json',
            //   'Authorization': 'Token ' + user.token
            // });
            // const path = BASE_URL + 'auth/logout';
            // this.http.get<{}>(path, { headers: reqHeader }).toPromise().then(response => {});
            localStorage.removeItem('session');
          }
          this.router.navigate(['/login']);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onChangeTheme(theme: number) {
    this.changeTheme(theme);
  }

  changeTheme(theme: number) {
    this.currentTheme = theme;
    let theme_name = ''
    switch (theme) {
      case 2:
        theme_name = 'dark';
        break;
      case 3:
        theme_name = 'cosmic';
        break;
      case 4:
        theme_name = 'corporate';
        break;
      case 3:
        theme_name = 'material-light';
        break;
      default:
        theme_name = 'default';
        break;
    }
    this.themeService.changeTheme(theme_name);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
