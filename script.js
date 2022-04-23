//Global constants
const cluePauseTime = 333; //how long to pause in between clues
const nextClueWaitTime = 500; // how long to wait before starting playback
//Global Variables
var mistakes = 0;
var clueHoldTime = 1000; //how long to hold each clue's light and sound
var pattern = [0, 0, 0, 0, 0];
var onlineEndless = [];
var progress = 0;
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.7; //must be between 0.0 and 1.0
var guessCounter = 0;
var time;
var timeInterval;
var buttonCount = 6;
var timerExtra = 0;
var isOnline = false;
var isCreative = false;

function startGame() {
  //initialize game variables
  hideCreative();
  time = 30000 + timerExtra;
  timeInterval = setInterval(timer, 1000);
  mistakes = 0;
  progress = 0;
  gamePlaying = true;
  clueHoldTime = 1000;
  //swap the start and stop buttons
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");

  if (!isOnline) {
    randomNumberGenerator();
    playClueSequence();
  } else {
    generateEndlessClue();
    playOnlineSequence();
  }
}

function stopGame() {
  if (isCreative) {
    showCreative();
  }
  gamePlaying = false;
  clearInterval(timeInterval);
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
}

function lightButton(btn) {
  document.getElementById("button" + btn).classList.add("lit");
}
function clearButton(btn) {
  document.getElementById("button" + btn).classList.remove("lit");
}

function playSingleClue(btn) {
  if (gamePlaying) {
    lightButton(btn);
    playTone(btn, clueHoldTime);
    setTimeout(clearButton, clueHoldTime, btn);
  }
}
function playClueSequence() {
  guessCounter = 0;
  let spedUpTime = 0;
  let delay = nextClueWaitTime; //set delay to initial wait time
  for (let i = 0; i <= progress; i++) {
    //for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms");
    setTimeout(playSingleClue, delay, pattern[i]); //set a timeout to play that clue
    spedUpTime += 20;
    console.log(
      "Speed: " +
        spedUpTime +
        " Delay: " +
        delay +
        " Delay - Speed: " +
        2 * spedUpTime
    );
    clueHoldTime -= spedUpTime;
    delay += clueHoldTime - spedUpTime;
    delay += cluePauseTime;
  }
}
function playOnlineSequence() {
  guessCounter = 0;
  let delay = nextClueWaitTime; //set delay to initial wait time
  for (let i = 0; i <= progress; i++) {
    console.log(onlineEndless);
    //for each clue that is revealed so far
    console.log(
      "play single clue: " + onlineEndless[i] + " in " + delay + "ms"
    );
    setTimeout(playSingleClue, delay, onlineEndless[i]); //set a timeout to play that clue
    delay += clueHoldTime;
    delay += cluePauseTime;
  }
  console.log("Playing Online Sequence");
  generateEndlessClue();
}
function loseGame() {
  stopGame();
  alert("Game Over! Try Again.");
}
function winGame() {
  stopGame();
  alert("Congratulations, You won!");
}

//Sound Synthesis Functions
let freqMap = {
  1: 261.6,
  2: 329.6,
  3: 392,
  4: 466.2,
  5: 195,
  6: 537,
  7: 200,
  8: 678,
  9: 301.4,
  10: 410.1,
  11: 590,
  12: 219.3,
};

function playTone(btn, len) {
  o.frequency.value = freqMap[btn];
  g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
  context.resume();
  tonePlaying = true;
  setTimeout(function () {
    stopTone();
  }, len);
}
function startTone(btn) {
  if (!tonePlaying) {
    context.resume();
    o.frequency.value = freqMap[btn];
    g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
    context.resume();
    tonePlaying = true;
  }
}
function stopTone() {
  g.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
  tonePlaying = false;
}

//Page Initialization
//Init Sound Synthesizer
var AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var o = context.createOscillator();
var g = context.createGain();
g.connect(context.destination);
g.gain.setValueAtTime(0, context.currentTime);
o.connect(g);
o.start(0);

