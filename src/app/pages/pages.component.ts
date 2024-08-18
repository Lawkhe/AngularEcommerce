import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu" (click)="onclick()"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit{

  menu = MENU_ITEMS;
  session_data;
  session_sock;

  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {
    const user_data = JSON.parse(localStorage.getItem('session')) || null;

    if (user_data){
      this.menu.forEach(element => {
        if (element.data == user_data.role) {
          element.hidden = false;
        } else {
          element.hidden = true;
        }
      });
    }
  }

  onclick(){
    let url_parts = this.router.url.split('/');
    if(url_parts[1]=="pages"){}
  }
}
