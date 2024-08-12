import * as PIXI from "pixi.js";
import { Button } from "./button";

/**
 * Win Menu component class that creates and manages a win instructions overlay.
 */
export class WinMenu {
  /**
   * Creates an instance of WinMenu and initializes it.
   * @param {number} instructionsContainerX - The X position of the instructions container.
   * @param {number} instructionsContainerY - The Y position of the instructions container.
   * @param {number} instructionsContainerWidth - The width of the instructions container.
   * @param {number} instructionsContainerHeight - The height of the instructions container.
   * @param {Array<Object>} symbols - Array of symbol objects, each containing a name and value.
   * @param {Array<Object>} winMultipliers - Array of win multiplier objects, each containing a name and value.
   */
  constructor(
    instructionsContainerX,
    instructionsContainerY,
    instructionsContainerWidth,
    instructionsContainerHeight,
    symbols,
    winMultipliers,
  ) {
    this._instructionsContainerX = instructionsContainerX;
    this._instructionsContainerY = instructionsContainerY;
    this._instructionsContainerWidth = instructionsContainerWidth;
    this._instructionsContainerHeight = instructionsContainerHeight;
    this._symbols = symbols;
    this._symbolCount = symbols.length;
    this._winMultipliers = winMultipliers;

    this._initializeWinMenu();
  }

  /**
   * Initializes the win menu component.
   * @private
   */
  _initializeWinMenu() {
    this.instructionsContainer = new PIXI.Container();
    this.instructionsContainer.x = this._instructionsContainerX;
    this.instructionsContainer.y = this._instructionsContainerY;
    this.instructionsContainer.width = this._instructionsContainerWidth;
    this.instructionsContainer.height = this._instructionsContainerHeight;
    this.instructionsContainer.visible = false;
    this.instructionsContainer.eventMode = "static";

    const instructionsMenu = new PIXI.Graphics();
    instructionsMenu.beginFill("#36454F", 0.99);
    instructionsMenu.drawRoundedRect(
      0,
      0,
      this._instructionsContainerWidth,
      this._instructionsContainerHeight,
      10,
    );
    instructionsMenu.endFill();

    const instructionsCloseButton = new Button("minusActive", async () => {
      this.instructionsContainer.visible = false;
    });

    instructionsCloseButton.x = 0.94 * this._instructionsContainerWidth;
    instructionsCloseButton.y = 0.004 * this._instructionsContainerHeight;
    instructionsCloseButton._native.scale.set(0.5, 0.5);

    this._instructionsTitle = new PIXI.Text("How to Win!", {
      fontFamily: "Arial",
      fontSize: 36,
      fill: 0xffffff,
    });
    this._instructionsTitle.x =
      this._instructionsContainerWidth / 2 - this._instructionsTitle.width / 2;
    this._instructionsTitle.y = 0.01 * this._instructionsContainerHeight;

    this._instructions = new PIXI.Text(
      "Matching a specific symbol across all reels gives a base score:",
      {
        fontFamily: "Arial",
        fontSize: 24,
        fill: 0xffffff,
      },
    );
    const symbolPadding = 20;
    this._instructions.x = symbolPadding;
    this._instructions.y = this._instructionsTitle.height + 20;

    const symbolValuesContainer = new PIXI.Container();

    symbolValuesContainer.x = symbolPadding;
    symbolValuesContainer.y =
      this._instructionsTitle.height + this._instructions.height + 40;
    symbolValuesContainer.width = 870;
    this.instructionsContainer.addChild(instructionsMenu);
    this.instructionsContainer.addChild(this._instructionsTitle);
    this.instructionsContainer.addChild(this._instructions);
    this.instructionsContainer.addChild(instructionsCloseButton.native);
    this.instructionsContainer.addChild(symbolValuesContainer);

    const totalPadding = (this._symbolCount - 1) * symbolPadding;

    const availableWidth = 870 - totalPadding;

    const symbolContainerWidth = availableWidth / this._symbolCount;

    this._symbols.forEach((symbol, index) => {
      let singleSymbolValueContainer = new PIXI.Container();

      let xPosition = index * symbolContainerWidth + index * symbolPadding;

      singleSymbolValueContainer.x = xPosition;

      let instructionSymbol = PIXI.Sprite.from(`${symbol.name}Win1`);

      const aspectRatio = instructionSymbol.width / instructionSymbol.height;
      instructionSymbol.width = symbolContainerWidth;
      instructionSymbol.height = symbolContainerWidth / aspectRatio;
      instructionSymbol.x =
        (symbolContainerWidth - instructionSymbol.width) / 2;

      singleSymbolValueContainer.addChild(instructionSymbol);

      let valueText = new PIXI.Text(symbol.value, {
        fontSize: 24,
        fontFamily: "Arial",
        fill: 0xffffff,
      });
      valueText.y = instructionSymbol.height + 10;
      valueText.x = (symbolContainerWidth - valueText.width) / 2;
      singleSymbolValueContainer.addChild(valueText);

      symbolValuesContainer.addChild(singleSymbolValueContainer);
    });

    this._winMultiplierInstruction = new PIXI.Text(
      "There is a multiplier of your score if the symbols are arranged in given patterns:",
      {
        fontFamily: "Arial",
        fontSize: 24,
        fill: 0xffffff,
      },
    );
    this._winMultiplierInstruction.x = symbolPadding;
    this._winMultiplierInstruction.y =
      symbolValuesContainer.y + symbolValuesContainer.height + 60;
    this.instructionsContainer.addChild(this._winMultiplierInstruction);

    const winMultipliersContainer = new PIXI.Container();
    winMultipliersContainer.x = symbolPadding;
    winMultipliersContainer.y =
      this._winMultiplierInstruction.y +
      this._winMultiplierInstruction.height +
      60; // Positioning below symbolValuesContainer
    winMultipliersContainer.width = 870;
    this.instructionsContainer.addChild(winMultipliersContainer);

    // Get unique win multiplier entries
    const uniqueWinMultipliers = [
      ...new Map(
        this._winMultipliers.map((item) => [item.name, item]),
      ).values(),
    ];

    const winMultiplierCount = uniqueWinMultipliers.length;
    const winMultiplierTotalPadding = (winMultiplierCount - 1) * symbolPadding;
    const winMultiplierAvailableWidth = 870 - winMultiplierTotalPadding;
    const winMultiplierContainerWidth =
      winMultiplierAvailableWidth / winMultiplierCount;

    uniqueWinMultipliers.forEach((winMultiplier, index) => {
      let singleWinMultiplierContainer = new PIXI.Container();

      let xPosition =
        index * winMultiplierContainerWidth + index * symbolPadding;
      singleWinMultiplierContainer.x = xPosition;

      let nameText = new PIXI.Text(`${winMultiplier.name}:`, {
        fontFamily: "Arial",
        fontSize: 24,
        fill: 0xffffff,
        wordWrap: true,
        wordWrapWidth: winMultiplierContainerWidth,
        align: "center",
      });
      nameText.x = (winMultiplierContainerWidth - nameText.width) / 2;
      singleWinMultiplierContainer.addChild(nameText);

      let valueText = new PIXI.Text(`x${winMultiplier.value}`, {
        fontSize: 24,
        fontFamily: "Arial",
        fill: 0xffffff,
      });
      valueText.y = nameText.height + 10;
      valueText.x = (winMultiplierContainerWidth - valueText.width) / 2;
      singleWinMultiplierContainer.addChild(valueText);

      winMultipliersContainer.addChild(singleWinMultiplierContainer);
    });
  }
}
