import { Scene } from 'phaser';
import AnimationKey from '../constants/AnimationKey';
import SceneKey from '../constants/SceneKey';

export class MainScene extends Scene {
  constructor() {
    super({ key: SceneKey.Game }); // Give the key to uniquely identify it with other Scenes
  }

  // preload use for loading assets
  preload(): void {
    // load background
    this.load.image(
      'background',
      '../../assets/images/house/bg_repeat_340x640.png'
    );

    // NOTED: animations usually use sprite sheets or atlases
    // because it can easily take diffirent frame from a single texture
    // load rocket mouse image and json file as an atlas
    this.load.atlas(
      'rocket-mouse',
      '../../assets/images/characters/rocket-mouse.png',
      '../../assets/images/characters/rocket-mouse.json'
    );
  }

  create(): void {
    // Create Animation for Rocket Mouse
    this.anims.create({
      key: AnimationKey.RocketMouseRun,
      frames: this.anims.generateFrameNames('rocket-mouse', {
        start: 1,
        end: 4,
        prefix: 'rocketmouse_run',
        zeroPad: 0,
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
      repeat: -1, // -1 to loop forever
    });

    // score width and height of game screen
    const width = this.scale.width;
    const height = this.scale.height;

    // add background image to Scene
    this.add.tileSprite(0, 0, width, height, 'background').setOrigin(0);

    // add rocket mouse
    this.add.sprite(
      width * 0.5, // middle of the screen
      height * 0.5, // middle of the screen
      'rocket-mouse',
      'rocketmouse_fly01.png'
    );
  }
}
