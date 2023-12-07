import { GameObjects, Scene } from 'phaser';
import TextureKey from '../constants/TextureKey';

export default class LaserObstacle extends GameObjects.Container {
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y);
    // create top
    const top = scene.add.image(0, 0, TextureKey.LaserEnd).setOrigin(0.5, 0);

    // create middle and set it below the top
    const middle = scene.add
      .image(0, top.y + top.displayHeight, TextureKey.LaserMiddle)
      .setOrigin(0.5, 0);

    // set height of middle to 200px
    middle.setDisplaySize(middle.width, 100);

    const bottom = scene.add
      .image(0, middle.y + middle.displayHeight, TextureKey.LaserEnd)
      .setOrigin(0.5, 0)
      .setFlipY(true);

    this.add(top);
    this.add(middle);
    this.add(bottom);

    scene.physics.add.existing(this, true);

    const body = this.body as Phaser.Physics.Arcade.StaticBody;
    const width = top.displayWidth;
    const height =
      top.displayHeight + middle.displayHeight + bottom.displayHeight;
    body.setSize(width, height);
    body.setOffset(-width * 0.5, 0);

    // reposition body
    body.position.x = this.x + body.offset.x;
    body.position.y = this.y;
  }
}
