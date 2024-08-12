import * as PIXI from "pixi.js";
import { soundManager } from "./utils/soundManager.js";

/**
 *
 */
class AssetLoader {
  constructor() {
    this._queue = [];
    this._soundQueue = {};
  }

  /**
   * add an asset to the queue of assets to load using PIXI
   *
   * @param {*} asset - any asset we need to load
   */
  addToQueue(asset) {
    this._queue.push(asset);
  }

  /**
   * Add a sound asset to the queue of sounds to load using Howler.js
   *
   * @param {*} sound - sound asset we need to load
   */
  addSoundToQueue(key, src) {
    this._soundQueue[key] = src;
  }

  /**
   * lead all assets added to the queue and reset the to the queue
   *
   * @async
   */
  async loadQueue() {
    await PIXI.Assets.load(this._queue);
    this._queue.length = 0;
  }

  /**
   * Load all sound assets in the sound queue
   */
  loadSounds() {
    for (const [key, src] of Object.entries(this._soundQueue)) {
      soundManager.loadSound(key, src);
    }
    this._soundQueue = {};
  }
}

export const assetLoader = new AssetLoader();
