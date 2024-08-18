import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Estadísticas',
    icon: 'grid',
    link: '/pages/dashboard',
    home: true,
    data: "ADMIN",
  },
  {
    title: 'Usuarios',
    icon: 'user',
    link: '/pages/user/view',
    data: "ADMIN",
  }
];
