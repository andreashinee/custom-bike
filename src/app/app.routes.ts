import { Routes } from '@angular/router';
import { CustomBikeComponent } from './pages/custom-bike/custom-bike';
import { RulesManagerComponent } from './pages/rules-manager/rules-manager';

export const routes: Routes = [
  {
    path: '',
    component: CustomBikeComponent
  },
  {
    path: 'rules',
    component: RulesManagerComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
