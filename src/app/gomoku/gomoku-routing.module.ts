import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GomokuComponent } from './gomoku.component';

const routes: Routes = [
  {
    path: '',
    component: GomokuComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GomokuRoutingModule { }
