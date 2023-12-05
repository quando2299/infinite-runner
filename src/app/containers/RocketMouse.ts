import AnimationKey from '../constants/AnimationKey';
import TextureKey from '../constants/TextureKey';

export default class RocketMouse extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    const mouse = scene.add
      .sprite(0, 0, TextureKey.RocketMouse)
      .setOrigin(0.5, 1)
      .play(AnimationKey.RocketMouseRun);

    this.add(mouse);

    // add physic body
    scene.physics.add.existing(this);

    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setSize(mouse.width, mouse.height);
    body.setOffset(mouse.width * -0.5, -mouse.height);
  }
}
