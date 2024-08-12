import { renderer } from "./renderer.js";
import { assetLoader } from "./assetLoader.js";
import * as PIXI from "pixi.js";
import { symbolStore } from "./reels/symbolStore.js";
import { ReelManager } from "./reels/reelsManager.js";
import { timerManager } from "./utils/timermanager.js";
import { ScoreManager } from "./utils/scoreManager.js";
import { Button } from "./components/button.js";
import { Sky } from "./components/sky.js";
import { ScoreCounter } from "./components/scoreCounter.js";
import { WinMenu } from "./components/winMenu.js";

/**
 * Base entry point for the game
 *
 * @class
 */
class Core {
	constructor() {
		// GAMEPLAY vars
		this.GAME_WIDTH = 1024;
		this.GAME_HEIGHT = 576;

		this.numberOfReels = 3;
		this.reelWidth = 125;

		this.symbolHeight = 105;
		this.symbolWidth = 125;
		this.symbolsPerReel = 3;

		this.reelSquaresXPosition = 324;
		this.reelSquaresYPosition = 95;

		this.skyColour = "#1099BB";
		this.cloudTextureNames = ["cloud1", "cloud2"];
		this.cloudAnimationDuration = 175;
		this.cloudCount = 1;

		this.scoreCounterPosX = 850;
		this.scoreCounterPosY = 20;

		this.playButtonPositionX = 475;
		this.playButtonPositionY = 440;

		this.instructionsContainerX = 62;
		this.instructionsContainerY = 28;
		this.instructionsContainerWidth = 900;
		this.instructionsContainerHeight = 500;

		this.symbols = [
			{ id: 8, name: "nine", value: 9 },
			{ id: 7, name: "ten", value: 10 },
			{ id: 6, name: "jack", value: 11 },
			{ id: 5, name: "queen", value: 12 },
			{ id: 4, name: "king", value: 13 },
			{ id: 3, name: "ace", value: 14 },
			{ id: 2, name: "h4", value: 15 },
			{ id: 1, name: "h3", value: 16 },
			{ id: 0, name: "h2", value: 17 },
		];

		this.winMultipliers = [
			{
				name: "Horizontal Matches",
				indicies: [
					[0, 0],
					[0, 1],
					[0, 2],
				],
				value: 10,
			}, //top
			{
				name: "Horizontal Matches",
				indicies: [
					[1, 0],
					[1, 1],
					[1, 2],
				],
				value: 10,
			}, //mid
			{
				name: "Horizontal Matches",
				indicies: [
					[2, 0],
					[2, 1],
					[2, 2],
				],
				value: 10,
			}, //bottom
			{
				name: "Diagonal Matches",
				indicies: [
					[0, 0],
					[1, 1],
					[2, 2],
				],
				value: 10,
			},
			{
				name: "Diagonal Matches",
				indicies: [
					[0, 2],
					[1, 1],
					[2, 0],
				],
				value: 10,
			},
			{
				name: "All Symbols Match",
				indicies: [
					[0, 0],
					[0, 1],
					[0, 2],
					[1, 0],
					[1, 1],
					[1, 2],
					[2, 0],
					[2, 1],
					[2, 2],
				],
				value: 50,
			}, //all
		];

		this._create();
	}

	/**
	 * load all assets required for the game
	 *
	 * @async
	 */
	async loadAssets() {
		assetLoader.addToQueue({
			alias: "background",
			src: "./resource/@2x/gameBG_opt.png",
		});
		assetLoader.addToQueue({
			alias: "cloud1",
			src: "./resource/@2x/cloud1_opt.png",
		});
		assetLoader.addToQueue({
			alias: "cloud2",
			src: "./resource/@2x/cloud2_opt.png",
		});
		assetLoader.addToQueue({
			alias: "mask",
			src: "./resource/@2x/mask_opt.jpg",
		});
		assetLoader.addToQueue({
			alias: "reelSquare",
			src: "./resource/@2x/reelSquare.png",
		});
		assetLoader.addToQueue({ src: "./resource/@2x/controlPanel0_opt.json" });
		assetLoader.addToQueue({
			alias: "ace",
			src: "./resource/@2x/symbols/aceWin0_opt.json",
		});
		assetLoader.addToQueue({
			alias: "h2",
			src: "./resource/@2x/symbols/h2Win0_opt.json",
		});
		assetLoader.addToQueue({
			alias: "h3",
			src: "./resource/@2x/symbols/h3Win0_opt.json",
		});
		assetLoader.addToQueue({
			alias: "h4",
			src: "./resource/@2x/symbols/h4Win0_opt.json",
		});
		assetLoader.addToQueue({
			alias: "jack",
			src: "./resource/@2x/symbols/jackWin0_opt.json",
		});
		assetLoader.addToQueue({
			alias: "king",
			src: "./resource/@2x/symbols/kingWin0_opt.json",
		});
		assetLoader.addToQueue({
			alias: "nine",
			src: "./resource/@2x/symbols/nineWin0_opt.json",
		});
		assetLoader.addToQueue({
			alias: "queen",
			src: "./resource/@2x/symbols/queenWin0_opt.json",
		});
		assetLoader.addToQueue({
			alias: "ten",
			src: "./resource/@2x/symbols/tenWin0_opt.json",
		});
		assetLoader.addSoundToQueue("spin", "./resource/@2x/audio/spin.wav");
		assetLoader.addSoundToQueue("win", "./resource/@2x/audio/win.wav");
		await assetLoader.loadQueue();
		assetLoader.loadSounds();
	}

