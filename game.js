var buttonColours=["red","blue","green","yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0; 

var started = false;
//detecting keypress

$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});



function nextSequence() {
    //once nextSequence is triggered, userClickedPattern is reset to an empty array.
    userClickedPattern = [];

    //increases the level by 1 each time the nextSequence is being called
  level++;
//updates the h1 with the updated level.
    $("#level-title").text("Level " + level);

    var randomNumber = Math.random();
    randomNumber = randomNumber * 4;
    randomNumber = Math.floor(randomNumber);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);    
}

$(".btn").on("click",function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);
//userClickedPattern is an array which stores all the button's ids that are pressed.
//then the next line calculates the array length as far as the buttons are clicked and passes it as argument to the function checkAnswer().
    checkAnswer(userClickedPattern.length-1);

    //var audio = new Audio("sounds/" + userChosenColour + ".mp3");
    //audio.play();
    //console.log(userClickedPattern);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  //adds the pressed class
  $("#" + currentColour).addClass("pressed");
  //removes the pressed class after evry 100 ms.
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  },100);
    //currentColour is an id thats why it requires # sign to fetch the id details like which colour it is.
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    //console.log("success");
    //checking whether the user gets the most recent value and that value follows the game pattern.
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      },1000);
    }
  } else {
    //console.log("wrong");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}