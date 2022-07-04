"use strict";

/* global XXH */
/* exported --
    p3_preload
    p3_setup
    p3_worldKeyChanged
    p3_tileWidth
    p3_tileHeight
    p3_tileClicked
    p3_drawBefore
    p3_drawTile
    p3_drawSelectedTile
    p3_drawAfter
*/
const pinkcolor = "#FF5D8F";
const redd = "#B20608";
const purplee = "#7909C3";
const black = "#0A0A0A";
const white = "#FFFFFF";
const brown = "#7A4100";
const gray = "#858585";
const darkred = "#4F0204";
const lightred = "#F91018";

function p3_preload() {}

function p3_setup() {}

let worldSeed;

function p3_worldKeyChanged(key) {
  worldSeed = XXH.h32(key, 0);
  noiseSeed(worldSeed);
  randomSeed(worldSeed);
}

function p3_tileWidth() {
  return 64;
}
function p3_tileHeight() {
  return 64;
}

let [tw, th] = [p3_tileWidth(), p3_tileHeight()];

let clicks = {};

function p3_tileClicked(i, j) {
  let key = [i, j];
  clicks[key] = 1 + (clicks[key] | 0);
  console.log(i, j);
}

function p3_drawBefore() {}

function p3_drawTile(i, j) {
  noStroke();
  fill(noise(i, j) * 255)

  push();

  let rand = noise(i,j);
  if(rand < 0.33)
  {
    drawJail();
    
  }
  else if (rand < 0.66 && rand >= 0.33)
  {
    drawTeeth();
  }
  else
  {
    drawVolcano();
  }


  let n = clicks[[i, j]] | 0;
  if (n % 2 == 1) {
    drawClick(i,j);
  }

  pop();
}

function p3_drawSelectedTile(i, j) {
  noFill();
  
  stroke(255, 204, 0);
  strokeWeight(4);

  beginShape();
  vertex(0, 0);
  vertex(0, tw);
  vertex(th, tw);
  vertex(th, 0);
  endShape(CLOSE);

  noStroke();
  fill(0);
  text("(" + [i, j] + ")", 0, 0);
}

function p3_drawAfter() {}

function drawTeeth()
{
  fill(brown);
  noStroke();
  rect(0, 0, th, tw);
  fill (white);

  //add teeth
  triangle(0, 0, 15, 0, 7.5, 15);
  triangle(15, 0, 30, 0, 22.5, 15);
  triangle(30, 0, 45, 0, 37.5, 15);
  triangle(45, 0, 60, 0, 52.5, 15);
  triangle(0, 64, 15, 64, 7.5, 49);
  triangle(15, 64, 30, 64, 22.5, 49);
  triangle(30, 64, 45, 64, 37.5, 49);
  triangle(45, 64, 60, 64, 52.5, 49);
}

function drawVolcano()
{
  //add volcano
  fill(gray);
  noStroke();
  rect(0, 0, th, tw);
  fill(brown);
  quad(0, 64, 22, 20, 44, 20, 64, 64);
  fill(darkred);
  quad(17, 30, 22, 20, 44, 20, 48, 30);
  fill(lightred)
  quad(20, 23, 22, 20, 44, 20, 46, 23);
  //add smoke
  fill(lightred)
  circle(36,12,10)
  circle(33,6,9)
  circle(30,14, 8)
}

function drawJail()
{
  fill(gray);
  noStroke();
  rect(0, 0, th, tw);
  fill(black)
  quad(7, 64, 7, 0, 10, 0,10, 64);
  quad(19, 64, 19, 0, 22, 0,22, 64);
  quad(31, 64, 31, 0, 34, 0,34, 64);
  quad(43, 64, 43, 0, 46, 0,46, 64);
  quad(55, 64, 55, 0, 58, 0,58, 64);
}

function drawClick(i,j)
{
  //add shape
  fill(purplee);
  triangle(32, 6, 21, 18, 42, 18);
  triangle(21, 18, 10, 30, 21, 45);
  triangle(42, 18, 53, 30, 42, 45);
  triangle(21, 45, 42, 45, 32, 58);

  //add eye
  fill(redd);
  circle(th/2, tw/2, 18);
  fill(black);
  circle(th/2, tw/2, 8);
  fill(white);
  circle(th/2, tw/2, 3);
}
