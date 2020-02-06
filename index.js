var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = []; //this has to be an array element
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  var userAudio = new Audio("sounds/" + userChosenColor + ".mp3");
  userAudio.play();

  animatePress(userChosenColor);
  userClickedPattern.push(userChosenColor);
  checkAnswer((userClickedPattern.length-1));
  console.log(userClickedPattern.length-1);
  // console.log(userClickedPattern);
});

function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    console.log("success");
    if (userClickedPattern.length=== gamePattern.length){ //if user has finished their sequence
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }
  else{
    console.log("wrong");
    var audioWrong = new Audio ("sounds/wrong.mp3");
    audioWrong.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver (){
  level =0;
  gamePattern=[];
  started = false;
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor((Math.random() * 4)); //randomnumber between 0 and 3
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}
