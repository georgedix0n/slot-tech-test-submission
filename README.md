# Core Gaming HTML5/JavaScript Games Developer - Tech Test 

## Setup
* You will require node/npm. Run npm install on the package to install all required node_modules, with node version 18.0.0.
* To build a bundle use `npm run build`
* You will need a local server such as Live Server for visual studio code or https://www.npmjs.com/package/http-server

## Completed Tasks

Using ES6 and pixi js, implemented the following:
* Added win functionality, each matched symbol is given a base score. A set of multiplier patterns are also defined to multiply the score if there are horizontal or diagonal line matches, jackpot is all 3 lines of the same symbol.
* Used core as an entry point for a single scene builder, trying to keep any hard coded variables in one place, whilst moving each component for the scene into its own class and defined relative to these pre-set variables.
* Added scrolling clouds to the sky background.
* Added a win display, with different win values for different symbols.
* Added a balance display.
* Added a sound manager and sound loader, to be loaded in at same time as asset loading in core.js.
* Added a scroll sound on play and a win sound on win.
* Triggered play animation on win, of matched symbols.
* Added some graceful degradation error handling if certain errors are thrown e.g. if there are errors in the cloud generation or animation, it simply logs them, but continues with scene generation to avoid breaking unnecessarily.
* Added a reset score button, somewhat unnecessary but maintains symmetry in button UI.


Please see JSDoc Documentation for more information:
<iframe src="docs/index.html" width="100%" height="600px"></iframe>


## Things I would do with more time

* Implement jest testing with CI to validate all parameters of each component class. At the minute, I have assumed that the input is of correct form, this of course would be bad practice in a continually changing production environment, but somewhat unnecessary for a static test, given the time constraints.
* Improve error handling, using a centralised error handling class, with more specific errors. At the minute all errors are simply logged and tries to maintain a working, albeit more basic, application where possible. Main point of improvement is scoring system, many things can go wrong in that logic and each possibility should be accounted for.
* Add some randomness back into the speed of the clouds, very uniform at the minute.
* Improve win menu UI significantly, very low quality as is.
* Fix win animation bug, not always showing on screen even when triggering (beyond scope).
* Change AudioContext implementation with howler.js to avoid erros on application initialisation (triggering autoplay errors in chrome prior to interaction).
* Tidy up winMenu component class, removing any hard coded variables and instead making them dependent on widths/heights etc. provided in core.js; also spread out various parts into sub functions.
* Create a SceneBuilder class to allow for more complex/multiple scenes to be built, not really necessary as is though.



## The Test 

Given the simple 3 reel slot framework provided extend the functionality to evaluate and show wins. A win is considered to be a matching symbol displayed on each reel, multiple wins can be displayed at a time on each result.

Follow the framework structure where possible using ES6 and pixi.js

#### Optional Tasks 

* Add scrolling clouds to the sky background (assets provided)
* Add a win display and provide different win values for different symbols (some panel assets are provided)
* Add a balance display
* Sounds 

**Any Additional artwork required can be programmer art or anything you find around on the web.**
 
## Review Criteria 

We will be looking for: 

* Modular/Code organization. 
* Generic where appropriate. 
* Use of inheritance. 
* Clarity/Self documenting.
* Indenting. 
* Use of camel case. 
* Demonstrate understanding of JS scope. 
* Optimised code. 
* Use of callbacks / timers.
* use of async/await.
* Error Handling. 

## Submission 

Email as an attachment or a link to the git bundled repository showing your commit history with all your commits on the master branch: 

```
git bundle create <anything>.bundle --all --branches 
```

 
