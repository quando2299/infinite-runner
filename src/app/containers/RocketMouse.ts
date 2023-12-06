import { GameObjects, Types } from 'phaser';
import AnimationKey from '../constants/AnimationKey';
import TextureKey from '../constants/TextureKey';

enum MouseState {
  Running,
  Killed,
  Dead,
}

export default class RocketMouse extends Phaser.GameObjects.Container {
  private flames!: GameObjects.Sprite;
  private cursors!: Types.Input.Keyboard.CursorKeys;
  private rocketMouse!: GameObjects.Sprite;

  private mouseState = MouseState.Running;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    this.rocketMouse = scene.add
      .sprite(0, 0, TextureKey.RocketMouse)
      .setOrigin(0.5, 1)
      .play(AnimationKey.RocketMouseRun);

    this.flames = scene.add
      .sprite(-63, -15, TextureKey.RocketMouse)
      .play(AnimationKey.RocketFlamesOn);
    this.enableJetpack(false);

    // Add flame first to set it behind the mouse
    this.add(this.flames);
    this.add(this.rocketMouse);

    // add physic body
    scene.physics.add.existing(this);

    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setSize(this.rocketMouse.width, this.rocketMouse.height);
    body.setOffset(this.rocketMouse.width * -0.5, -this.rocketMouse.height);

    // get instance CursorKeys
    this.cursors = scene.input.keyboard!.createCursorKeys();
  }

  private enableJetpack(enabled: boolean): void {
    this.flames.setVisible(enabled);
  }

  preUpdate(): void {
    // switch on this.mouseState
    const body = this.body as Phaser.Physics.Arcade.Body;
    switch (this.mouseState) {
      case MouseState.Running: {
        if (this.cursors.space.isDown) {
          body.setAccelerationY(-600);
          this.enableJetpack(true);

          // play the fly animation
          // params true is If this fly animation is playing, ignore this call
          this.rocketMouse.play(AnimationKey.RocketMouseFly, true);
        } else {
          body.setAccelerationY(0);
          this.enableJetpack(false);
        }

        // check if touching the ground
        if (body.blocked.down) {
          // play the run animation when touching the ground
          this.rocketMouse.play(AnimationKey.RocketMouseRun, true);
        } else if (body.velocity.y > 0) {
          this.rocketMouse.play(AnimationKey.RocketMouseFall, true);
        }

        break;
      }

      case MouseState.Killed: {
        // reduce velocity to 99%
        body.velocity.x *= 0.99;

        if (body.velocity.x <= 5) {
          this.mouseState = MouseState.Dead;
        }

        break;
      }

      case MouseState.Dead: {
        // Completely stop
        body.setVelocity(0, 0);
        break;
      }
    }
  }

  kill(): void {
    // don't do anything if not in RUNNING state
    if (this.mouseState !== MouseState.Running) {
      return;
    }

    this.mouseState = MouseState.Killed;

    this.rocketMouse.play(AnimationKey.RocketMouseDead);

    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setAccelerationY(0);
    body.setVelocity(1000, 0);
    this.enableJetpack(false);
  }
}
