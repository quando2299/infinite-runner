# InfiniteRunner

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.0 and Phaser 3.70

## Development server

Run `ng s -o` for a dev server and it will automatically open your browser. The application will automatically reload if you change any of the source files.

## Assets Library and Tools

Use [Game Art Guppy](https://www.gameartguppy.com/)

- [Rocket Mouse](https://www.gameartguppy.com/shop/rocket-mouse-game-art-character/)
- [House](https://www.gameartguppy.com/shop/house-1-repeatable-background/)
- [Custom Rocket Mouse fly](https://github.com/ourcade/infinite-runner-template-phaser3/issues/1) --> Save this with name `rocketmouse_fly01.png`

Use [TexturePacker] (https://www.codeandweb.com/texturepacker) for making Sprite Sheets or Atlases

## Notes

- Animations usually use sprite sheets or atlases because it is more efficient to pick a different frame from a single texture than to switch textures constantly.
  - You can use `load.atlas()` for loading sprite sheets and alases
- The core of Sprite and Image that Sprite can play animation and Image cannot !
- Animations are global, once it created, it can be used in any Sprites of any Scences

## ToDo

- [ ] Create background Layout (background, bookcase, mouse hole, window)
- [ ] Create Rocket mouse
- [ ] Create Run Animation for Rocket Mouse
- [ ] Add Jetpack
- [ ] Create Fly Animation for Rocket Mouse
- [ ] Create Fall Animation for Rocket Mouse
- [ ] Create Laser Obstacle
- [ ] Game over and Play again
- [ ] Add coin to collect and scoring
