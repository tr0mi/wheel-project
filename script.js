var start;
var a = 0;
var b = 0;
window.addEventListener("gamepaddisconnected", function(e) {
  gamepadInfo.innerHTML = "Waiting for gamepad.";
  cancelRequestAnimationFrame(start);
});

var interval;

if (!('ongamepadconnected' in window)) {
  // No gamepad events available, poll instead.
  interval = setInterval(pollGamepads, 500);
}

function pollGamepads() {
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
  console.log(gamepads);
  for (var i = 0; i < gamepads.length; i++) {
    var gp = gamepads[i];
    if (gp) {
      gamepadInfo.innerHTML = "Gamepad connected at index " + gp.index + ": " + gp.id +
        ". It has " + gp.buttons.length + " buttons and " + gp.axes.length + " axes.";
      gameLoop();
      clearInterval(interval);
    }
  }
}

// wheelAxis0 = document.getElementById("axisState0");
// gasInfo = document.getElementById("gasInfo");
// brakeInfo = document.getElementById("brakeInfo");
// clutchInfo = document.getElementById("clutchInfo");

const downShift = document.getElementById("button5");
const upShift = document.getElementById("button4");
const button7 = document.getElementById("button7");
const button20 = document.getElementById("button20");
const button22 = document.getElementById("button22");
const button6 = document.getElementById("button6");
const button19 = document.getElementById("button19");
const button21 = document.getElementById("button21");
const gas = document.getElementById("gas");
const brake = document.getElementById("brake");
const clutch = document.getElementById("clutch");
const wheel = document.getElementById("wheel");
const shifter = document.getElementById("shifter");
const button0 = document.getElementById("button0");
const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");
const button15 = document.getElementById("button15");
const button16 = document.getElementById("button16");
const button17 = document.getElementById("button17");
const button18 = document.getElementById("button18");
const arrow1 = document.getElementById("arrow1");
const arrow2 = document.getElementById("arrow2");
const arrow3 = document.getElementById("arrow3");
const arrow4 = document.getElementById("arrow4");



////////////////////////////

function buttonPressed(b) {
  if (typeof(b) == "object") {
    return b.pressed;
  }
  return b == 1.0;
}

// Gamepad Loop

