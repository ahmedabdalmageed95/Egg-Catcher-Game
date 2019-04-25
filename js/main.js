                    //<------------------------------------------------------------------->//
                    //<---------------------------- Selectors ---------------------------->//
                    //<------------------------------------------------------------------->//

//OTHER
var windowGame = document.getElementById("gameContent"); //Game Div Content
var counterSpan = document.getElementById("numberOfAgges"); //Number of Eggs Collected {Score}
var TargetEggs = document.getElementById("TargetEgges"); //Number of Target Eggs
//TIMERS
var timer = document.getElementById("timer"); //Stop Watch Timer 1 {dynamic}
var timer2 = document.getElementById("timer2"); //Stop Watch Timer 2 {static}
//MESSAGES
var messageGameOver = document.getElementById("GameOverMessages"); //Game Over Message
var messagesTarget = document.getElementById("targetMessages"); //Success Message {Target Achieved}
//BUTTONS
var resume = document.getElementById("resume"); //Resume Button
var restart = document.getElementById("restart"); //Restart Button
var pause = document.getElementById("pause"); //Pause Button
var CustomConfirm = document.getElementById("CustomConfirm"); //Play Again Div?
var buttonOk = document.getElementById("Ok"); //Yes, Play Again Button
var buttonCancel = document.getElementById("Cancel"); //No, Cancel Button
var normalModeBut = document.getElementById("NormalMode"); //Normal Mode Buton
var hardModeBut = document.getElementById("HardMode"); //Hard Mode Button
//IMAGES
var basket = document.getElementById("basket"); //Basket
var farm = document.getElementById("farm"); //Farm Background
var farm2 = document.getElementById("farm2"); //Farm Background
var topBar = document.getElementById("topBar"); //Top Bar
var eggs = [
    document.getElementById("egg1"),
    document.getElementById("egg2"),         //Eggs
    document.getElementById("egg3")
]; 

var bird = [
    document.getElementById("bird1"),
    document.getElementById("bird2"),         //Birds
    document.getElementById("bird3")
];

//UserName Area
var UsernameText = document.getElementById("username"); //Username Box
var UsernameSpan = document.getElementById("userSpan"); //Username Span {for top bar}

                    //<------------------------------------------------------------------->//
                    //<---------------------------- Variables ---------------------------->//
                    //<------------------------------------------------------------------->//

var second = 0; //Second
var minute = 0; //Minute
var hours = 0; //Hours
var eggtime = 0; //Egg Time
var tempSecond = second, //Temp Second
    tempMinute = minute, //Temp Minute
    tempHoure = hours; //Temp Hour
var stopWatch; //Stop Watch

var counter = 0; //Counter

var Scoretarget = 5; //Target Score to be Achieved To End the Game
var Finishtime = 10; //Target Finish Time To End the Game
TargetEggs.innerText = Scoretarget;
var MovingBirds = setInterval(movingBird, 70); //Timer to Move the Birds

var Bird1Flag = false; //Bird 1 Flag?
var Bird2Flag = false; //Bird 2 Flag?
var Bird3Flag = false; //Bird 3 Flag?

var birdsLeftVal = [300, 600, 880]; //Birds Start Position     //randomize 
var paused = true; //Pause the game Flag?

var basketLeftVal = 300; // Static Basket Left Value
var toggleSpace = false; //Toggle Space Button for Pausing the Game?
var gameOver = false; //Game Over Flag?

//var TimerEggs = setInterval(movingEggs, 10);
var egg1TopValue = bird[0].getBoundingClientRect().bottom;
var egg2TopValue = bird[1].getBoundingClientRect().bottom;
var egg3TopValue = bird[2].getBoundingClientRect().bottom;
var egg1LeftValue = bird[0].getBoundingClientRect().left;
var egg2LeftValue = bird[1].getBoundingClientRect().left;
var egg3LeftValue = bird[2].getBoundingClientRect().left;

var blackchosen = false; //Black Eggs Flag?
var goldchosen = false; //Gold Eggs Flag?

var checkIfBoxgetEggs = setInterval(CheckCollision, 50);

var playAgain; //Play Again Flag?

var OptionModeNormal = false; //Normal Mode Flag?
var OptionHardNormal = false; //Hard Mode Flag?

var NameFormat = /^[a-z A-Z 0-9]+$/; //Validation for Username Input that accept only Chars and Numbers

