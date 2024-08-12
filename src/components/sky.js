import * as PIXI from "pixi.js";
import { Tween } from "../utils/tween.js";

/**
 * Sky component class that creates a sky including a given number of clouds and animates clouds in the scene.
 */
export class Sky {
  /**
   * Creates an instance of Sky and initializes it.
   * @param {number} cloudCount - The number of clouds to generate.
   * @param {string[]} cloudTextureNames - Array of cloud texture names to randomly assign to clouds.
   * @param {number} cloudAnimationDuration - Duration (in seconds) for clouds to traverse the horizontal width of the screen.
   * @param {string} skyColour - The color of the sky, specified as a hexadecimal string.
   * @param {number} canvasWidth - The width of the canvas where the sky will be rendered.
   * @param {number} canvasHeight - The height of the canvas where the sky will be rendered.
   */
  constructor(
    cloudCount,
    cloudTextureNames,
    cloudAnimationDuration,
    skyColour,
    canvasWidth,
    canvasHeight,
  ) {
    this._errors = this._validateParameters(
      cloudCount,
      cloudTextureNames,
      cloudAnimationDuration,
      skyColour,
      canvasWidth,
      canvasHeight,
    );

    if (this._errors.length > 0) {
      throw new Error(this._errors.join(" "));
    }
    this._cloudCount = cloudCount;
    this._cloudTextureNames = cloudTextureNames;
    this._cloudAnimationDuration = cloudAnimationDuration;
    this._skyColour = skyColour;
    this._canvasWidth = canvasWidth;
    this._canvasHeight = canvasHeight;
    this.skyContainer = new PIXI.Container();
    this.skyContainer.name = "skyContainer";
    this._initializeSky();
  }

  /**
   * Initializes the sky component.
   * @private
   */
  _initializeSky() {
    try {
      //creates blue graphic, covering full screen, for sky backdrop
      this._sky = new PIXI.Graphics();
      this._sky.beginFill(this._skyColour);
      this._sky.drawRect(0, 0, this._canvasWidth, this._canvasHeight / 2);
      this._sky.endFill();

      this.skyContainer.addChild(this._sky);

      if (this._cloudCount > 0) {
        try {
          this._clouds = this._createClouds();
        } catch (error) {
          console.error("Error creating clouds:", error);
          this._clouds = [];
        }
        try {
          this._animateAllClouds(this._clouds);
        } catch (error) {
          console.error("Error animating clouds:", error);
        }
      }
    } catch (error) {
      console.error("Error initializing sky:", error);
    }
  }

  /**
   * Creates the specified number of clouds with random textures. Assigns varying duration values to clouds, to retain a constant speed. Assigns varying offsets in both x and y to each clouds position.
   *
   * @private
   * @returns {PIXI.Sprite[]} An array of cloud sprites.
   */
  _createClouds() {
    const clouds = [];

    for (let i = 0; i < this._cloudCount; i++) {
      const textureName = this._getRandomTexture();
      const cloud = PIXI.Sprite.from(textureName);

      const firstCloudSpeed = this._canvasWidth / this._cloudAnimationDuration; //sets first cloud as base speed of all clouds

      const offsetCloudTravelDistance =
        this._canvasWidth + i * (this._canvasWidth / this._cloudCount); //spreads clouds out equally across negative canvas width (out of view)

      const offsetCloudDuration = offsetCloudTravelDistance / firstCloudSpeed; //calculates extra duration travelled by offset as to regularize speeds

      if (i === 0) {
        cloud.x = -cloud.width; ///ensures first cloud comes on scene relatively quickly
        cloud.animationDuration = Math.floor(
          this._cloudAnimationDuration * 1000,
        ); ///to milliseconds
      } else {
        cloud.x = -offsetCloudTravelDistance;
        cloud.animationDuration = Math.floor(offsetCloudDuration * 1000);
      }

      cloud.y = Math.random() * (0.001 * this._canvasHeight); // Keeps clouds in top 0.1% of sky

      this.skyContainer.addChild(cloud);
      clouds.push(cloud);
    }

    return clouds;
  }

