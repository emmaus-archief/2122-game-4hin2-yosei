/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */

/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */

const SPELEN = 1;
const GAMEOVER = 2;
const UITLEG = 3;
var spelStatus = UITLEG;

var spelerX = 1180; // x-positie van speler
var spelerY = 360; // y-positie van speler
var aantal = 9;

var vijandX = -40;
var vijandY = 300;

var kogelX = 2000;
var kogelY = 2000;
var kogelVliegt = false;
var kogel;

var score = 0;
var HP = 3;
var snelheid = 5;

var s = [15,16,17,18,19,20,21,22,23,24,25];
var i = 0;

var img;
var img2;
var img3;
var img4;
var img5;
/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
var beweegAlles = function () {
  // speler
  if (keyIsDown(87)){
  spelerY = spelerY - 7;
}
  if (keyIsDown(83)){
    spelerY = spelerY + 7;
  }
  
  if (spelerY < 5 && keyIsDown(87)){
    spelerY = 720; 
  }
  
  if (spelerY > 715 && keyIsDown(83) ){
    spelerY = 0;
  }
    if(score === s[i]){
    snelheid = snelheid + 1
    i = i + 1
    }



  // vijand
  vijandX = vijandX + snelheid;
  if (vijandX > 1300) {
  HP = HP - 1;
  vijandX = -30;
  vijandY = random(720)
  }
  if (score === 20) {
    snelheid = 8;
  }

  // kogel

if (kogelVliegt === false &&
    mouseIsPressed) {
  kogelVliegt = true;
  kogelY = spelerY;
  kogelX = spelerX;
}
  if (kogelVliegt === true) {  
    kogelX = kogelX - 30;
  }
  if (kogelVliegt === true &&
     kogelX < -20) { 
    kogelVliegt = false;
  }
};

/**
 * Checkt botsingen
 * Verwijdert neergeschoten dingen
 * Updatet globale variabelen punten en health
 */

var verwerkBotsing = function () {
  // botsing speler tegen vijand

  // botsing kogel tegen vijand
    if (kogelX - vijandX < 50 &&
      kogelX - vijandX >-50 &&
      kogelY - vijandY <50 &&
      kogelY - vijandY > -50) {
    console.log("Botsing");
      score = score + 1;
      vijandX = -30;
      vijandY = random(720)
      kogelX = -30;
      }
  // update punten en health

};


/**
 * Tekent spelscherm
 */
var tekenAlles = function () {
  // achtergrond
  image(img, 0,0,1280,720);

  // vijand
  image(img4, vijandX,vijandY,60,60);
  
  // kogel
  image(img2, kogelX,kogelY,30,10);
  // speler
  image(img3, spelerX-10,spelerY-25,60,60);
    

  // punten en health

};

/**
 * return true als het gameover is
 * anders return false
 */
var checkGameOver = function () {
    if (HP < 1) {
    console.log("Botsing");
      return true;
      }
  
  
  // check of HP 0 is , of tijd op is, of ...
  return false;w
};

/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */
function preload() {
  img = loadImage('space.png');
  img2 = loadImage('kogel.png')
  img3 = loadImage('spaceship.png')
  img4 = loadImage('vijand.png')
  img5 = loadImage('gameover.png')
}
/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  background('blue');
}

/**
 * draw
 * de code in deze functie wordt 50 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  if (spelStatus === SPELEN) {
    beweegAlles();
    verwerkBotsing();
    tekenAlles();
    textSize(40)
    fill("white")
    text(score, 100,100)
    text(HP, 100,140)
    if (checkGameOver()) {
      spelStatus = GAMEOVER;
    }
  }
  if (spelStatus === GAMEOVER) {
    console.log("game over")
    textSize(90);
    fill("red");
    text("GAME OVER", 380, 100);
    textSize(50);
    text("PRESS ENTER TO RESTART", 340, 200)
    if (keyIsDown(13)){ //enter
      spelStatus = UITLEG;
    }    
    // teken game-over scherm

  }
    if (spelStatus === UITLEG) {
      console.log("uitleg")
      textSize(20);
      fill("blue")
      rect(0,0, 1280, 720);
      fill("white")
      text("uitleg", 600, 300);
      text("WS om te bewegen en linkermuisknop om te schieten op de vijanden. Als je 3 keer een vijand mist ben je af.", 147, 340);
      text("druk op spatie om te beginnen", 147, 360)
      if (keyIsDown(32)){ //spatie
        spelerX = 1180;
        spelerY = 360;
        vijandX = -40;
        vijandY=random(720)
        HP = 3;
        score = 0;
        snelheid = 5;
        spelStatus = SPELEN;
      }
      
    // teken uitleg scherm
      
    }
}