var TimerEggs;
//________________________________________________________________________
var audioSoundGames = document.getElementById("audioStartGame");//zika
var birdSound = document.getElementById("BirdSound");//zika
var eatEggsSound = document.getElementById("eatEgg");//zika
var targetSound = document.getElementById("targetSound");//zika
var birdSoundIntervel;//zika
var timeFinishSound = document.getElementById("GameOverSound");//zika

                    //<---------------------------------------------------------------->//
                    //<---------------------------- Events ---------------------------->//
                    //<---------------------------------------------------------------->//

//Pause Game With Space & Move Basket Right or Left
window.addEventListener("keydown", function (e) {
    //PAUSE GAME WITH SPACE
    if (toggleSpace == false && e.code == "Space" && (OptionModeNormal || OptionHardNormal) && !gameOver) {
        hideComponents();
        resume.style.visibility = "visible";
        restart.style.visibility = "visible";
        toggleSpace = true;
        
    }
    else if (toggleSpace && e.code == "Space" && !gameOver) {
        resume.onclick();
        toggleSpace = false;

    }
    //MOVE BASKET RIGHT
    if (e.code == "ArrowRight" && !paused) {
        if (basket.style.left >= "930px") {
            //DO NOTHING xD
        } else {
            basketLeftVal += 30;
            basket.style.left = basketLeftVal + "px";
        }
    }
    //MOVE BASKET LEFT
    if (e.code == "ArrowLeft" && !paused) {
        if (basket.style.left <= "300px") {
            //DO NOTHING xD
        } else {
            basketLeftVal -= 30;
            basket.style.left = basketLeftVal + "px";
        }
    }
});
//Pause Game With Pause Button
pause.onclick = function () {
    hideComponents();
    resume.style.visibility = "visible";
    restart.style.visibility = "visible";
    toggleSpace = true;//zika
};
//Resume Game With Resume Button
resume.onclick = function () {
    resume.style.visibility = "hidden";
    restart.style.visibility = "hidden";
    visibleComponents();
    toggleSpace = false;//zika
    checkIfBoxgetEggs = setInterval(CheckCollision, 50)
    paused = false;
    audioSoundGames.play() //zika
};
//Restart Game
restart.onclick = res;
//Ok, Play Again
buttonOk.onclick = function () {
    playAgain = true;
}
//Cancel, Dont play again
buttonCancel.onclick = function () {
    playAgain = false;
}
//Normal Mode
normalModeBut.onclick = function () {
    if (UsernameText.value != "" && UsernameText.value.match(NameFormat)) {
        audioSoundGames.play() //zika
        topBar.style.visibility = "visible";
        counterSpan.style.visibility = "visible";
        TargetEggs.style.visibility = "visible";
        farm.style.visibility = "visible";
        farm2.style.visibility = "hidden";
        UsernameSpan.innerText = UsernameText.value;
        OptionModeNormal = true;
        OptionHardNormal = false;
        Scoretarget = 10;
        TargetEggs.innerText = Scoretarget;

        Finishtime = 20;
        finaltimer(Finishtime);
        eggtime = 10;
        if (TimerEggs != null) {
            clearInterval(TimerEggs)
        }
        TimerEggs = setInterval(movingEggs, eggtime);
        //____________________________________
        hideButtonOptionGame();
        startGameComponents();
    }
    else {
        UsernameText.focus();
    }
}
//Hard Mode
hardModeBut.onclick = function () {
    if (UsernameText.value != "" && UsernameText.value.match(NameFormat)) {
        audioSoundGames.play() //zika
        topBar.style.visibility = "visible";
        counterSpan.style.visibility = "visible";
        TargetEggs.style.visibility = "visible";
        farm.style.visibility = "hidden";
        farm2.style.visibility = "visible";
        farm2.style.filter = "blur(0px)";
        UsernameSpan.innerText = UsernameText.value;
        OptionModeNormal = false;
        OptionHardNormal = true;
        Scoretarget = 15;
        TargetEggs.innerText = Scoretarget;
        Finishtime = 15;
        finaltimer(Finishtime);
        eggtime = 3;
        if (TimerEggs != null) {
            clearInterval(TimerEggs)
        }

        TimerEggs = setInterval(movingEggs, eggtime);
        //______________________________________
        hideButtonOptionGame();
        startGameComponents();
    }
    else {
        UsernameText.focus();
    }
}
                    //<------------------------------------------------------------------->//
                    //<---------------------------- Functions ---------------------------->//
                    //<------------------------------------------------------------------->//

