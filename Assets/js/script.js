//array of array of array contains the ff: question, first choice, second choice, third choice, fourth choice and answer
var multipleArrayOfQuestions=[
    [
        ["String values must be enclosed with","square brackets","parenthesis","commas","apostrophes","apostrophes"],
        ["Which of the following is not an operator ","+","x","^","-","x"],
        ["What is the meaning of DOM? ","Domain Organizing Management","Kingdom","Document Object Model","Data Option Model","Document Object Model"],
        ["What is not a JavaScript data type? ","Switch","String","Number","Undefined","String"],
        ["In which element do we attach the JavaScript file?","<body>","<script>","<div>","<link>","<script>"]],
    [
        ["What are not text formatting tags in HTML?","<p>","<br>","<button>","<b>","<button>"],
        ["What is part of a table tag? ","<th>","<hr>","<li>","<ol>","<th>"],
        ["Which selector matches a specific element only when it is inside another element? ","Type Selector","Universal Selector","Descendant Selector","Class Selector","Descendant Selector"],
        ["What value in cursor styling shows a pointing hand? ","crosshair","move","default","pointer","pointer"],
        ["Which operator compares values and types in JavaScript?","===","==","*","%","==="]],
    [
        ["What does isNaN function do?","returns true if the argument is a number","returns true if the argument is not a number","checks if it is an integer","checks if the value is random","returns true if the argument is not a number"],
        ["Which symbol is used for comments in JavaScript? ","//","![]","=>","<-->","//"],
        ["What element is responsible for making text bold in HTML? ","<pre>","<a>","<b>","<br>","<b>"],
        ["What tag is used to make underlined text? ","<ul>","<li>","<pre>","<u>","<u>"],
        ["What property in CSS is used to change the color of text?","text color","color","background-color","rgb color","color"]]
]


//initialize variables that captures HTML elements
var choices=document.getElementById("multipleChoice");
var goBackButton=document.getElementById("goBackBtn");
var hrCapture=document.getElementById("line");
var initials=document.getElementById("initialsForm");
var messageHolder=document.getElementById("message");
var questionHolder=document.getElementById("QuestionHolder");
var resetHighScore=document.getElementById("resetHighScore");
var results=document.getElementById("results");
var startButton=document.getElementById("startBtn");
var submit=document.getElementById("submitBtn");
var Timer=document.getElementById("time");
var titleContent=document.getElementById("title");
var ViewHighScore=document.getElementById("viewHighScore");

//initialize the other global variables

var choiceHolder;
var HighScoreStorage=JSON.parse(window.localStorage.getItem("highScoreList")) || [];
var HighScorePrev=[];
var numberHighScore=0;
var question;
var questionsArray=[];//stores chosen set of questions
var questionTraverser=0;
var score;
var timer;


//Function 1: LOADING PAGE
//initialize page
function init(){
    //clear display
    clearDisplay();
    hrCapture.setAttribute("style","visibility:hidden");

    //get Local storage
    HighScorePrev=JSON.parse(localStorage.getItem("highScoreList"));

     //timer value initialized
     timer=75;
     Timer.textContent=timer; 

    //display loading page
    titleContent.textContent="Coding Quiz Challenge";
    messageHolder.textContent="Try to answer the following code related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by 15 seconds.";
    startButton.setAttribute("style","visibility:visible");
    startButton.textContent="Start Quiz";

    //select question set randomly
    questionsArray=multipleArrayOfQuestions[Math.floor(Math.random()*multipleArrayOfQuestions.length)];
}
//Function 2: START BUTTON
function StartGame (){
   
    //start timer
    countDown();

    //clear the title and choices
    clearDisplay();
        
    //capture first question
    question=questionsArray[questionTraverser];
    renderQuestion(question);
}
//Function 3: TIMER
function countDown(){
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

    //out of time
    else { 
        clearInterval(gameTimer);
        endGame();
        Timer.textContent=timer; 
    }
},1000);
}

