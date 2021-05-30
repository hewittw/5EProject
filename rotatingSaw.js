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
  var c = 0.05
  var localA = a;

  var startX = circleX + r*(Math.cos(localA - ((2-c) *aChange)));
  var startY = circleY + r*(Math.sin(localA - ((2-c)*aChange)));
  var middleX = circleX + r2*(Math.cos(localA));
  var middleY = circleY + r2*(Math.sin(localA));
  var endX = circleX + r*(Math.cos(localA + (c * aChange)));
  var endY = circleY + r*(Math.sin(localA + (c * aChange)));


  ctx.beginPath();
  ctx.arc(middleX, fixY(middleY), canvas.height*0.02, 0, 2 * Math.PI);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(canvas.width/2, canvas.height/2);
  ctx.lineTo(middleX, fixY(middleY));
  ctx.stroke();


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

}

function drawExtra (ctx) {
  ctx.beginPath();
  ctx.arc(canvas.width/2, canvas.height/2, canvas.height*0.02, 0, 2 * Math.PI);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.stroke();
}

function drawAll () {
  /*
  */
  // One of the attributes of the event object is 'which,' contains the key
  //   that was pressed to trigger the event listener.
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawTooth(ctx, a, canvas.width/2, canvas.height/2, canvas.height/4, 25, canvas.height/3.25);
  drawExtra(ctx);
  if (a < userAngle){
    a+= 2*Math.PI * 0.005
    if (a > userAngle){
      a = userAngle;
    }
  } else if (a > userAngle){
    a-= 2*Math.PI * 0.005
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


// static main starts here
// Get the canvas, set the width and height from the window
canvas = document.getElementById("mainCanvas");
canvas.style.border = "1px solid black";

// Set up the context for the animation
ctx = canvas.getContext("2d"); // object that let's us work with we the canvas

var a = 0;
var userAngle = 0;
drawTooth(ctx, canvas.width/2, canvas.height/2, canvas.height/4, 25, canvas.height/3.25);

// Fire up the animation engine
window.requestAnimationFrame(drawAll);
