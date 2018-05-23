import { Injectable } from '@angular/core';

import { Player } from 'src/app/shared/player-model';
import { Cell } from 'src/app/shared/cell-model';
import { HandleClickResponse } from 'src/app/shared/handle-click-response-model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  player1: Player;
  player2: Player;
  gameMatrix: Cell[][];
  firstCellIndex: number;
  lastCellIndex: number;
  boardSize: number;
  winRow: number;

  constructor() {
    this.setDefault();
  }

  public setDefault() {
    this.boardSize = this.boardSize || 10;
    this.firstCellIndex = 1000;
    this.lastCellIndex = this.firstCellIndex + this.boardSize - 1;
    this.gameMatrix = [];
    this.winRow = 5;
  }

  public setGame(firstPlayer: Player, secondPlayer: Player, boardSize: number) {
    this.player1 = firstPlayer;
    this.player2 = secondPlayer;
    this.boardSize = boardSize;
    this.lastCellIndex = this.firstCellIndex + this.boardSize - 1;
  }

  // for guard
  public checkInfo() {
    return !!this.player1 && this.player2;
  }

  private generateRow(y: number) {
    const row = [];
    for (let x = this.firstCellIndex; x <= this.lastCellIndex; x++) {
      row.push(new Cell(x, y));
    }
    return row;
  }

  public generateMatrix() {
    this.gameMatrix = [];
    for (let y = this.firstCellIndex; y <= this.lastCellIndex; y++) {
      this.gameMatrix.push(this.generateRow(y));
    }
  }
  /*
  * Handle click
 */
  public handleCellClick(cell: Cell, player: number): HandleClickResponse {
    const yIndex = this.gameMatrix.findIndex(row => row[0].y === cell.y);
    const xIndex = this.gameMatrix[0].findIndex(column => column.x === cell.x);
    if (this.gameMatrix[yIndex][xIndex].clickedBy) {
      return new HandleClickResponse(false, false); // was clicked before
    }
    this.gameMatrix[yIndex][xIndex].clickedBy = player;
    const isItWin = this.checkWin(xIndex, yIndex, player);
    // check if the row first or last
    if (!isItWin) {
      if (cell.y === this.firstCellIndex || cell.x === this.firstCellIndex) {
        this.addTopAndLeft();
      } else if (cell.y === this.lastCellIndex || cell.x === this.lastCellIndex) {
        this.addBottomAndRight();
      }
    }
    return new HandleClickResponse(true, isItWin);
  }

  // Check the win
  private checkWin(x: number, y: number, player: number) {
    const checkArray = this.generateCheckArray(x, y);
    const result = this.check(checkArray, player);
    return result;
  }

  private generateCheckArray(x: number, y: number) {
    const step = this.winRow - 1;
    const result = [[], [], [], []];
    for (let i = step; i >= -step; i--) {
      result[0].push({ x: x, y: y - i }); // Vertical
      result[1].push({ x: x + i, y: y - i }); // First diagonal
      result[2].push({ x: x + i, y: y }); // Horizontal
      result[3].push({ x: x + i, y: y + i }); // Second diagonal
    }
    return result;
  }

  private check(checkArray: any[][], player: number) {
    let isItWin = false;
    for (let i = 0; i <= 3; i++) {
      const clickedInRow = checkArray[i].reduce((prev, curr) => {
        if (prev === 5) {
          return prev;
        }
        if (!this.gameMatrix[curr.y] || !this.gameMatrix[curr.y][curr.x]) {
          return 0;
        }
        return this.gameMatrix[curr.y][curr.x].clickedBy === player ? ++prev : 0;
      }, 0);
      if (clickedInRow === 5) {
        isItWin = true;
        break;
      }
    }
    return isItWin;
  }

  /*
  * Add rows
 */
  addTopAndLeft() {
    if (!this.firstCellIndex) {
      return;
    }
    const row = this.generateRow(this.firstCellIndex - 1);
    this.gameMatrix.unshift(row);
    --this.firstCellIndex;
    let currentIndex = this.firstCellIndex;
    this.gameMatrix.forEach(eachRow => {
      eachRow.unshift(new Cell(this.firstCellIndex, currentIndex));
      currentIndex++;
    });
  }
  addBottomAndRight() {
    const row = this.generateRow(this.lastCellIndex + 1);
    this.gameMatrix.push(row);
    ++this.lastCellIndex;
    let currentIndex = this.firstCellIndex;
    this.gameMatrix.forEach(eachRow => {
      eachRow.push(new Cell(this.lastCellIndex, currentIndex));
      currentIndex++;
    });
  }
}


