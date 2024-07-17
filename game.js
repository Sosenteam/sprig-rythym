/*
GOALS:
[✔]LOWER HITBOX
[✔]ADD MENU
[✔]MAKE NOTES DISAPPEAR WHEN HIT
[✔]ADD SCORE
[]ADD DIFFICULTY/SPEED

[]ALLOW WRITING CUSTOM SONGS  (pass array of ints 0-5/1-6 to var)

MAYBES:
[]ALLOW SONGS TO END AND RETURN TO MENU
[]MAKE MENU OF SONGS TO CHOOSE FROM
[]INCREASE POLLING RATE (make it more responsive to keyboard press)
[]ALLOW CUSTOM SONGS TO PLAY CUSTOM MEDLEYS
[]

@title: Rythym-Mania
@author: sosenteam
@tags: ["rythym-game"]
@addedOn: 2024-7-16
*/
let gameMode = "startScreen";
//DONT CHANGE
let screen = 0; // 0 = Menu
let score = 0; 
let isDefaultColor = true;
const note = "n"
//
// Constructor function for Person objects
function createKey(letter, melody, key) {
  this.s = letter;
  this.melody = melody;
  this.key = key;
  this.keyDown = false;

}
let key = [];
key.push(new createKey("a", tune`
300: C4~300,
9300`, "a"));
key.push(new createKey("b", tune`
300: D4~300,
9300`, "s"));
key.push(new createKey("c", tune`
300: E4~300,
9300`, "d"));
key.push(new createKey("d", tune`
300: G4~300,
9300`, "j"));
key.push(new createKey("e", tune`
300: A4~300,
9300`, "k"));
key.push(new createKey("f", tune`
300: C5~300,
9300`, "l"));


setLegend(
  [note, bitmap`
................
................
.....000000.....
...0000000000...
...00LLLLLL00...
..00LL1111LL00..
..00L111111L00..
..00L111111L00..
..00L111111L00..
..00L111111L00..
..00LL1111LL00..
...00LLLLLL00...
...0000000000...
.....000000.....
................
................`],
  [key[0].s, bitmap`
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888`],
  [key[1].s, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
  [key[2].s, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
  [key[3].s, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`],
  [key[4].s, bitmap`
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999`],
  [key[5].s, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`],
  ["y", bitmap`
..00000000000000
..00000000000000
..00000000000000
..00000000000000
..00000000000000
..00000000000000
..00000000000000
..00000000000000
..00000000000000
..00000000000000
..00000000000000
..00000000000000
..00000000000000
..00000000000000
..00000000000000
..00000000000000`],
  ["z", bitmap`
0000000000000...
0000000000000...
0000000000000...
0000000000000...
0000000000000...
0000000000000...
0000000000000...
0000000000000...
0000000000000...
0000000000000...
0000000000000...
0000000000000...
0000000000000...
0000000000000...
0000000000000...
0000000000000...`]
)

setSolids([])

const levels = [
  map`
zabcdefy
zabcdefy
zabcdefy
zabcdefy
zabcdefy
zabcdefy
zabcdefy
zabcdefy
zabcdefy
zabcdefy
zabcdefy
zabcdefy
zabcdefy`,
  map`
z......y
z......y
z......y
z......y
z......y
z......y
z......y
z......y
z......y
z......y
z......y
zabcdefy
z......y`
]
setMap(levels[screen]);
//KEYBINDINGS
for (let i = 0; i < key.length; i++) {
  const currentKey = key[i];

  onInput(currentKey.key, () => {
    currentKey.keyDown = true;
    //console.log("KEY " + currentKey.key + " IS DOWN");
    setTimeout(() => {
      currentKey.keyDown = false;
    }, 100);
  });
}
//

//MENU
if (screen == 0) {
  addText("Rythym", {
    x: 7,
    y: 4,
    color: color`0`
  })
  addText("Mania", {
    x: 8,
    y: 6,
    color: color`0`
  })
  let textFlash = setInterval(() => {
    if(screen == 0){
    const currentColor = isDefaultColor ? color`0` : color`2`;
    addText("Press", {
      x: 7,
      y: 12,
      color: currentColor
    })
    addText("A", {
      x: 10,
      y: 14,
      color: currentColor
    })
    isDefaultColor = !isDefaultColor;
    }
  }, 500);
  let menuTimer = setInterval(() => {
    if (key[0].keyDown) {
      screen = 1;
      clearText();
      clearInterval(menuTimer);
      clearInterval(textFlash);
      startGameloop();
      
      setMap(levels[screen]);
      gameMode = "random"
      setGamemodeRandom()

    }
  }, 100)
}



function setGamemodeRandom() {
  if (gameMode == "random") {
    setInterval(() => {
      addSprite(getRandomInt(1, width() - 1), 0, note);
    }, 500);
  }
}

function startGameloop() {
  //console.log("Game loop started");
  // Game loop
  let gameLoop = setInterval(() => {
    //SCORE
    clearText();
    addText(score.toString(), {
      x: 9,
      y: 0,
      color: color`0`
    })
    //
    let currentNotes = getAll(note);
    currentNotes.forEach((item) => {
      if (item.y >= height() - 1) {
        item.remove();
        score = 0;
      }
      item.y += 1;
    });
    for (let i = 0; i < key.length; i++) {
      let currentKeys = getAll(key[i].s);
      if (key[i].keyDown) {
        currentKeys.forEach((keyItem) => {
          let checkTile = (x, y) => {
            return getTile(x, y).some(obj => obj._type === "n") || getTile(x, y - 1).some(obj => obj._type === "n")
          };
          if (checkTile(keyItem.x, keyItem.y)) {
            //
            playTune(key[i].melody);
            score++;
            currentNotes.forEach((item) => {
              if (item.y >= keyItem.y - 2 && item.x == keyItem.x) {
                item.remove();
              }
            });
          }
        });
      }
    }
  }, 100);
}


//

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