function guess(btn) {
  console.log("user guessed: " + btn);
  if (!gamePlaying) {
    return;
  }
  //Guessing for normal and creative
  if (pattern[guessCounter] == btn && !isOnline) {
    //guess was correct
    if (guessCounter == progress) {
      if (progress == pattern.length - 1) {
        //WIN
        winGame();
      } else {
        //Pattern correct. Add next segment
        progress++;
        playClueSequence();
      }
    } else {
      //so far so good. check the next guess
      guessCounter++;
    }
  }

  //Guessing for online mode
  else if (onlineEndless[guessCounter] == btn && isOnline) {
    if (guessCounter == progress) {
      progress++;
      playOnlineSequence();
    } else {
      guessCounter++;
    }
  } else {
    //guess was wrong
    //LOSE
    if (isOnline) {
      loseGame();
    }
    mistakes += 1;

    if (mistakes == 3) {
      loseGame();
    } else {
      playClueSequence();
    }
  }
}
function randomNumberGenerator() {
  for (let i = 0; i <= pattern.length - 1; i++) {
    let min = Math.ceil(1);
    let max = Math.floor(buttonCount + 1);
    let randomNumber = Math.floor(Math.random() * (max - min) + min);
    console.log(randomNumber);
    pattern[i] = randomNumber;
  }
}
function generateEndlessClue() {
  let min = Math.ceil(1);
  let max = Math.floor(buttonCount + 1);
  let randomNumber = Math.floor(Math.random() * (max - min) + min);
  console.log("New Random Number: " + randomNumber);
  onlineEndless[onlineEndless.length] = randomNumber;
}
function timer() {
  let timerElement = document.getElementById("timerElement");

  if (!isOnline) {
    time -= 1000;
  }
  timerElement.innerHTML = "Seconds Left: " + time / 1000 + " Seconds";

  console.log("Seconds Left: " + time);
  if (time == 0) {
    clearInterval(timeInterval);
    loseGame();
  }
}

function darkMode() {
  var element = document.body;
  var content = document.getElementById("DarkModetext");
  var button1 = document.getElementById("toggleDark");
  var button2 = document.getElementById("toggleLight");
  button1.className = "hidden";
  button2.className = "btn btn-outline-light btn-lg";
  element.className = "dark-mode";
  //content.innerText = "Dark Mode is ON";
}
function lightMode() {
  var element = document.body;
  var content = document.getElementById("DarkModetext");
  var button1 = document.getElementById("toggleLight");
  var button2 = document.getElementById("toggleDark");
  button1.className = "hidden";
  button2.className = "btn btn-outline-dark btn-lg";
  element.className = "light-mode";
  //content.innerText = "Dark Mode is OFF";
}

function moreButtons() {
  if (buttonCount < 12) {
    buttonCount++;
    let buttonHolder = document.getElementById("button" + buttonCount);
    buttonHolder.classList.remove("hidden");
  }
  console.log(buttonCount);
}

function lessButtons() {
  if (2 < buttonCount) {
    let buttonHolder = document.getElementById("button" + buttonCount);
    buttonCount--;
    buttonHolder.classList.add("hidden");
  }
  console.log(buttonCount);
}

function increaseTime() {
  timerExtra += 1000;
  let timerElement = document.getElementById("timerElement");
  timerElement.innerHTML =
    "Seconds Left: " + (30 + timerExtra / 1000) + " Seconds";
}

function decreaseTime() {
  if (-28000 < timerExtra) {
    timerExtra -= 1000;
    let timerElement = document.getElementById("timerElement");
    timerElement.innerHTML =
      "Seconds Left: " + (30 + timerExtra / 1000) + " Seconds";
  }
}

function hideCreative() {
  //Hide Adding and removing buttons
  document.getElementById("increaseButton").classList.add("hidden");
  document.getElementById("decreaseButton").classList.add("hidden");
  //Hide Increasing Time and Decreasing Time
  document.getElementById("increaseTimeButton").classList.add("hidden");
  document.getElementById("decreaseTimeButton").classList.add("hidden");
  //Hide Creative Mode Text
  //document.getElementById("creativeDesc").classList.add("hidden");
  document.getElementById("decreasePatternsButton").classList.add("hidden");
  document.getElementById("increasePatternsButton").classList.add("hidden");
  document.getElementById("patternsElement").classList.add("hidden");
}

function showCreative() {
  //Hide Adding and removing buttons
  document.getElementById("increaseButton").classList.remove("hidden");
  document.getElementById("decreaseButton").classList.remove("hidden");
  //Hide Increasing Time and Decreasing Time
  document.getElementById("increaseTimeButton").classList.remove("hidden");
  document.getElementById("decreaseTimeButton").classList.remove("hidden");
  document.getElementById("decreasePatternsButton").classList.remove("hidden");
  document.getElementById("increasePatternsButton").classList.remove("hidden");
  document.getElementById("patternsElement").classList.remove("hidden");
  //Hide Creative Mode Text
  //document.getElementById("creativeDesc").classList.add("hidden");
  //Hide online
  hideOnline();
}

