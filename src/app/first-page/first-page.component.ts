import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Colors } from './shared/colors';
import { GameService } from 'src/app/shared/game.service';
import { Player } from 'src/app/shared/player-model';
import { DifferentName } from 'src/app/shared/validator.different-name';
import { DifferentColor } from 'src/app/shared/validator.different-colors';

@Component({
  selector: 'app-firstpage',
  templateUrl: './first-page.component.html',
  styleUrls: ['first-page.component.scss']
})
export class FirstPageComponent implements OnInit {
  playersForm: FormGroup;
  colors: { name: string, color: string }[];
  startBordSize: number[];
  constructor(
    private roter: Router,
    private gameService: GameService
  ) { }

  ngOnInit() {
    this.playersForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      firstColor: new FormControl('#00695c'),
      secondName: new FormControl('', Validators.required),
      secondColor: new FormControl('#283593'),
      startBordSize: new FormControl(10)
    }, [DifferentName(), DifferentColor()]);
    this.colors = Colors;
    this.startBordSize = [10, 20, 30];
  }
  onStart() {
    const values = this.playersForm.value;
    const firstPlayer = new Player(values.firstName, values.firstColor);
    const secondPlayer = new Player(values.secondName, values.secondColor);
    this.gameService.setGame(firstPlayer, secondPlayer, values.startBordSize);
    this.roter.navigate(['gomoku']);
  }
}
