import * as PIXI from "pixi.js";

/**
 * Score counter component class.
 */
export class ScoreCounter {
	/**
	 * Creates an instance of ScoreCounter and initializes it.
	 *
	 * @param {number} scoreCounterPosX - The x-coordinate position of the score counter.
	 * @param {number} scoreCounterPosY - The y-coordinate position of the score counter.
	 * @param {number} score - The initial score value to display.
	 */
	constructor(scoreCounterPosX, scoreCounterPosY, score) {
		this._scoreCounterPosX = scoreCounterPosX;
		this._scoreCounterPosY = scoreCounterPosY;
		this._score = score;

		this._initializeScoreCounter();
	}

	/**
	 * Initializes the score counter component.
	 * @private
	 */
	_initializeScoreCounter() {
		this.scoreCounterContainer = new PIXI.Container("scoreCounter");

		this._scoreCounter = PIXI.Sprite.from("greenPanel");

		this._scoreText = new PIXI.Text(`${this._score}`, {
			fontFamily: "Arial",
			fontSize: 24,
			fill: 0xffffff,
		});
		this._scoreText.x =
			this._scoreCounter.width +
			this._scoreCounter.x -
			this._scoreText.width -
			10;
		this._scoreText.y =
			this._scoreCounter.y +
			this._scoreCounter.height / 2 -
			this._scoreText.height / 2 -
			4;

		this.scoreCounterContainer.addChild(this._scoreCounter);
		this.scoreCounterContainer.addChild(this._scoreText);

		this.scoreCounterContainer.x = this._scoreCounterPosX;
		this.scoreCounterContainer.y = this._scoreCounterPosY;
	}

	/**
	 * Update the score displayed on the screen
	 *
	 * @param {number} score - The new score value
	 */
	updateScore(score) {
		if (this._scoreText) {
			this._scoreText.text = `${score}`;
			this._scoreText.x =
				this._scoreCounter.width +
				this._scoreCounter.x -
				this._scoreText.width -
				10;
		}
	}
}
