var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var start = 0;
$(document).keypress(function() {
    if(start === 0){

        nextSequence();
    }
    start++;
});

var i = 0;

$(".btn").click(function(event) {

    //var userChosenColour = this.getAttrbute("id");
    //2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
    var userChosenColour = event.target.id;
  
    // //4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
    userClickedPattern.push(event.target.id);
  
    // console.log(userClickedPattern);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    if(gamePattern.length>0 && userClickedPattern[i] === gamePattern[i]) {
        i++;
        if(i === gamePattern.length){
            i = 0;
            userClickedPattern.length = 0;
            setTimeout(function(){
                nextSequence();
            },500);
            
        }
    }
    else{
        i = 0;
        start = 0;
        level = 1;
        userClickedPattern.length = 0;
        gamePattern.length = 0;
        var aud = new Audio("sounds/wrong.mp3");
        aud.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key To Restart");
    }
  
  });

  var level = 1;
function nextSequence(){

    $("#level-title").html("Level " + level);
    
    level ++;
    
    var randomChosenColour = buttonColours[Math.floor(Math.random()*4)];
    
    gamePattern.push(randomChosenColour);
    
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColour);
}

function playSound(name){
    var audioElement = new Audio("sounds/"+name+".mp3");
    audioElement.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){ $("#"+currentColor).removeClass("pressed"); } ,100);
}