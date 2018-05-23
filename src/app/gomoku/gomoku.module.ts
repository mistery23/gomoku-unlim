import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GomokuRoutingModule } from './gomoku-routing.module';
import { GomokuComponent } from './gomoku.component';
import { CellComponent } from './cell/cell.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { WinModalComponent } from './win-modal/win-modal.component';

@NgModule({
  imports: [
    CommonModule,
    GomokuRoutingModule,
    MaterialModule
  ],
  declarations: [
    GomokuComponent,
    CellComponent,
    WinModalComponent
  ],
  entryComponents: [
    WinModalComponent
  ]
})
export class GomokuModule { }
