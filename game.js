/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Rythym-Mania
@author: 
@tags: []aa
@addedOn: 2024-00-00
*/

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
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
setMap(levels[0])
// console.log(getAll(key[0].s));
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
setInterval(() => {
  addSprite(getRandomInt(1, width() - 1), 0, note);
}, 500);
// Game loop
// Game loop
let gameLoop = setInterval(() => {
  let currentNotes = getAll(note);
  currentNotes.forEach((item) => {
    if (item.y >= height() - 1) {
      item.remove();
    }
    item.y += 1;
  });
  for (let i = 0; i < key.length; i++) {
    let currentKeys = getAll(key[i].s);
    if (key[i].keyDown) {
      currentKeys.forEach((item) => {
        let checkTile = (x, y) => {
          return getTile(x, y).some(obj => obj._type === "n") || getTile(x, y - 1).some(obj => obj._type === "n") || getTile(x, y - 2).some(obj => obj._type === "n");
        };
        if (checkTile(item.x, item.y)) {
          playTune(key[i].melody);
        }
      });
    }
  }
}, 100);



//

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}
