import { GameObjects, Physics, Scene } from 'phaser';
import SceneKey from '../constants/SceneKey';
import TextureKey from '../constants/TextureKey';
import RocketMouse from '../containers/RocketMouse';
import LaserObstacle from '../containers/LaserObstacle';

export class MainScene extends Scene {
  private background!: GameObjects.TileSprite;
  private mouseHole!: GameObjects.Image;

  // Windows
  private window1!: GameObjects.Image;
  private window2!: GameObjects.Image;

  // Bookcases
  private bookcase1!: GameObjects.Image;
  private bookcase2!: GameObjects.Image;

  // Windows and Bookcases array for avoid overlapping each other
  private windows: GameObjects.Image[] = [];
  private bookcases: GameObjects.Image[] = [];

  private coins!: Physics.Arcade.StaticGroup;

  laserObstacle!: LaserObstacle;

  constructor() {
    super({ key: SceneKey.Game }); // Give the key to uniquely identify it with other Scenes
  }

  // preload use for loading assets
  preload(): void {}

  create(): void {
    // score width and height of game screen
    const width = this.scale.width;
    const height = this.scale.height;

    // add background image to Scene
    this.background = this.add
      .tileSprite(0, 0, width, height, TextureKey.Background)
      .setOrigin(0, 0)
      .setScrollFactor(0, 0);

    // create random mouse hole each time game start
    this.mouseHole = this.add.image(
      Phaser.Math.Between(900, 1500),
      501,
      TextureKey.MouseHole
    );

    // Add window to Scene
    this.window1 = this.add.image(
      Phaser.Math.Between(900, 1300),
      200,
      TextureKey.Window1
    );
    this.window2 = this.add.image(
      Phaser.Math.Between(1600, 2000),
      200,
      TextureKey.Window2
    );
    this.windows = [this.window1, this.window2];

    // Add Bookcase to Scene
    this.bookcase1 = this.add
      .image(Phaser.Math.Between(2200, 2700), 200, TextureKey.Bookcase1)
      .setOrigin(0.5, 1);
    this.bookcase2 = this.add
      .image(Phaser.Math.Between(2900, 3400), 200, TextureKey.Bookcase2)
      .setOrigin(0.5, 1);
    this.bookcases = [this.bookcase1, this.bookcase2];

    // Add LaserObstacle Container to this Scene
    this.laserObstacle = new LaserObstacle(this, 900, 100);
    this.add.existing(this.laserObstacle);

    this.coins = this.physics.add.staticGroup();
    this.spawnCoins();

    // Add RocketMouse Container to this Scene
    const mouse = new RocketMouse(this, width * 0.5, height - 30);
    this.add.existing(mouse);

    // Add physics to Rocket Mouse (Running and Scrolling)
    const body = mouse.body as Physics.Arcade.Body; // body can also be Physics.Arcade.StaticBody
    body.setCollideWorldBounds(true); // Sets whether this Body collides with the world boundary.
    body.setVelocityX(200); // The velocity in horizontal, in pixels per second.

    // Use Number.MAX_SAFE_INTEGER because of this is the infinite runner game
    // set physics world bounds...
    this.physics.world.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height - 30);

    // follow rocket mouse by using Camera
    this.cameras.main.startFollow(mouse);
    this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height - 30); // x, y, width and height are the same config with this.physics.world.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height - 30);

    this.physics.add.overlap(
      this.laserObstacle,
      mouse,
      () => this.handleOverlapLaser(this.laserObstacle, mouse),
      undefined,
      this
    );
  }

  override update(t: number, dt: number): void {
    // update mouse hole
    this.wrapMouseHole();

    // update window
    this.wrapWindow();

    // update bookcase
    this.wrapBookcase();

    // update laser
    this.wrapLaserObstacle();

    // scroll the background
    this.background.setTilePosition(this.cameras.main.scrollX);
  }

  // Determine if mouse hole scrolls off left-side it will create new hole
  private wrapMouseHole(): void {
    const scrollX = this.cameras.main.scrollX;
    const rightEdge = scrollX + this.scale.width; // get distance from center to the end of right side

    if (this.mouseHole.x + this.mouseHole.width < scrollX) {
      this.mouseHole.x = Phaser.Math.Between(rightEdge + 100, rightEdge + 1000);
    }
  }

  private wrapWindow(): void {
    const scrollX = this.cameras.main.scrollX;
    const rightEdge = scrollX + this.scale.width; // get distance from center to the end of right side

    let windowWidth = this.window1.width * 2;
    if (this.window1.x + windowWidth < scrollX) {
      // pick new random position
      this.window1.x = Phaser.Math.Between(
        rightEdge + windowWidth,
        rightEdge + windowWidth + 800
      );

      // use find() to look for a bookcase that overlaps
      // with the new window1 position
      const overlap = this.bookcases.find((bc) => {
        return Math.abs(this.window1.x - bc.x) <= this.window1.width;
      });

      this.window1.visible = !overlap;
    }

    windowWidth = this.window2.width;
    if (this.window2.x + windowWidth < scrollX) {
      // pick new random position
      this.window2.x = Phaser.Math.Between(
        this.window1.x + windowWidth,
        this.window1.x + windowWidth + 800
      );

      // do the same as we did above for window2
      const overlap = this.bookcases.find((bc) => {
        return Math.abs(this.window2.x - bc.x) <= this.window2.width;
      });

      this.window2.visible = !overlap;
    }
  }

  private wrapBookcase(): void {
    const scrollX = this.cameras.main.scrollX;
    const rightEdge = scrollX + this.scale.width; // get distance from center to the end of right side

    let bookcaseWidth = this.bookcase1.width * 2;
    if (this.bookcase1.x + bookcaseWidth < scrollX) {
      // pick new random position
      this.bookcase1.x = Phaser.Math.Between(
        rightEdge + bookcaseWidth,
        rightEdge + bookcaseWidth + 800
      );

      // use find() to look for a window that overlaps
      // with the new bookcase 1 position
      const overlap = this.windows.find((win) => {
        return Math.abs(this.bookcase1.x - win.x) <= win.width;
      });

      this.bookcase1.visible = !overlap;
    }

    bookcaseWidth = this.bookcase2.width;
    if (this.bookcase2.x + bookcaseWidth < scrollX) {
      this.bookcase2.x = Phaser.Math.Between(
        this.bookcase1.x + bookcaseWidth,
        this.bookcase1.x + bookcaseWidth + 800
      );
      // do the same as we did above for bookcase2
      const overlap = this.windows.find((win) => {
        return Math.abs(this.bookcase2.x - win.x) <= win.width;
      });

      this.bookcase2.visible = !overlap;
    }
  }

  private wrapLaserObstacle(): void {
    const scrollX = this.cameras.main.scrollX;
    const rightEdge = scrollX + this.scale.width; // get distance from center to the end of right side

    const body = this.laserObstacle.body as Phaser.Physics.Arcade.StaticBody;

    const width = body.width;
    if (this.laserObstacle.x + width < scrollX) {
      this.laserObstacle.x = Phaser.Math.Between(
        rightEdge + width,
        rightEdge + width + 1000
      );

      this.laserObstacle.y = Phaser.Math.Between(0, 300);

      // set the physics body's position
      // add body.offset.x to account for x offset
      body.position.x = this.laserObstacle.x + body.offset.x;
      body.position.y = this.laserObstacle.y;
    }
  }

  private spawnCoins(): void {
    console.log('Spawn Coins');
  }

  private handleOverlapLaser(
    obj1: GameObjects.GameObject,
    obj2: GameObjects.GameObject
  ): void {
    console.log('overlap!!');
  }
}