//Function 4: CLEAR MOST OF THE DISPLAY except results
function clearDisplay(){
    choices.textContent=""; //clear the choices where the high score will be displayed as a list
    goBackButton.setAttribute("style","visibility:hidden"); //hide go back button
    initials.setAttribute("style","display:none"); //removes the form from display
    messageHolder.textContent="";//clears score message
    questionHolder.textContent=""; //clears question holder
    resetHighScore.setAttribute("style","visibility:hidden");//hide high score
    startButton.setAttribute("style","visibility:hidden") //clears the start button
    titleContent.textContent=""; //clears title
}


//Function 5: DISPLAY THE QUESTION AND CHOICES
function renderQuestion(q){
    //display question
    if (q !== undefined){
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

//Function 6: END THE GAME
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

   
//listen for user response and when responded display the next questions and Function 7: CHOOSING THE ANSWER
document.querySelector('body').addEventListener('click',function(event){
    event.preventDefault();
    if((event.target.tagName.toLowerCase()==='li')&&(timer>0)){
        //capture answer in the variable
        var answer=event.target.textContent;
        
        //display the results and the horizontal rule
        hrCapture.setAttribute("style","visibility:visible");
        results.setAttribute("style","display:block");

        //check if answer is correct
        if (answer===question[5]){
            results.textContent=" You are correct. ";

        }
        //else wrong answer and then display the answer
        else{
            results.textContent=" Wrong choice made. The correct choice is "+question[5]+".";
            timer=timer-15;
        }

        //hide the answer results after 1.5 seconds
        setTimeout(function(){
            hrCapture.setAttribute("style","visibility:hidden");
            results.setAttribute("style","display:none");
        },1500);

        //increase the index for traversing question
        questionTraverser++;
        clearDisplay();

        //choose the next question
        question=questionsArray[questionTraverser];
        renderQuestion(question);
            
    }
    else{
        return;
    }

});
       

//function to show high score
function showHighScore(){
    //clear the other messages
    clearDisplay();
    results.setAttribute("style","display:none");

    //display high score title
    questionHolder.setAttribute("style","text-align:left");
    questionHolder.textContent=" Highscore: ";

    //retrieve the high score list
    var highScoreRecall=JSON.parse(localStorage.getItem("highScoreList"));

    if (highScoreRecall!==null){ //make sure the array is not null
    //populate sorted high score
    for(var i=0;i<highScoreRecall.length;i++){
        choiceHolder=document.createElement("li");
        choiceHolder.setAttribute("style","text-align:left;display:block");
        choiceHolder.textContent=highScoreRecall[i].score+' - '+ highScoreRecall[i].initialSave;
        choices.appendChild(choiceHolder);
    }}

    //show go back to start button
    goBackButton.setAttribute("style","visibility:visible ");
    goBackButton.textContent="Go Back To Start";

    //show reset high score button
    resetHighScore.setAttribute("style","visibility:visible");
    resetHighScore.textContent="Reset High Score";

}

//SUBMIT
//function to save high score
function addHighScore(){
   
    //capture values
    var initialSave=document.getElementById("initials").value;
    
    //create object
    var newScore={initialSave,score};


    if(initialSave===""){
        results.setAttribute("style","display:block");
        results.textContent=" Initials cannot be blank. ";
    }
    else{
        //hide  results message
        results.setAttribute("style","display:none");

        //add object to list of high score array
        HighScoreStorage.push(newScore);;

        //sort the list of high score
        HighScoreStorage.sort((a,b)=>{
            if (a.score===b.score) return a.initialSave-b.initialSave; //if equal do as the orig order
            return b.score - a.score;
        })
        //save to local storage
        localStorage.setItem("highScoreList",JSON.stringify(HighScoreStorage));
        showHighScore();
    }
}

//RESET
//function to reset High Score
function resetScore(){
    HighScoreStorage=[]; //remove all contents
    localStorage.setItem("highScoreList",JSON.stringify(HighScoreStorage));
    showHighScore(); //show now
    window.localStorage.clear(); //completely empty local storage
}

//initialize loading page
init();

//listens for start button
startButton.addEventListener("click",StartGame)

//listens for high score
ViewHighScore.addEventListener("click",showHighScore)

//listens for submit button
submit.addEventListener("click",addHighScore)

//listens for go back button
goBackButton.addEventListener("click",init)

//listens for reset high score
resetHighScore.addEventListener("click",resetScore)


