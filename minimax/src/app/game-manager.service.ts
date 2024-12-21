import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameManagerService {
  x: number = 0; // Track X wins
  y: number = 0; // Track O wins

  constructor() { }
}