  /**
   * Cloud animation.
   *
   * @param {PIXI.Sprite} cloud - The cloud sprite to animate.
   *
   * @async
   */
  async _animateCloud(cloud) {
    this.tween = Tween.fromTo(
      cloud,
      cloud.animationDuration, //error
      { x: cloud.x },
      { x: this._canvasWidth, repeat: -1 },
    ).startPromise();
  }

  /**
   * Animates all clouds with a random delay for each.
   *
   * @param {PIXI.Sprite[]} clouds - An array of cloud sprites to animate.
   *
   * @async
   */
  async _animateAllClouds(clouds) {
    const animationPromises = [];

    clouds.forEach((cloud) => {
      const animationPromise = this._animateCloud(cloud);
      animationPromises.push(animationPromise);
    });
  }

  /**
   * Picks a random texture name from the provided array.
   *
   * @private
   * @returns {string} The selected texture name.
   */
  _getRandomTexture() {
    const randomIndex = Math.floor(
      Math.random() * this._cloudTextureNames.length,
    );
    return this._cloudTextureNames[randomIndex];
  }

  /**
   * Validates the constructor parameters.
   *
   * This method checks all input parameters and collects any validation errors found.
   * If any parameter is invalid, an error message is added to the returned array.
   *
   * @private
   * @param {number} cloudCount - The number of clouds to generate.
   * @param {string[]} cloudTextureNames - Array of cloud texture names to randomly assign to clouds.
   * @param {number} cloudAnimationDuration - Duration (in seconds) for clouds to traverse the horizontal width of the screen.
   * @param {string} skyColour - The color of the sky, specified as a hexadecimal string.
   * @param {number} canvasWidth - The width of the canvas where the sky will be rendered.
   * @param {number} canvasHeight - The height of the canvas where the sky will be rendered.
   * @returns {string[]} An array of error messages. Each message describes an invalid parameter.
   */
  _validateParameters(
    cloudCount,
    cloudTextureNames,
    cloudAnimationDuration,
    skyColour,
    canvasWidth,
    canvasHeight,
  ) {
    const errors = [];
    // Validate cloudCount
    if (typeof cloudCount !== "number") {
      errors.push(
        `Invalid cloudCount: "${cloudCount}". It must be a positive number.`,
      );
    }
    // Validate cloudTextureNames and cloudAnimationDuration only if cloudCount is valid
    if (this.cloudCount > 0) {
      if (
        !Array.isArray(cloudTextureNames) ||
        cloudTextureNames.length === 0 ||
        !cloudTextureNames.every((name) => typeof name === "string")
      ) {
        errors.push(
          `Invalid cloudTextureNames: "${cloudTextureNames}". It must be a non-empty array of strings.`,
        );
      }
      if (typeof cloudAnimationDuration !== "number") {
        errors.push(
          `Invalid cloudAnimationDuration: "${cloudAnimationDuration}". It must be a positive number.`,
        );
      }
    }
    // Validate canvasWidth
    if (typeof canvasWidth !== "number" || canvasWidth <= 0) {
      errors.push(
        `Invalid canvasWidth: "${canvasWidth}". It must be a positive number.`,
      );
    }
    // Validate canvasHeight
    if (typeof canvasHeight !== "number" || canvasHeight <= 0) {
      errors.push(
        `Invalid canvasHeight: "${canvasHeight}". It must be a positive number.`,
      );
    }
    // Validate skyColour
    const hexColorRegex = /^(#?(0x|0X)?[a-fA-F0-9]+)$/;
    if (!hexColorRegex.test(skyColour)) {
      errors.push(`Invalid skyColour provided: "${skyColour}".`);
    }

    return errors;
  }
}
