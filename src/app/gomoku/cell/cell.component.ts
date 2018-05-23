import { Component, OnInit, Input } from '@angular/core';

import { Cell } from 'src/app/shared/cell-model';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {
  @Input() cell: Cell;

  constructor() { }

  ngOnInit() {
  }

}
