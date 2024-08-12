## Classes

<dl>
<dt><a href="#Button">Button</a></dt>
<dd><p>Basic button class creates a sprite object and adds interaction callback</p>
</dd>
<dt><a href="#ScoreCounter">ScoreCounter</a></dt>
<dd><p>Score counter component class.</p>
</dd>
<dt><a href="#Sky">Sky</a></dt>
<dd><p>Sky component class that creates a sky including a given number of clouds and animates clouds in the scene.</p>
</dd>
<dt><a href="#WinMenu">WinMenu</a></dt>
<dd><p>Win Menu component class that creates and manages a win instructions overlay.</p>
</dd>
<dt><a href="#Reel">Reel</a></dt>
<dd><p>Base reel class to handle a single reel spinning random symbols throuhg a reel apature</p>
</dd>
<dt><a href="#ReelManager">ReelManager</a></dt>
<dd><p>Reel manager controls multipler reels</p>
</dd>
<dt><a href="#Symbol">Symbol</a> ⇐ <code>Base</code></dt>
<dd><p>Symbol</p>
</dd>
<dt><a href="#SymbolStore">SymbolStore</a></dt>
<dd><p>Symbol store used to create all symbols at initialisation for use through the game</p>
</dd>
<dt><a href="#ScoreManager">ScoreManager</a></dt>
<dd><p>Manages the scoring logic in the game based on the reels and multiplier combinations.</p>
</dd>
<dt><a href="#SoundManager">SoundManager</a></dt>
<dd><p>SoundManager class</p>
</dd>
<dt><a href="#Timer">Timer</a></dt>
<dd><p>simple timer class</p>
</dd>
<dt><a href="#TimerManager">TimerManager</a></dt>
<dd><p>timer manager creates and manages any timers</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#SymbolObject">SymbolObject</a></dt>
<dd></dd>
</dl>

<a name="SymbolStore"></a>

## SymbolStore
Symbol store used to create all symbols at initialisation for use through the game

**Kind**: global class  

* [SymbolStore](#SymbolStore)
    * [.createSymbols(symbolIds, reels, rows)](#SymbolStore+createSymbols)
    * [.getRandomSymbol()](#SymbolStore+getRandomSymbol) ⇒ [<code>Symbol</code>](#Symbol)
    * [.getSymbol(id)](#SymbolStore+getSymbol) ⇒ [<code>Symbol</code>](#Symbol)
    * [.returnSymbol(symbol)](#SymbolStore+returnSymbol)

<a name="SymbolStore+createSymbols"></a>

### symbolStore.createSymbols(symbolIds, reels, rows)
**Kind**: instance method of [<code>SymbolStore</code>](#SymbolStore)  

| Param | Type | Description |
| --- | --- | --- |
| symbolIds | [<code>Array.&lt;SymbolObject&gt;</code>](#SymbolObject) | Array of objects to create the symbols |
| reels | <code>number</code> | number of reels |
| rows | <code>number</code> | number of symbols in view |

<a name="SymbolStore+getRandomSymbol"></a>

### symbolStore.getRandomSymbol() ⇒ [<code>Symbol</code>](#Symbol)
get a random symbol from the store

**Kind**: instance method of [<code>SymbolStore</code>](#SymbolStore)  
<a name="SymbolStore+getSymbol"></a>

### symbolStore.getSymbol(id) ⇒ [<code>Symbol</code>](#Symbol)
get a specific symbol type based on id

**Kind**: instance method of [<code>SymbolStore</code>](#SymbolStore)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | id of the symbol to retrieve |

<a name="SymbolStore+returnSymbol"></a>

### symbolStore.returnSymbol(symbol)
return a used symbol to the store ready for reuse

**Kind**: instance method of [<code>SymbolStore</code>](#SymbolStore)  

| Param | Type | Description |
| --- | --- | --- |
| symbol | [<code>Symbol</code>](#Symbol) | symbol to return to the store |

<a name="SoundManager"></a>

## SoundManager
SoundManager class

**Kind**: global class  

* [SoundManager](#SoundManager)
    * [.loadSound(key, src)](#SoundManager+loadSound)
    * [.playSound(key)](#SoundManager+playSound)
    * [.stopSound(key)](#SoundManager+stopSound)

<a name="SoundManager+loadSound"></a>

### soundManager.loadSound(key, src)
Load a sound asset

**Kind**: instance method of [<code>SoundManager</code>](#SoundManager)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | the key to reference the sound |
| src | <code>string</code> | the source file path of the sound |

<a name="SoundManager+playSound"></a>

### soundManager.playSound(key)
Play a sound by its key

**Kind**: instance method of [<code>SoundManager</code>](#SoundManager)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | the key of the sound to play |

<a name="SoundManager+stopSound"></a>

### soundManager.stopSound(key)
Stop a sound by its key

**Kind**: instance method of [<code>SoundManager</code>](#SoundManager)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | the key of the sound to stop |

<a name="TimerManager"></a>

## TimerManager
timer manager creates and manages any timers

**Kind**: global class  

* [TimerManager](#TimerManager)
    * [.init()](#TimerManager+init)
    * [.startTimer(delay)](#TimerManager+startTimer)

<a name="TimerManager+init"></a>

### timerManager.init()
links timer manager to pixi ticker updates

**Kind**: instance method of [<code>TimerManager</code>](#TimerManager)  
<a name="TimerManager+startTimer"></a>

### timerManager.startTimer(delay)
Start an awaitable timer

**Kind**: instance method of [<code>TimerManager</code>](#TimerManager)  

| Param | Type | Description |
| --- | --- | --- |
| delay | <code>number</code> | delay in milliseconds |

<a name="SymbolObject"></a>

## SymbolObject
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | Id of the symbol |
| name | <code>string</code> | name of the symbol |