function gameLoop() {
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
  if (!gamepads) {
    return;
  }

  var gp = gamepads[0];

  /////////////////////////////////////////// Wheel Buttons //////////////////////////////////////////////
  if (buttonPressed(gp.buttons[5])) {downShift.style.opacity = "1";} else {downShift.style.opacity = "0";}
  if (buttonPressed(gp.buttons[4])) {upShift.style.opacity = "1";} else {upShift.style.opacity = "0";}
  if (buttonPressed(gp.buttons[7])) {button7.style.opacity = "1";} else {button7.style.opacity = "0";}
  if (buttonPressed(gp.buttons[20])) {button20.style.opacity = "1";} else {button20.style.opacity = "0";}
  if (buttonPressed(gp.buttons[22])) {button22.style.opacity = "1";} else {button22.style.opacity = "0";}
  if (buttonPressed(gp.buttons[6])) {button6.style.opacity = "1";} else {button6.style.opacity = "0";}
  if (buttonPressed(gp.buttons[19])) {button19.style.opacity = "1";} else {button19.style.opacity = "0";}
  if (buttonPressed(gp.buttons[21])) {button21.style.opacity = "1";} else {button21.style.opacity = "0";}


  /////////////////////////////////////////// Wheel Rotation /////////////////////////////////////////////
  if (gp.axes[0] >= -1 || gp.axes[0] <= 1) {
    var wheelAngle = gp.axes[0] * 180;
    // wheelAxis0.innerHTML = wheelAngle;
    wheel.style.transform = 'rotate(' + wheelAngle + 'deg)';
    downShift.style.transform = 'rotate(' + wheelAngle + 'deg)';
    upShift.style.transform = 'rotate(' + wheelAngle + 'deg)';
    button7.style.transform = 'rotate(' + wheelAngle + 'deg)';
    button20.style.transform = 'rotate(' + wheelAngle + 'deg)';
    button22.style.transform = 'rotate(' + wheelAngle + 'deg)';
    button6.style.transform = 'rotate(' + wheelAngle + 'deg)';
    button19.style.transform = 'rotate(' + wheelAngle + 'deg)';
    button21.style.transform = 'rotate(' + wheelAngle + 'deg)';
  }


  /////////////////////////////////////////// Pedals /////////////////////////////////////////////
  if (gp.axes[2] >= -1 || gp.axes[2] <= 1) {
    var gasPos = (gp.axes[2] - 1) * -50;
    // gasInfo.innerHTML = gasPos;
    gas.style.transform = 'translateY(' + gasPos + 'px)';
  }
  if (gp.axes[5] >= -1 || gp.axes[5] <= 1) {
    var brakePos = (gp.axes[5] - 1) * -50;
    // brakeInfo.innerHTML = brakePos;
    brake.style.transform = 'translateY(' + brakePos + 'px)';
  }
  if (gp.axes[6] >= -1 || gp.axes[6] <= 1) {
    var clutchPos = (gp.axes[6] - 1) * -50;
    // clutchInfo.innerHTML = clutchPos;
    clutch.style.transform = 'translateY(' + clutchPos + 'px)';
  }


  /////////////////////////////////////////// Shifter Gears /////////////////////////////////////////////
  switch(true){
    case buttonPressed(gp.buttons[8]): shifter.style.transform = 'translate(-60px, -50px)'; shifter.style.transitionDuration = "100ms"; break;
    case buttonPressed(gp.buttons[9]): shifter.style.transform = 'translate(-60px, 50px)'; shifter.style.transitionDuration = "100ms"; break;
    case buttonPressed(gp.buttons[10]): shifter.style.transform = 'translate(0px, -50px)'; shifter.style.transitionDuration = "100ms"; break;
    case buttonPressed(gp.buttons[11]): shifter.style.transform = 'translate(0px, 50px)'; shifter.style.transitionDuration = "100ms"; break;
    case buttonPressed(gp.buttons[12]): shifter.style.transform = 'translate(60px, -50px)'; shifter.style.transitionDuration = "100ms"; break;
    case buttonPressed(gp.buttons[13]): shifter.style.transform = 'translate(60px, 50px)'; shifter.style.transitionDuration = "100ms"; break;
    case buttonPressed(gp.buttons[14]): shifter.style.transform = 'translate(60px, 50px)'; shifter.style.transitionDuration = "100ms"; shifter.style.width = '100px'; break;
    default: shifter.style.transform = 'translateY(' + 0 + 'px)'; shifter.style.width = '120px'; shifter.style.transitionDuration = "300ms"; break;
  }


  /////////////////////////////////////////// Shifter Buttons /////////////////////////////////////////////  
  if (buttonPressed(gp.buttons[0])) {button0.style.opacity = "1";} else {button0.style.opacity = "0";}
  if (buttonPressed(gp.buttons[1])) {button1.style.opacity = "1";} else {button1.style.opacity = "0";}
  if (buttonPressed(gp.buttons[2])) {button2.style.opacity = "1";} else {button2.style.opacity = "0";}
  if (buttonPressed(gp.buttons[3])) {button3.style.opacity = "1";} else {button3.style.opacity = "0";}
  if (buttonPressed(gp.buttons[15])) {button15.style.opacity = "1";} else {button15.style.opacity = "0";}
  if (buttonPressed(gp.buttons[16])) {button16.style.opacity = "1";} else {button16.style.opacity = "0";}
  if (buttonPressed(gp.buttons[17])) {button17.style.opacity = "1";} else {button17.style.opacity = "0";}
  if (buttonPressed(gp.buttons[18])) {button18.style.opacity = "1";} else {button18.style.opacity = "0";}


  /////////////////////////////////////////// Shifter D-pad /////////////////////////////////////////////  
  var arrowVal = Math.floor(gp.axes[9] * 100);

  switch(arrowVal) {
    case -100: arrow1.style.opacity = "1"; break;
    case 71: arrow2.style.opacity = "1"; break;
    case 14: arrow3.style.opacity = "1"; break;
    case -43: arrow4.style.opacity = "1"; break;
    default: arrow1.style.opacity = "0"; arrow2.style.opacity = "0"; arrow3.style.opacity = "0"; arrow4.style.opacity = "0"; break;
  }

  start = requestAnimationFrame(gameLoop);
}
