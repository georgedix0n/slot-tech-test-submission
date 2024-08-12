import * as PIXI from "pixi.js";
import { Base } from "../base.js";

/**
 * Symbol
 *
 * @class
 * @extends Base
 */
export class Symbol extends Base {
  /**
   *
   * @param {number} id - id used for the symbols
   * @param {string} name - name of the symbol asset
   * @param {number} value - value of symbol
   */
  constructor(id, name, value) {
    super();
    this._create(id, name, value);
  }

  /**
   * Get the id of the symbol
   *
   * @member
   * @readonly
   */
  get id() {
    return this._id;
  }

  /**
   * Get the value of the symbol
   *
   * @member
   * @readonly
   */
  get value() {
    return this._value;
  }

  /**
   * Play the symbol animation - Resolve the promise after the duration of the animation
   * @param {PIXI.AnimatedSprite} animatedSprite
   * @param {boolean} [loop=false] - loop the animation
   * @returns {Promise<void>}
   */
  async play(loop = false) {
    return new Promise((resolve) => {
      this._native.loop = loop;
      this._native.play();

      this._native.onComplete = () => {
        resolve();
      };
    });
  }

  /**
   * Stop the symbol animation
   */
  stop() {
    this._native.stop();
  }

  /**
   * Reset the symbol and remove from parent object
   */
  reset() {
    this._native.parent.removeChild(this._native);
    this._native.x = 0;
    this._native.y = 0;
  }

  /**
   * create the Symbol using base PIXI objects and loaded animations
   *
   * @param {number} id - id used for the symbols
   * @param {string} name - name of the symbol asset
   * @param {number} value - value of symbol
   * @private
   */
  _create(id, name, value) {
    this._id = id;
    this._name = name;
    this._value = value;
    const animations = PIXI.Assets.cache.get(this._name).data.animations;
    this._native = PIXI.AnimatedSprite.fromFrames(
      animations[`${this._name}Win`],
    );
  }
}
