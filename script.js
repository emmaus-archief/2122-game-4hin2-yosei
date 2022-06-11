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

var kogelX = [2000,2100,2200,2300,2400,2500,2600];
var kogelY = 2000;
var kogelVliegt = false;
var kogel;

var score = 0;
var HP = 3;
var snelheid = 3;
/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
var beweegAlles = function () {
  // speler
  if (keyIsDown(87)){
  spelerY = spelerY - 5;
}
  if (keyIsDown(83)){
    spelerY = spelerY + 5;
  }
  
  if (spelerY === 5 && keyIsDown(87)){
    spelerY = 720; 
  }
  
  if (spelerY === 715 && keyIsDown(83) ){
    spelerY = 0;
  }



  // vijand
  vijandX = vijandX +5;
  if (vijandX > 1300) {
  HP = HP - 1;
  vijandX = -30;
  vijandY = random(720)
  }


  // kogel
while (kogel < kogelX.length){
  fill("black")
  ellipse(20,20,kogelX[kogel],kogelY)
}
  
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
     kogelX < -0) { 
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
  fill("blue")
  rect(0,0,1280,720)
  // vijand
  fill("red");
  rect(vijandX - 25, vijandY - 25, 50, 50)
  
  
  // kogel
  fill("black");
  ellipse(kogelX, kogelY, 30, 30)
  // speler
  fill("white");
  rect(spelerX - 25, spelerY - 25, 50, 50);
  fill("black");
  ellipse(spelerX, spelerY, 10, 10);
  
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
  return false;
};

/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */

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
    textSize(50);
    fill("red");
    text("game over, druk op enter om opnieuw te beginnen", 87, 300);
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
      text("wasd om te bewegen en linkermuisknop om te schieten op de vijanden en als je wordt geraakt ben je af", 147, 340);
      text("druk op spatie om te beginnen", 147, 360)
      if (keyIsDown(32)){ //spatie
        spelerX = 1180;
        spelerY = 360;
        vijandX = -40;
        vijandY=random(720)
        spelStatus = SPELEN;
      }
      
    // teken uitleg scherm
      
    }
}
