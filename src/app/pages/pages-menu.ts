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
    icon: 'people',
    link: '/pages/user',
    data: "ADMIN",
  },
  {
    title: 'Productos',
    icon: 'shopping-cart',
    data: "ADMIN",
    children: [
      {
        title: 'Categorías',
        link: '/pages/category',
      },
      {
        title: 'Ítems',
        link: '/pages/product',
      },
      {
        title: 'Descuentos',
        link: '/pages/discount',
      },
    ],
  },
  {
    title: 'Auditoria',
    icon: 'browser',
    link: '/pages/audit',
    data: "ADMIN",
  },
  {
    title: 'Comprar',
    icon: 'shopping-cart',
    link: '/pages/buy',
    home: true,
    data: "USER",
  },
  {
    title: 'Historial',
    icon: 'browser',
    link: '/pages/record',
    data: "USER",
  },
];
