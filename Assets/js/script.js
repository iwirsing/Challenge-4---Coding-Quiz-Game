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
var email=document.getElementById("emailForm");
var submit=document.getElementById("submitBtn");

var choiceHolder;
var score;
var timer;
var question={};
var questionTraverser=0;

//function for start button
function StartGame (){
    countDown();

    //clear the title and choices
    choices.textContent="";
    messageHolder.textContent="";
    titleContent.textContent="";
    startButton.setAttribute("style","display:none")

    // if(questionTraverser<5)      {
        
    //cacpture first question
    question=questionsArray[questionTraverser];
    console.log(question);
    renderQuestion(question);
    

    // }
    
  
        
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
    }
    else { //out of time
        clearInterval(gameTimer);
        endGame();
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
            
        }
        else{
            console.log("wrong choice");
            timer=timer-15;
            console.log("wrong "+questionTraverser);
            
        }
        questionTraverser++;
        //clear the title and choices
        choices.textContent="";
        messageHolder.textContent="";
        titleContent.textContent="";
        startButton.setAttribute("style","display:none")

        //choose the next question
        question=questionsArray[questionTraverser];
        console.log(question);
        renderQuestion(question);
            
    }
    else{
        return;
    }

})
       
//end game function
function endGame(){
    //clear the other messages
    choices.setAttribute("style","visibility:hidden"); //hide and need to resurface
    questionHolder.textContent="";
    startButton.setAttribute("style","visibility:hidden");

    //display the final message
    titleContent.textContent="All done!";
    messageHolder.textContent="Your final score is "+timer+".";
    email.setAttribute("style","display:block");
    
    
}
//function for high score

//checks answers and displays after

//saves high score
function addHighScore(){
    
}

//initialize page
function init(){
    titleContent.textContent="Coding Quiz Challenge";
    messageHolder.textContent="Try to answer the following code related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by 15 seconds.";
    startButton.setAttribute("style","visibility:visible");
    startButton.textContent="Start Quiz";
}

init();

//listens for start button
startButton.addEventListener("click",StartGame)

//listens for submit button
submit.addEventListener("click",addHighScore)

//listens for high score



