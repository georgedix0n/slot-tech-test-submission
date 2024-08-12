import { Howl } from "howler";

/**
 * SoundManager class
 */
class SoundManager {
	constructor() {
		this._sounds = {};
	}

	/**
	 * Load a sound asset
	 *
	 * @param {string} key - the key to reference the sound
	 * @param {string} src - the source file path of the sound
	 */
	loadSound(key, src) {
		this._sounds[key] = new Howl({ src: [src], format: "wav" });
	}

	/**
	 * Play a sound by its key
	 *
	 * @param {string} key - the key of the sound to play
	 */
	playSound(key) {
		const sound = this._sounds[key];
		if (sound) {
			sound.play();
		}
	}

	/**
	 * Stop a sound by its key
	 *
	 * @param {string} key - the key of the sound to stop
	 */
	stopSound(key) {
		const sound = this._sounds[key];
		if (sound) {
			sound.stop();
		}
	}
}

export const soundManager = new SoundManager();
