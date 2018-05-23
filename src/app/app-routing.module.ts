import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Guard } from 'src/app/shared/quard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './first-page/first-page.module#FirstPageModule'
  },
  {
    path: 'gomoku',
    loadChildren: './gomoku/gomoku.module#GomokuModule',
    canLoad: [Guard],
    canActivate: [Guard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
