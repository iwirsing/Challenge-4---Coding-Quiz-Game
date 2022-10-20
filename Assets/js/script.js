var questionsArray=[
    ["String values must be enclosed with","square brackets","parenthesis","commas","apostrophes","apostrophes"],
    ["Which of the following is not an operator ","+","x","^","-","x"],
    ["What is the meaning of DOM? ","Domain Organizing Management","Kingdom","Document Object Model","Data Option Model","Document Object Model"],
    ["What is not a JavaScript data type? ","Switch","String","Number","Undefined","String"],
    ["In which element do we attach the JavaScript file?","<body>","<script>","<div>","<link>","<script>"]
]
//initialize variables
var ViewHighScore=document.getElementById("viewHighScore");
var Timer=document.getElementById("time");
var titleContent=document.getElementById("title");
var questionHolder=document.getElementById("QuestionHolder");
var choices=document.getElementById("multipleChoice");
var startButton=document.getElementById("startBtn");
var results=document.getElementById("results");
var messageHolder=document.getElementById("message");
var initials=document.getElementById("initialsForm");
var submit=document.getElementById("submitBtn");
var goBackButton=document.getElementById("goBackBtn");
var resetHighScore=document.getElementById("resetHighScore");

var choiceHolder;
var score;
var timer;
var question={};
var questionTraverser=0;
var numberHighScore=0;
var HighScoreStorage=[];

//function for start button
function StartGame (){
    
    countDown();

    //clear the title and choices
    clearDisplay();

        
    //capture first question
    question=questionsArray[questionTraverser];
    console.log(question);
    renderQuestion(question);
      
}
//function for timer
function countDown(){
    timer=75;
    
    //start timer
    var gameTimer=setInterval(function(){
    //display question if time is still on
    if (timer>0 && questionTraverser<5){        
        timer--; 
        Timer.textContent=timer; 
    }
    //all questions asked end game
    else if(questionTraverser===5)
    {
        clearInterval(gameTimer);
        endGame();
        Timer.textContent=timer; 

    }
    else { //out of time
        clearInterval(gameTimer);
        endGame();
        Timer.textContent=timer; 
    }
},1000);
}


//render question
function renderQuestion(q){
    //display question
    if (q !==undefined){
    questionHolder.textContent=q[0];
    //create element for choices and append them
    for(var i=1;i<5;i++){
        choiceHolder=document.createElement("li");
        choiceHolder.setAttribute("id","choice");
        choiceHolder.setAttribute("style","text-align:left");
        choiceHolder.textContent=q[i];
        choices.appendChild(choiceHolder);
        }
    }
}

   
//listen for user response and when responded display the next questions
document.querySelector('body').addEventListener('click',function(event){
    event.preventDefault();
    if((event.target.tagName.toLowerCase()==='li')&&(timer>0)){
        //capture answer in the variable
        var answer=event.target.textContent;
        console.log(answer);
        console.log("answer is "+ question[5]);
        
        
        //check if answer is correct
        if (answer===question[5]){
            console.log("answer is correct");
            console.log("correct "+questionTraverser);
            results.textContent=" Your answer is correct. ";
        }
        else{
            console.log("wrong choice");
            timer=timer-15;
            console.log("wrong "+questionTraverser);
            results.textContent=" Your answer is wrong. ";
        }

        questionTraverser++;
        clearDisplay();

        //choose the next question
        question=questionsArray[questionTraverser];
        console.log(question);
        renderQuestion(question);
            
    }
    else{
        return;
    }

});
       
//end game function
function endGame(){
    //clear the other messages
     clearDisplay();

     //capture score
     score=timer;

    //display the final message
    titleContent.textContent="All done!";
    messageHolder.textContent="Your final score is "+score+".";
    initials.setAttribute("style","display:block");

    //reset the traverser 
    questionTraverser=0;
    timer=0;
    

    
    
}

//function to show high score
function showHighScore(){
    //clear the other messages
    clearDisplay();

    //display high score
    questionHolder.setAttribute("style","text-align:left");
    questionHolder.textContent="Highscore: ";

  
    //retrieve the high score list
    var highScoreRecall=JSON.parse(localStorage.getItem("highScoreList"));
    console.log(highScoreRecall);

    
    //populate sorted high score
    for(var i=0;i<highScoreRecall.length;i++){
        choiceHolder=document.createElement("li");
        choiceHolder.setAttribute("style","text-align:left;display:block");
        choiceHolder.textContent=highScoreRecall[i].initialSave+"  -  "+highScoreRecall[i].score;
        choices.appendChild(choiceHolder);
        console.log(choiceHolder);
    }

    //show go back to start button
    goBackButton.setAttribute("style","visibility:visible; pointer:cursor");
    goBackButton.textContent="Go Back To Start";

    //show reset high score button
    resetHighScore.setAttribute("style","visibility:visible; pointer:cursor");
    resetHighScore.textContent="Reset High Score";

}


//clear display
function clearDisplay(){
    titleContent.textContent=""; //clears title
    messageHolder.textContent="";//clears score message
    initials.setAttribute("style","display:none"); //removes the form from display
    results.textContent="";//clears results message
    choices.textContent=""; //clear the choices where the high score will be displayed as a list
    startButton.setAttribute("style","display:none") //clears the start button
    questionHolder.textContent="";
    
}


//function to save high score
function addHighScore(){
    event.preventDefault();
    //capture values
    var initialSave=document.getElementById("initials").value;
    
    //create object
    var newScore={initialSave,score};


    if(initialSave===""){
        results.textContent=" Initials cannot be blank. ";
    }
    else{

        //add object to list of high score array
        HighScoreStorage.push(newScore);

        //sort the list of high score
        HighScoreStorage.sort((a,b)=>{
            if (a.score===b.score) return a.initialSave-b.initialSave; //if equal do nothing
            return b.score - a.score;
        })
        //save to local storage
        localStorage.setItem("highScoreList",JSON.stringify(HighScoreStorage));
        showHighScore();
    }
}

//function to reset High Score
function resetScore(){
    HighScoreStorage=[];
    localStorage.setItem("highScoreList",JSON.stringify(HighScoreStorage));
    showHighScore();


}

//initialize page
function init(){
    clearDisplay();
    titleContent.textContent="Coding Quiz Challenge";
    messageHolder.textContent="Try to answer the following code related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by 15 seconds.";
    startButton.setAttribute("style","visibility:visible");
    startButton.textContent="Start Quiz";
    results.textContent="";
    goBackButton.setAttribute("style","visibility:hidden");
    resetHighScore.setAttribute("style","visibility:hidden");
}

init();

//listens for start button
startButton.addEventListener("click",StartGame)

//listens for submit button
submit.addEventListener("click",addHighScore)

//listens for high score
ViewHighScore.addEventListener("click",showHighScore)

//listens for go back button
goBackButton.addEventListener("click",init)

//listens for reset high score
resetHighScore.addEventListener("click",resetScore)


