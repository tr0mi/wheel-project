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

wheelAxis0 = document.getElementById("axisState0");
gasInfo = document.getElementById("gasInfo");
brakeInfo = document.getElementById("brakeInfo");
clutchInfo = document.getElementById("clutchInfo");

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
    wheelAxis0.innerHTML = wheelAngle;
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
    gasInfo.innerHTML = gasPos;
    gas.style.transform = 'translateY(' + gasPos + 'px)';
  }
  if (gp.axes[5] >= -1 || gp.axes[5] <= 1) {
    var brakePos = (gp.axes[5] - 1) * -50;
    brakeInfo.innerHTML = brakePos;
    brake.style.transform = 'translateY(' + brakePos + 'px)';
  }
  if (gp.axes[6] >= -1 || gp.axes[6] <= 1) {
    var clutchPos = (gp.axes[6] - 1) * -50;
    clutchInfo.innerHTML = clutchPos;
    clutch.style.transform = 'translateY(' + clutchPos + 'px)';
  }


  /////////////////////////////////////////// Shifter Gears /////////////////////////////////////////////

  start = requestAnimationFrame(gameLoop);
}
