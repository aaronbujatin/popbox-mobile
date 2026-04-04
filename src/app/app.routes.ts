import { Routes } from '@angular/router';
import { MainTabComponent } from './components/tabs/main-tab/main-tab.component';

export const routes: Routes = [
  {
    path: '',
    component: MainTabComponent,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./components/tabs/home-tab/home-tab.component').then((m) => m.HomeTabComponent),
      },
      {
        path: 'category',
        loadComponent: () => import('./components/tabs/category-tab/category-tab.component').then((m) => m.CategoryTabComponent),
      },
      {
        path: 'cart',
        loadComponent: () => import('./components/tabs/cart-tab/cart-tab.component').then((m) => m.CartTabComponent),
      },
      {
        path: 'profile',
        loadComponent: () => import('./components/tabs/profile-tab/profile-tab.component').then((m) => m.ProfileTabComponent),
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/example/home',
    pathMatch: 'full',
  },
];
