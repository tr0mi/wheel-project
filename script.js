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
  gamepadInfo.innerHTML = "No gamepad available";
  interval = setInterval(pollGamepads, 500);
  exampleButton.style.opacity = "1";
}

function pollGamepads() {
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
  //console.log(gamepads);
  for (var i = 0; i < gamepads.length; i++) {
    var gp = gamepads[i];
    if (gp) {
      gamepadInfo.innerHTML = "Gamepad connected at index " + gp.index + ": " + gp.id +
        ". It has " + gp.buttons.length + " buttons and " + gp.axes.length + " axes.";
      exampleButton.style.opacity = "0";
      gameLoop();
      clearInterval(interval);
    }
  }
}

// dev info:

// wheelAxis0 = document.getElementById("axisState0");
// gasInfo = document.getElementById("gasInfo");
// brakeInfo = document.getElementById("brakeInfo");
// clutchInfo = document.getElementById("clutchInfo");


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
    case buttonPressed(gp.buttons[14]): shifter.style.transform = 'translate(60px, 50px)'; shifter.style.transitionDuration = "100ms"; shifter.style.width = '90px'; break;
    default: shifter.style.transform = 'translate(0px, 0px)'; shifter.style.width = '120px'; shifter.style.transitionDuration = "300ms"; break;
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



/////////////////////////////////////////// Functionality Example //////////////////////////////////////////////
function wheelLoading() {
  setTimeout(function(){ button0.style.opacity = "1"; }, 100);
  setTimeout(function(){ button1.style.opacity = "1"; }, 200);
  setTimeout(function(){ button2.style.opacity = "1"; }, 300);
  setTimeout(function(){ button3.style.opacity = "1"; }, 400);
  setTimeout(function(){ button0.style.opacity = "0"; }, 500);
  setTimeout(function(){ button1.style.opacity = "0"; }, 600);
  setTimeout(function(){ button2.style.opacity = "0"; }, 700);
  setTimeout(function(){ button3.style.opacity = "0"; }, 800);
  setTimeout(function(){ arrow1.style.opacity = "1"; }, 900);
  setTimeout(function(){ arrow2.style.opacity = "1"; }, 1000);
  setTimeout(function(){ arrow3.style.opacity = "1"; }, 1100);
  setTimeout(function(){ arrow4.style.opacity = "1"; }, 1200);
  setTimeout(function(){ arrow1.style.opacity = "0"; }, 1300);
  setTimeout(function(){ arrow2.style.opacity = "0"; }, 1400);
  setTimeout(function(){ arrow3.style.opacity = "0"; }, 1500);
  setTimeout(function(){ arrow4.style.opacity = "0"; }, 1600);
  setTimeout(function(){ button15.style.opacity = "1"; }, 1700);
  setTimeout(function(){ button16.style.opacity = "1"; }, 1800);
  setTimeout(function(){ button17.style.opacity = "1"; }, 1900);
  setTimeout(function(){ button18.style.opacity = "1"; }, 2000);
  setTimeout(function(){ button15.style.opacity = "0"; }, 2100);
  setTimeout(function(){ button16.style.opacity = "0"; }, 2200);
  setTimeout(function(){ button17.style.opacity = "0"; }, 2300);
  setTimeout(function(){ button18.style.opacity = "0"; }, 2400);

  setTimeout(function(){ downShift.style.opacity = "1"; }, 2500);
  setTimeout(function(){ downShift.style.opacity = "0"; }, 2800);
  setTimeout(function(){ upShift.style.opacity = "1"; }, 3000);
  setTimeout(function(){ upShift.style.opacity = "0"; }, 3300);

  setTimeout(function(){ button7.style.opacity = "1"; }, 3500);
  setTimeout(function(){ button20.style.opacity = "1"; }, 3600);
  setTimeout(function(){ button22.style.opacity = "1"; }, 3700);

  
  setTimeout(function(){ button7.style.opacity = "0"; }, 3800);
  setTimeout(function(){ button20.style.opacity = "0"; }, 3900);
  setTimeout(function(){ button22.style.opacity = "0"; }, 4000);

  setTimeout(function(){ button6.style.opacity = "1"; }, 4100);
  setTimeout(function(){ button19.style.opacity = "1"; }, 4200);
  setTimeout(function(){ button21.style.opacity = "1"; }, 4300);

  
  setTimeout(function(){ button6.style.opacity = "0"; }, 4400);
  setTimeout(function(){ button19.style.opacity = "0"; }, 4500);
  setTimeout(function(){ button21.style.opacity = "0"; }, 4600);

  setTimeout(function(){ wheel.style.transitionDuration = "500ms"; }, 4800);
  setTimeout(function(){ wheel.style.transform = 'rotate(-180deg)'; }, 4800);
  setTimeout(function(){ wheel.style.transform = 'rotate(0deg)'; }, 5500);
  setTimeout(function(){ wheel.style.transform = 'rotate(180deg)'; }, 6200);
  setTimeout(function(){ wheel.style.transform = 'rotate(0deg)'; }, 6900);
  setTimeout(function(){ wheel.style.transitionDuration = "0ms"; }, 7400);

  setTimeout(function(){ gas.style.transitionDuration = "500ms"; }, 7500);
  setTimeout(function(){ gas.style.transform = 'translateY(100px)'; }, 7500);
  setTimeout(function(){ gas.style.transform = 'translateY(0px)'; }, 8100);
  setTimeout(function(){ gas.style.transitionDuration = "0ms"; }, 8700);
  setTimeout(function(){ brake.style.transitionDuration = "500ms"; }, 8700);
  setTimeout(function(){ brake.style.transform = 'translateY(100px)'; }, 8700);
  setTimeout(function(){ brake.style.transform = 'translateY(0px)'; }, 9300);
  setTimeout(function(){ brake.style.transitionDuration = "0ms"; }, 9900);

  setTimeout(function(){ clutch.style.transitionDuration = "500ms"; }, 9900);
  setTimeout(function(){ clutch.style.transform = 'translateY(100px)'; }, 9900);

  setTimeout(function(){ shifter.style.transitionDuration = "100ms"; }, 10500);
  setTimeout(function(){ shifter.style.transform = 'translate(-60px, -50px)'; }, 10600);
  setTimeout(function(){ shifter.style.transform = 'translate(-60px, 50px)'; }, 11000);
  setTimeout(function(){ shifter.style.transform = 'translate(0px, -50px)'; }, 11400);
  setTimeout(function(){ shifter.style.transform = 'translate(0px, 50px)'; }, 11800);
  setTimeout(function(){ shifter.style.transform = 'translate(60px, -50px)'; }, 12200);
  setTimeout(function(){ shifter.style.transform = 'translate(60px, 50px)'; }, 12600);
  setTimeout(function(){ shifter.style.transitionDuration = "300ms"; }, 13000);
  setTimeout(function(){ shifter.style.transform = 'translate(0px, 0px)'; }, 13000);
  setTimeout(function(){ shifter.style.transitionDuration = "100ms"; }, 13700);
  setTimeout(function(){ shifter.style.transform = 'translate(60px, 50px)'; }, 13700);
  setTimeout(function(){ shifter.style.width = '90px'; }, 13700);
  setTimeout(function(){ shifter.style.transitionDuration = "300ms"; }, 13900);
  setTimeout(function(){ shifter.style.transform = 'translate(0px, 0px)'; }, 14000);
  setTimeout(function(){ shifter.style.width = '120px'; }, 14000);
  
  setTimeout(function(){ clutch.style.transform = 'translateY(0px)'; }, 14500);
  setTimeout(function(){ clutch.style.transitionDuration = "0ms"; }, 15000);


}