function switchToNormal() {
  //Hide online components
  isOnline = false;

  //DeActivate isCreative for game logic
  isCreative = false;

  //Hide all Creative Components

  hideCreative();
  document.getElementById("creativeDD").classList.remove("active");
  document.getElementById("timerElement").classList.remove("hidden");
  document.getElementById("creativeDesc").classList.add("hidden");
  //Hide all extra Buttons 7-12
  document.getElementById("button1").classList.remove("hidden");
  document.getElementById("button2").classList.remove("hidden");
  document.getElementById("button3").classList.remove("hidden");
  document.getElementById("button4").classList.remove("hidden");
  document.getElementById("button5").classList.remove("hidden");
  document.getElementById("button6").classList.remove("hidden");
  document.getElementById("button7").classList.add("hidden");
  document.getElementById("button8").classList.add("hidden");
  document.getElementById("button9").classList.add("hidden");
  document.getElementById("button10").classList.add("hidden");
  document.getElementById("button11").classList.add("hidden");
  document.getElementById("button12").classList.add("hidden");

  //Undo all Variables
  timerExtra = 0;
  buttonCount = 6;

  //Appear all Normal Components
  document.getElementById("normalDesc").classList.remove("hidden");
  document.getElementById("onlineDesc").classList.add("hidden");
  let timerElement = document.getElementById("timerElement");
  timerElement.innerHTML = "Seconds Left: " + 30 + " Seconds";
  document.getElementById("normalDD").classList.add("active");

  //Hide online
  hideOnline();
  document.getElementById("onlineDD").classList.remove("active");
}

function switchToCreative() {
  //deActivate isOnline for game logic
  isOnline = false;

  //Activate isCreative for game logic
  isCreative = true;
  //Show all creative components
  showCreative();
  document.getElementById("timerElement").classList.remove("hidden");
  document.getElementById("creativeDesc").classList.remove("hidden");
  document.getElementById("creativeDD").classList.add("active");
  

  //Hide all normal components
  document.getElementById("normalDesc").classList.add("hidden");
  document.getElementById("normalDD").classList.remove("active");

  //Hide all online components
  document.getElementById("onlineDesc").classList.add("hidden");
  document.getElementById("onlineDD").classList.remove("active");
}

function switchToOnline() {
  //Activate isOnline for game logic
  isOnline = true;

  //deActivate isCreative for game logic
  isCreative = false;

  //Show all online components
  document.getElementById("leaderboard").classList.remove("hidden");
  document.getElementById("onlineDesc").classList.remove("hidden");
  document.getElementById("onlineDD").classList.add("active");

  //Hide all Creative Components
  hideCreative();
  document.getElementById("creativeDD").classList.remove("active");
  document.getElementById("creativeDesc").classList.add("hidden");
  //Hide all extra Buttons 7-12 and adding buttons needed
  document.getElementById("button1").classList.remove("hidden");
  document.getElementById("button2").classList.remove("hidden");
  document.getElementById("button3").classList.remove("hidden");
  document.getElementById("button4").classList.remove("hidden");
  document.getElementById("button5").classList.remove("hidden");
  document.getElementById("button6").classList.remove("hidden");
  document.getElementById("button7").classList.add("hidden");
  document.getElementById("button8").classList.add("hidden");
  document.getElementById("button9").classList.add("hidden");
  document.getElementById("button10").classList.add("hidden");
  document.getElementById("button11").classList.add("hidden");
  document.getElementById("button12").classList.add("hidden");

  //Undo all Variables
  timerExtra = 0;
  buttonCount = 6;

  //Hide all normal mode components
  document.getElementById("timerElement").classList.add("hidden");
  document.getElementById("normalDesc").classList.add("hidden");
  document.getElementById("normalDD").classList.remove("active");
}

function hideOnline() {
  document.getElementById("leaderboard").classList.add("hidden");
  document.getElementById("onlineDesc").classList.add("hidden");
}

function decreasePattern(){
  if(2 < pattern.length){
    pattern.length--;
    document.getElementById("patternsElement").innerHTML = pattern.length;
  }
}

function increasePattern(){
  pattern[pattern.length] = "0";
  document.getElementById("patternsElement").innerHTML = pattern.length;
}