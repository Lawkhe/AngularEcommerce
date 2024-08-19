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
];
