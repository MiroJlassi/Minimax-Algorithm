import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameManagerService {

  turn: number = 0;
  board: string[] = ["", "", "", "", "", "", "", "", ""];
  constructor() { }

  validateState(table: string[]):string {
    for (let i = 0; i < 3; i++) {
      if (table[i * 3] !== "" && table[i * 3] === table[i * 3 + 1] && table[i * 3] === table[i * 3 + 2]) {
        return table[i * 3];
      }
    }
    for (let i = 0; i < 3; i++) {
      if (table[i] !== "" && table[i] === table[i + 3] && table[i] === table[i + 6]) {
        return table[i];
      }
    }
    if (table[0] !== "" && table[0] === table[4] && table[0] === table[8]) {
      return table[0];
    }
    if (table[2] !== "" && table[2] === table[4] && table[2] === table[6]) {
      return table[2];
    }
    return "";
  }
}
