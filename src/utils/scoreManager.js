import { soundManager } from "../utils/soundManager.js";

/**
 * Manages the scoring logic in the game based on the reels and multiplier combinations.
 */
export class ScoreManager {
	/**
	 * Creates an instance of ScoreManager.
	 *
	 * @param {ReelsManager} reelsManager - An instance of ReelsManager responsible for managing the reels.
	 * @param {Array<{indicies: number[][], value: number}>} multiplierCombinations - An array of multiplier combinations where each combination includes indices and a multiplier value.
	 */
	constructor(reelsManager, multiplierCombinations) {
		this.score = 0;
		this._reelsManager = reelsManager;
		this._multiplierCombinations = multiplierCombinations;
	}

	/**
	 * Checks for common symbols across all reels and updates the score accordingly.
	 *
	 * @async
	 * @returns {Promise<void>}
	 */
	async checkScore() {
		try {
			const reels = this._reelsManager._reels.map((reel) =>
				reel.getActiveSymbols(),
			); //strips off buffer symbols
			///ADD error handling for change in dim reels
			const commonSymbolsMap = this._generateMatchingSymbolsMap(reels);

			if (commonSymbolsMap.size > 0) {
				const animationPromises = [];
				for (const [
					key,
					indiciesWithMatchingSymbol,
				] of commonSymbolsMap.entries()) {
					soundManager.playSound("win");

					for (let i = 0; i < indiciesWithMatchingSymbol.length; i++) {
						const index = indiciesWithMatchingSymbol[i];
						const reelMatchingIndex = index[0];
						const symbolMatchingIndex = index[1];
						const matchedSymbol = reels[reelMatchingIndex][symbolMatchingIndex];
						animationPromises.push(matchedSymbol.play());
					}

					const symbolIdValuePair = JSON.parse(key);
					const matchedSymbolValue = symbolIdValuePair[1];

					let newScore = matchedSymbolValue;

					const indiciesWithMatchingSymbolSet = new Set(
						indiciesWithMatchingSymbol.map((subArray) =>
							JSON.stringify(subArray),
						),
					);

					// Check for multiplier:
					for (let j = 0; j < this._multiplierCombinations.length; j++) {
						const multiplierCombination = this._multiplierCombinations[j];
						const multiplierIndiciesSet = new Set(
							multiplierCombination.indicies.map((subArray) =>
								JSON.stringify(subArray),
							),
						);

						const allPresent = [...multiplierIndiciesSet].every((subArray) =>
							indiciesWithMatchingSymbolSet.has(subArray),
						);
						if (allPresent) {
							newScore *= multiplierCombination.value;
						}
					}
					this.score += newScore;
				}
				await Promise.all(animationPromises);
			}

			if (this.score > 99999999) {
				this.score = 0;
			}
		} catch (error) {
			console.error("Error during score check:", error);
		}
	}

	/**
	 * Generates a map of common symbols across all reels with their indices.
	 *
	 * @param {Array<Symbol[]>} reels - An array of reels where each reel is an array of symbols.
	 * @returns {Map<string, number[][]>} A map where the key is a stringified symbol [id, value] and the value is an array of indices where the symbol is found across reels.
	 */
	_generateMatchingSymbolsMap(reels) {
		try {
			// looks for common symbols across all reels, stores id /indicies in map
			const firstReel = reels[0];
			const symbolIndiciesMap = new Map(); //to be filled with symbol [id, value] pairs as key and values of corresponding indicies across reels for matched symbols

			for (
				let firstReelSymbolIndex = 0;
				firstReelSymbolIndex < firstReel.length;
				firstReelSymbolIndex++
			) {
				const testSymbolId = firstReel[firstReelSymbolIndex]._id;
				const testSymbolValue = firstReel[firstReelSymbolIndex]._value;

				let symbolFoundInAllReels = true;
				const matchingSymbolIndicies = []; //temp storage of indicies
				const symbolKey = JSON.stringify([testSymbolId, testSymbolValue]);
				if (symbolIndiciesMap.has(symbolKey)) {
					//if duplicate element on first reel, skip as all indicies will have already been accounted for
					continue;
				}

				for (let reelIndex = 0; reelIndex < reels.length; reelIndex++) {
					const reel = reels[reelIndex];
					let symbolFoundInCurrentReel = false;

					for (let symbolIndex = 0; symbolIndex < reel.length; symbolIndex++) {
						const symbol = reel[symbolIndex];
						if (symbol._id === testSymbolId) {
							matchingSymbolIndicies.push([reelIndex, symbolIndex]);
							symbolFoundInCurrentReel = true;
						}
					}

					if (!symbolFoundInCurrentReel) {
						symbolFoundInAllReels = false;
						break; // Exit the outer loop if the symbol is not found in the current reel
					}
				}

				if (symbolFoundInAllReels) {
					symbolIndiciesMap.set(symbolKey, matchingSymbolIndicies);
				}
			}
			return symbolIndiciesMap;
		} catch (error) {
			console.error("Error generating matching symbols map:", error);
			return new Map();
		}
	}
}
