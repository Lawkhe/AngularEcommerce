import { ActivatedRouteSnapshot, ExtraOptions, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CheckLoginGuard } from './guards/check_login.guard';

export const routes: Routes = [
  {
    path: 'site',
    loadChildren: () => import('./site/site.module')
      .then(m => m.SiteModule),
  },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
      canActivate:[CheckLoginGuard]
  },
  { path: '**', redirectTo: 'site/login'},
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
  providers: [
    {
        provide: 'externalUrlRedirectResolver',
        useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
        {
            window.location.href = (route.data as any).externalUrl;
        }
    }
]
})
export class AppRoutingModule {
}
