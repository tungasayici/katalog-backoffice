import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
    {
        title: 'Products',
        icon: 'nb-grid-b-outline',
        link: '/pages/product',
        children: [
          {
            title: 'All Products',
            link: '/pages/product/viewAll'
          },
          {
            title: 'Active Products',
            link: '/pages/product/view'
          }
        ],
      },
      {
        title: 'Consumer',
        icon: 'nb-person',
        link: '/pages/consumer/view',
      },
      {
        title: 'Comment',
        icon: 'nb-compose',
        link: '/pages/comment/view',
      },
      {
        title: 'Assets',
        icon: 'nb-list',
        link: '/pages/asset/view',
      },
      {
        title: 'Likes',
        icon: 'nb-heart',
        link: '/pages/likes/view',
      },
];