	/**
	 * Create the renderer instance and initialise everything ready to play the game
	 *
	 * @async
	 * @private
	 */
	async _create() {
		renderer.initialise({
			antialias: false,
			backgroundAlpha: 1,
			backgroundColour: "#000000",
			gameContainerDiv: document.getElementById("gameContainer"),
			width: this.GAME_WIDTH,
			height: this.GAME_HEIGHT,
		});
		renderer.start();
		timerManager.init();
		await this.loadAssets();
		this._createObjects();
	}

	/**
	 * Create all game objects ready to use
	 *
	 * @async
	 * @private
	 */
	async _createObjects() {
		const sky = new Sky(
			this.cloudCount,
			this.cloudTextureNames,
			this.cloudAnimationDuration,
			this.skyColour,
			this.GAME_WIDTH,
			this.GAME_HEIGHT,
		).skyContainer;

		renderer.addChild(sky);

		this._background = PIXI.Sprite.from("background");
		renderer.addChild(this._background);

		symbolStore.createSymbols(
			this.symbols,
			this.numberOfReels,
			this.symbolsPerReel,
		);

		this._reelManager = new ReelManager(
			this.numberOfReels,
			this.symbolsPerReel,
			this.reelWidth,
			this.symbolWidth,
			this.symbolHeight,
			this.reelSquaresXPosition,
			this.reelSquaresYPosition,
		);
		renderer.addChild(this._reelManager.reelSquares);
		renderer.addChild(this._reelManager.native);

		this._scoreManager = new ScoreManager(
			this._reelManager,
			this.winMultipliers,
		);

		//adds mask to prevent clouds visible off canvas
		this._mask = new PIXI.Graphics();
		this._mask.beginFill(0x1099bb);
		this._mask.drawRect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT);
		this._mask.endFill();
		renderer.addChild(this._mask);

		sky.mask = this._mask;

		this.scoreCounter = new ScoreCounter(
			this.scoreCounterPosX,
			this.scoreCounterPosY,
			this._scoreManager.score,
		);

		renderer.addChild(this.scoreCounter.scoreCounterContainer);

		this.button = new Button("playActive", async () => {
			this.button.disable();
			this.clear.disable();
			this.button.setTexture("playNonactive");
			this._reelManager.startSpin();
			await timerManager.startTimer(2000);
			await this._reelManager.stopSpin();
			await this._scoreManager.checkScore();
			this.scoreCounter.updateScore(this._scoreManager.score);
			this.button.enable();
			this.clear.enable();
			this.button.setTexture("playActive");
		});
		this.button.x = this.playButtonPositionX;
		this.button.y = this.playButtonPositionY;
		renderer.addChild(this.button.native);

		this.info = new Button("infoActive-", async () => {
			this.winMenu.visible = true;
		});
		this.info.x = 325;
		this.info.y = 440;
		renderer.addChild(this.info.native);

		this.clear = new Button("autoPlayActive", async () => {
			this._scoreManager.score = 0;
			this.scoreCounter.updateScore(this._scoreManager.score);
		});
		this.clear.x = 625;
		this.clear.y = 440;
		renderer.addChild(this.clear.native);

		this.winMenu = new WinMenu(
			this.instructionsContainerX,
			this.instructionsContainerY,
			this.instructionsContainerWidth,
			this.instructionsContainerHeight,
			this.symbols,
			this.winMultipliers,
		).instructionsContainer;

		renderer.addChild(this.winMenu);
	}
}

window.startup = () => {
	const game = new Core();
};
