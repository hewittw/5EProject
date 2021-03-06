// Global variables here
// Count frames, track time so we can compute fps rate
var frames = 0;
var start = new Date();
var now = new Date();
console.log(start);

// functions start here

function fixY(yValue){
  return canvas.height - yValue;
}

function drawTooth(ctx, a, circleX, circleY, r, numTeeth, r2){
  var aChange = 2*Math.PI/(numTeeth*2)
  var c = 0.05;
  var localA = a;

  var OGmiddleX = circleX + r2*(Math.cos(localA));
  var OGmiddleY = circleY + r2*(Math.sin(localA));

  let coords = [OGmiddleX, OGmiddleY];

  ctx.beginPath();
  ctx.arc(OGmiddleX, fixY(OGmiddleY), canvas.height*0.02, 0, 2 * Math.PI);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(canvas.width/2, canvas.height/2);
  ctx.lineTo(OGmiddleX, fixY(OGmiddleY));
  ctx.stroke();

  // slope lines
  ctx.strokeStyle = "#ffa500";
  ctx.beginPath();
  ctx.moveTo(OGmiddleX, canvas.height/2);
  ctx.lineTo(OGmiddleX, fixY(OGmiddleY));
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(canvas.width/2, fixY(OGmiddleY));
  ctx.lineTo(OGmiddleX, fixY(OGmiddleY));
  ctx.stroke();
  ctx.strokeStyle = "#000000";



  for (var i = 0; i < numTeeth; i++){

    var startX = circleX + r*(Math.cos(localA - ((2-c) *aChange)));
    var startY = circleY + r*(Math.sin(localA - ((2-c) *aChange)));
    var middleX = circleX + r2*(Math.cos(localA));
    var middleY = circleY + r2*(Math.sin(localA));
    var endX = circleX + r*(Math.cos(localA + (c * aChange)));
    var endY = circleY + r*(Math.sin(localA + (c * aChange)));

    ctx.beginPath();
    ctx.moveTo(startX, fixY(startY));
    ctx.lineTo(middleX, fixY(middleY));
    ctx.stroke();
    ctx.beginPath();
    ctx.lineTo(middleX, fixY(middleY));
    ctx.lineTo(endX, fixY(endY));
    ctx.stroke();


    localA += 2 * aChange;
    console.log("changing a");

  }

  return coords;
}

function drawExtra (ctx) {
  ctx.beginPath();
  ctx.arc(canvas.width/2, canvas.height/2, canvas.height*0.02, 0, 2 * Math.PI);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.stroke();
}

function round (num){
  num = Math.round(num * 100000) / 100000;
  //if (a == ) // check for the no slope values here and return accordingly
  return num;
}

function addText (a) {
  // need to turn the window coordinates into the unit circle coordinates
  xCoord = round(Math.cos(a));
  yCoord = round(Math.sin(a));
  myDiv.innerHTML = "<h2>Red tooth coordinates: (" + xCoord + ", " + yCoord + ")</h2>";
  tan = Math.tan(a);
  oldUserAngle = document.getElementById('angle').value;
  if (Math.abs(oldUserAngle-90) % 180 == 0) {
    myDiv.innerHTML += "<br><h2>Tan value: undefined</h2>";
    tan = "undefined";
  } else {
    myDiv.innerHTML += "<h2>Tan value: " + round(tan) + "</h2>";
    tan = round(tan);
  }
  myDiv.innerHTML += "Type into desmos:";
  myDiv.innerHTML += "<br>y = tan(t)";
  myDiv.innerHTML += "<br>y = " + tan + "<br>";
  myDiv.innerHTML += "<br>These intersection points represent all the values of 't' that correspond to a tan value of " + tan;
  myDiv.innerHTML += "<br>See if you can find your time on there :) (X coord = time)";
}

function drawAxes () {
  ctx.strokeStyle = "#808080";
  ctx.beginPath();
  ctx.moveTo(canvas.width/2, 0);
  ctx.lineTo(canvas.width/2, canvas.height);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, canvas.height/2);
  ctx.lineTo(canvas.width, canvas.height/2);
  ctx.stroke();
  ctx.strokeStyle = "#000000";

}

function drawAll () {
  /*
  */
  // One of the attributes of the event object is 'which,' contains the key
  //   that was pressed to trigger the event listener.
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  coords = drawTooth(ctx, a, canvas.width/2, canvas.height/2, canvas.height/4, 25, canvas.height/3.25);
  drawExtra(ctx);
  addText(a);
  drawAxes();
  if (a < userAngle){
    a+= 2*Math.PI * 0.005;
    if (a > userAngle){
      a = userAngle;
    }
  } else if (a > userAngle){
    a-= 2*Math.PI * 0.005;
    if (a < userAngle){
      a = userAngle;
    }
  }


  // Loop the animation to the next frame.
  window.requestAnimationFrame(drawAll);
}

function myClick (){
  // get the angle from the user
  userAngle = document.getElementById('angle').value;
  console.log(userAngle);
  userAngle = Math.PI/180 * userAngle;
  console.log("registered lcick");
  console.log(userAngle);
  window.requestAnimationFrame(drawAll);


}

function myKeyDown (event) {
  keyStr = event.key;
  if (keyStr === 'Enter'){
    myClick();
  }
  console.log("in my key down");
}


// static main starts here
// Get the canvas, set the width and height from the window
canvas = document.getElementById("mainCanvas");
canvas.style.border = "1px solid black";

document.addEventListener("keydown", myKeyDown);

// Set up the context for the animation
ctx = canvas.getContext("2d"); // object that let's us work with we the canvas

var a = 0;
var userAngle = 0;
drawTooth(ctx, canvas.width/2, canvas.height/2, canvas.height/4, 25, canvas.height/3.25);

// Fire up the animation engine
window.requestAnimationFrame(drawAll);