timer.innerHTML = getTimeToString(
    "0" + tempHoure,
    "0" + tempMinute,
    "0" + tempSecond
);
//____________________________________________________
//Clear the playtime Interval
function stopTimer() {
    clearInterval(stopWatch);
}
//Start playtime interval
function startTimer() {
    stopWatch = setInterval(function() {
        second++;
        if (second > 59) {
            minute++;
            second = 0;
            if (minute > 59) {
                minute = 0;
                hours++;
            }
        }
        (tempSecond = second), (tempMinute = minute), (tempHoure = hours);
        if (second < 10) {
            tempSecond = "0" + second;
        }
        if (minute < 10) {
            tempMinute = "0" + minute;
        }
        if (hours < 10) {
            tempHoure = "0" + hours;
        }
        timer.innerHTML = getTimeToString(tempHoure, tempMinute, tempSecond);
    }, 1000);
}
//return the time in the form of Hour/Minute/Second
function getTimeToString(tempHoure, tempMinute, tempSecond) {
    return tempHoure + ":" + tempMinute + ":" + tempSecond;
}
//Convert Seconds to Hours/Minutes/Seconds
function finaltimer(Finishtime) {
    min = Math.floor(Finishtime / 60);
    secd = Math.round(Finishtime % 60);
    if (min <= 9)
        min = "0" + Math.floor(Finishtime / 60);
    if (secd <= 9)
        secd = "0" + Math.round(Finishtime % 60);
    timer2.innerHTML = getTimeToString("00", min, secd);

}
counterSpan.innerHTML = counter;
//Moving Birds
function movingBird() {
    if (!paused) {
        ///////////////////// Bird 1
        if (Bird1Flag) {
            birdsLeftVal[0] -= 10;
            bird[0].style.left = birdsLeftVal[0] + "px";
            if (bird[0].style.left == "300px") {
                bird[0].style.transform = "rotateY(360deg)";
                Bird1Flag = false;
            }
        }
        if (!Bird1Flag) {
            birdsLeftVal[0] += 10;
            bird[0].style.left = birdsLeftVal[0] + "px";
            if (bird[0].style.left == "930px") {
                bird[0].style.transform = "rotateY(180deg)";
                Bird1Flag = true;
            }
        }
        //////////////////// Bird 2
        if (Bird2Flag) {
            birdsLeftVal[1] -= 10;
            bird[1].style.left = birdsLeftVal[1] + "px";
            if (bird[1].style.left == "300px") {
                bird[1].style.transform = "rotateY(360deg)";
                Bird2Flag = false;
            }
        }
        if (!Bird2Flag) {
            birdsLeftVal[1] += 10;
            bird[1].style.left = birdsLeftVal[1] + "px";
            if (bird[1].style.left == "930px") {
                bird[1].style.transform = "rotateY(180deg)";
                Bird2Flag = true;
            }
        }

        ///////////////////// Bird 3

        if (Bird3Flag) {
            birdsLeftVal[2] -= 10;
            bird[2].style.left = birdsLeftVal[2] + "px";
            if (bird[2].style.left == "300px") {
                bird[2].style.transform = "rotateY(360deg)";
                Bird3Flag = false;
            }
        }
        if (!Bird3Flag) {
            birdsLeftVal[2] += 10;
            bird[2].style.left = birdsLeftVal[2] + "px";
            if (bird[2].style.left == "930px") {
                bird[2].style.transform = "rotateY(180deg)";
                Bird3Flag = true;
            }
        }
    }
}
//Restart Game
function res () {
    toggleSpace = false;
    counter = 0;
    counterSpan.innerHTML = counter;
    second = minute = hours = 0;
    resume.style.visibility = "hidden";
    restart.style.visibility = "hidden";
     messageGameOver.style.visibility = "hidden";
     CustomConfirm.style.visibility = "hidden";
     messagesTarget.style.visibility = "hidden";
    //-------------------
    visibleComponents();
   //----------------------

    birdsLeftVal = [400, 700, 900];
    bird[0].style.left = birdsLeftVal[0] + "px";
    bird[1].style.left = birdsLeftVal[1] + "px";
    bird[2].style.left = birdsLeftVal[2] + "px";
    if (bird[0].style.left == "300px") {
        bird[0].style.transform = "rotateY(360deg)";
        Bird1Flag = false;
    }
    if (bird[1].style.left == "300px") {
        bird[1].style.transform = "rotateY(360deg)";
        Bird2Flag = false;
    }
    if (bird[2].style.left == "300px") {
        bird[2].style.transform = "rotateY(360deg)";
        Bird3Flag = false;
    }
    basketLeftVal = 300;
    basket.style.left = basketLeftVal + "px";

    egg1TopValue = bird[0].getBoundingClientRect().bottom;
    egg2TopValue = bird[1].getBoundingClientRect().bottom;
    egg3TopValue = bird[2].getBoundingClientRect().bottom;
    egg1LeftValue = bird[0].getBoundingClientRect().left;
    egg2LeftValue = bird[1].getBoundingClientRect().left;
    egg3LeftValue = bird[2].getBoundingClientRect().left;
    paused = false;
    //_______________________
  
    checkIfBoxgetEggs = setInterval(CheckCollision, 50);
};
//Move Eggs
function movingEggs() {
    if (!paused) {
        var eggtype = Math.round(Math.random() * 10);
        var eggtype2 = Math.round(Math.random() * 10);
        if (eggtype >= 0 && eggtype <= 5 || OptionModeNormal) {
            eggs[0] = document.getElementById("egg1");
            blackchosen = false;
            eggs[0].style.visibility = "visible";
             }
        if (eggtype > 5 && eggtype <= 10 && OptionHardNormal) {
            eggs[0] = document.getElementById("blackegg");
            blackchosen = true;
            eggs[0].style.visibility = "visible";
              }
        if (eggtype2 >= 0 && eggtype2 <= 5 || OptionModeNormal) {
            eggs[1] = document.getElementById("egg2");
            goldchosen = false;
            eggs[1].style.visibility = "visible";
              }
        if (eggtype2 >= 5 && eggtype2 <= 10 ) {
            eggs[1] = document.getElementById("goldenegg");
            goldchosen = true;
            eggs[1].style.visibility = "visible";
            }
        if (egg1TopValue > 600) {
            egg1TopValue = bird[0].getBoundingClientRect().bottom;
            egg1LeftValue = bird[0].getBoundingClientRect().left;
            eggs[0].style.left = egg1LeftValue.toString() + "px";
        } else {
            egg1TopValue += 1;
        }
        eggs[0].style.top = egg1TopValue.toString() + "px";
        eggs[1].style.top = egg2TopValue.toString() + "px";
        eggs[2].style.top = egg3TopValue.toString() + "px";
        if (egg2TopValue > 600) {
            egg2TopValue = bird[1].getBoundingClientRect().bottom;
            egg2LeftValue = bird[1].getBoundingClientRect().left;
            eggs[1].style.left = egg2LeftValue.toString() + "px";
         
        } else {
            egg2TopValue += 1;
        }
        eggs[0].style.top = egg1TopValue.toString() + "px";
        eggs[1].style.top = egg2TopValue.toString() + "px";
        eggs[2].style.top = egg3TopValue.toString() + "px";
        if (egg3TopValue > 600) {
            egg3TopValue = bird[2].getBoundingClientRect().bottom;
            egg3LeftValue = bird[2].getBoundingClientRect().left;
            eggs[2].style.left = egg3LeftValue.toString() + "px";
        } else {
            egg3TopValue += 1;
        }
        eggs[0].style.top = egg1TopValue.toString() + "px";
        eggs[1].style.top = egg2TopValue.toString() + "px";
        eggs[2].style.top = egg3TopValue.toString() + "px";        
    }
}
//Egg in Basket
function CheckCollision() {
    if (!paused) {
        for (var i = 0; i < bird.length; i++) {
            if (
                eggs[i].offsetTop >= basket.offsetTop &&
                (basket.offsetLeft >= eggs[i].offsetLeft - basket.offsetWidth / 2 &&
                    basket.offsetLeft <= eggs[i].offsetLeft + basket.offsetWidth / 2)
            )
            {
                if (i == 0)
                {
                    egg1TopValue = bird[i].getBoundingClientRect().bottom;
                    egg1LeftValue = bird[i].getBoundingClientRect().left;
                    eggs[i].style.left = egg1LeftValue.toString() + "px";

                }
                else if (i == 1)
                {
                    egg2TopValue = bird[i].getBoundingClientRect().bottom;
                    egg2LeftValue = bird[i].getBoundingClientRect().left;
                    eggs[i].style.left = egg2LeftValue.toString() + "px";
                }
                else if (i == 2)
                {
                    egg3TopValue = bird[i].getBoundingClientRect().bottom;
                    egg3LeftValue = bird[i].getBoundingClientRect().left;
                    eggs[i].style.left = egg3LeftValue.toString() + "px";
                }
                if (eggs[i].id == "egg1" || eggs[i].id == "egg2" || eggs[i].id == "egg3") {
                     counter++;
                }
                else if (eggs[i].id == "blackegg") {
                    if (counter >= 10) {
                        counter -= 10;
                    }
                    else {
                        counter = 0;
                    }
                 }
                if (eggs[i].id == "goldenegg") {
                    counter +=3;
                }
                counterSpan.innerHTML = counter;
                eatEggsSound.play();//zika
            }
        }
    }
  
    
}
//Target Completed
var timerCheckAchiveTarget = setInterval(function() {
    if (counter >= Scoretarget) {
        CustomConfirm.style.visibility = "visible";
        messagesTarget.style.visibility = "visible";

        targetSound.play();//zika
        document.getElementById('timeCounter').innerText = tempSecond; // number of seconds to display in messageTarget
        hideComponents();
           // var playAgain = confirm("Do you want to play again??");
            if (playAgain) {
                res();
                playAgain = null;
                CustomConfirm.style.visibility = "hidden";
                messagesTarget.style.visibility = "hidden";

            }
            else if (playAgain == false) {
                CustomConfirm.style.visibility = "hidden";
                messagesTarget.style.visibility = "hidden";
                playAgain = null;
                //Scoretarget = 0;
                counter = 0;
                hours = 0;
                minute = 0;
                second = 0;
                checkIfBoxgetEggs = setInterval(CheckCollision, 50)
                document.getElementById("timer").innerHTML = "00:00:00";
                counterSpan.innerHTML = counter;
                restart.style.visibility = "hidden";
                normalModeBut.style.visibility = "visible";
                hardModeBut.style.visibility = "visible";

                //////////to be extended
            }
        
        
    }
}, 1);
//Game Over Message
var checkTimerOut = setInterval(function() {
    currentTime = hours * 60 * 60 + minute * 60 + second;
    if (currentTime >= Finishtime && counter < Scoretarget) {
        messageGameOver.style.visibility = "visible";
        CustomConfirm.style.visibility = "visible";
        timeFinishSound.play();//zika
        hideComponents();
        gameOver = true;
        if (playAgain) {
            res();
            playAgain = null;
            CustomConfirm.style.visibility = "hidden";
        }
        else if (playAgain == false) {
            CustomConfirm.style.visibility = "hidden";
            messageGameOver.style.visibility = "hidden";
            playAgain = null;
            //Scoretarget = 0;
            counter = 0;
            hours = 0;
            minute = 0;
            second = 0;
            checkIfBoxgetEggs = setInterval(CheckCollision, 50)
            document.getElementById("timer").innerHTML = "00:00:00";
            counterSpan.innerHTML = counter;
            restart.style.visibility = "hidden";
            normalModeBut.style.visibility = "visible";
            hardModeBut.style.visibility = "visible";

            //////////to be extended
        }

    }


}, 1);
//____________________________________________________________
function hideComponents() {
    stopTimer();
    basket.style.visibility = "hidden";
    pause.style.visibility = "hidden";
    resume.style.visibility = "hidden";
    restart.style.visibility = "hidden";
    farm.style.filter = "blur(5px)";
    clearInterval(checkIfBoxgetEggs);
    for (var i = 0; i < bird.length; i++) {
        bird[i].style.visibility = "hidden";
        eggs[i].style.visibility = "hidden";

    }
    document.getElementById("egg1").style.visibility = "hidden";
    document.getElementById("egg2").style.visibility = "hidden";
    document.getElementById("egg3").style.visibility = "hidden";
    document.getElementById("blackegg").style.visibility = "hidden";
    document.getElementById("goldenegg").style.visibility = "hidden";
    paused = true;

}
function visibleComponents() {
    for (var i = 0; i < bird.length; i++) {
        bird[i].style.visibility = "visible";
        eggs[i].style.visibility = "visible";
    }
    if (goldchosen) {
        document.getElementById("goldenegg").style.visibility = "visible";
    }
    else {
        document.getElementById("egg2").style.visibility = "visible";

    }
    if (blackchosen) {
        document.getElementById("blackegg").style.visibility = "visible";
    }
    else {
        document.getElementById("egg1").style.visibility = "visible";
    }
    basket.style.visibility = "visible";
    pause.style.visibility = "visible";
    farm.style.filter = "blur(0px)";
    UsernameSpan.setAttribute("style", "visibility:visible");
    startTimer();
}
function hideButtonOptionGame() {
    normalModeBut.style.visibility = "hidden";
    hardModeBut.style.visibility = "hidden";
    UsernameText.setAttribute("style", "visibility:hidden");
}
function startGameComponents() {
    for (var i = 0; i < bird.length; i++) {
        bird[i].style.visibility = "visible";
        eggs[i].style.visibility = "visible";
    }
    if (OptionModeNormal)
    {
        eggs[0] = document.getElementById("egg1");
        document.getElementById("blackegg").style.visibility = "hidden";

    }
    basket.style.visibility = "visible";
    pause.style.visibility = "visible";
    farm.style.filter = "blur(0px)";
    paused = false;
    startTimer();
}

