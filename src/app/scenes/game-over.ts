import { Scene } from 'phaser';
import SceneKey from '../constants/SceneKey';

export class GameOver extends Scene {
  constructor() {
    super({ key: SceneKey.GameOver });
  }

  create(): void {
    // object destructuring
    const { width, height } = this.scale;

    // x, y is in the center sceen
    const x = width * 0.5;
    const y = height * 0.5;

    // Add text with styling
    this.add
      .text(x, y, 'Press SPACE to Play Again', {
        fontSize: '32px',
        color: '#FFFFFF',
        backgroundColor: '#000000',
        shadow: { fill: true, blur: 0, offsetY: 0 },
        padding: { left: 15, right: 15, top: 10, bottom: 10 },
      })
      .setOrigin(0.5);

    this.input.keyboard!.once('keydown-SPACE', () => {
      // stop the GameOver Scene
      this.scene.stop(SceneKey.GameOver);

      // Restart new Game
      this.scene.stop(SceneKey.Game);
      this.scene.start(SceneKey.Game);
    });
  }
}
