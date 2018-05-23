import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-win-modal',
  templateUrl: './win-modal.component.html',
  styleUrls: ['./win-modal.component.scss']
})
export class WinModalComponent implements OnInit {

  constructor(
    private finalDialogRef: MatDialogRef<WinModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.finalDialogRef.updatePosition({ top: '150px' });
  }
  onClose(newGame: boolean) {
    this.finalDialogRef.close(newGame);
  }
}
