import { Scene } from 'phaser';
import AnimationKey from '../constants/AnimationKey';
import SceneKey from '../constants/SceneKey';
import TextureKey from '../constants/TextureKey';

export class Preloader extends Scene {
  constructor() {
    super({ key: SceneKey.Preloader });
  }

  preload(): void {
    // load background
    this.load.image(
      TextureKey.Background,
      '../../assets/images/house/bg_repeat_340x640.png'
    );

    // load rocket mouse with json for animation
    this.load.atlas(
      TextureKey.RocketMouse,
      '../../assets/images/characters/rocket-mouse.png',
      '../../assets/images/characters/rocket-mouse.json'
    );

    // load mouse hole
    this.load.image(
      TextureKey.MouseHole,
      '../../assets/images/house/object_mousehole.png'
    );

    // load 2 Windows
    this.load.image(
      TextureKey.Window1,
      '../../assets/images/house/object_window1.png'
    );
    this.load.image(
      TextureKey.Window2,
      '../../assets/images/house/object_window2.png'
    );

    // add bookcase
    this.load.image(
      TextureKey.Bookcase1,
      '../../assets/images/house/object_bookcase1.png'
    );
    this.load.image(
      TextureKey.Bookcase2,
      '../../assets/images/house/object_bookcase2.png'
    );

    // load laser
    this.load.image(
      TextureKey.LaserEnd,
      '../../assets/images/house/object_laser_end.png'
    );
    this.load.image(
      TextureKey.LaserMiddle,
      '../../assets/images/house/object_laser.png'
    );

    // Load coins
    this.load.image(
      TextureKey.Coin,
      '../../assets/images/house/object_coin.png'
    );
  }

  create(): void {
    // Create Animation for Rocket Mouse
    this.anims.create({
      key: AnimationKey.RocketMouseRun,
      frames: this.anims.generateFrameNames(TextureKey.RocketMouse, {
        start: 1,
        end: 4,
        prefix: 'rocketmouse_run',
        zeroPad: 2,
        suffix: '.png',
      }),
      // you can create frame liek this
      // frames: [
      //   { key: 'rocket-mouse', frame: 'rocketmouse_run01.png' },
      //   { key: 'rocket-mouse', frame: 'rocketmouse_run02.png' },
      //   { key: 'rocket-mouse', frame: 'rocketmouse_run03.png' },
      //   { key: 'rocket-mouse', frame: 'rocketmouse_run04.png' },
      // ],
      frameRate: 10,
      repeat: -1, // -1 to loop forever, it will loop as long as it's active
    });

    // fall animations
    this.anims.create({
      key: AnimationKey.RocketMouseFall,
      frames: [
        {
          key: TextureKey.RocketMouse,
          frame: 'rocketmouse_fall01.png',
        },
      ],
    });

    // fall animations
    this.anims.create({
      key: AnimationKey.RocketMouseFly,
      frames: [
        {
          key: TextureKey.RocketMouse,
          frame: 'rocketmouse_fly01.png',
        },
      ],
    });

    // create flames animation
    this.anims.create({
      key: AnimationKey.RocketFlamesOn,
      frames: this.anims.generateFrameNames(TextureKey.RocketMouse, {
        start: 1,
        end: 2,
        prefix: 'flame',
        suffix: '.png',
      }),
      frameRate: 10,
      repeat: -1, // -1 to loop forever, it will loop as long as it's active
    });

    // create dead animation
    this.anims.create({
      key: AnimationKey.RocketMouseDead,
      frames: this.anims.generateFrameNames(TextureKey.RocketMouse, {
        start: 1,
        end: 2,
        prefix: 'rocketmouse_dead',
        zeroPad: 2,
        suffix: '.png',
      }),
      frameRate: 10,
    });

    this.scene.start(SceneKey.Game);
  }
}
