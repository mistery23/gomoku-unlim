
import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild, CanLoad } from '@angular/router';

import { GameService } from './game.service';

@Injectable()
export class Guard implements CanActivate, CanLoad {
  constructor(
    private gameService: GameService,
    private router: Router
  ) { }

  canActivate() {
    if (this.gameService.checkInfo()) {
      return true;
    }
    this.router.navigateByUrl('home');
    return false;
  }

  canLoad() {
    if (this.gameService.checkInfo()) {
      return true;
    }
    this.router.navigateByUrl('home');
    return false;
  }
}
