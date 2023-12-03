import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AUTO, Game, Types } from 'phaser';
import { MainScene } from '../scenes/main-scene';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent implements OnInit, AfterViewInit {
  private game!: Game;
  private config!: Types.Core.GameConfig;

  constructor() {
    this.config = {
      type: AUTO,
      width: 800,
      height: 640,
      scene: [MainScene],
      physics: {
        default: 'arcade',
        arcade: {
          gravity: {
            y: 200,
          },
        },
      },
    };
  }

  ngOnInit(): void {
    this.game = new Game(this.config);
  }

  ngAfterViewInit(): void {}
}
