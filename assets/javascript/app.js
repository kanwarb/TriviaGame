$(document).ready( function (){
// create an array of questions 
var questions = 
    [{questionNo: 1, 
        question: "Which continent is inhabitated by Penguins", 
        answer: "Antartica", 
        answerImg: "assets/images/penguins.jpg",
        options: ['Antartica', 'Jamica', 'UK', 'India']},
    {questionNo: 2, 
        question: "What is the Capital of Italy", 
        answer: "Rome", 
        answerImg: "assets/images/rome.jpg",
        options: ['Sydney', 'Nicaragua', 'Switzerland', 'Rome']},
    {questionNo: 3, 
        question: "What is one of the Wonders of the World", 
        answer: "Hanging Gardens", 
        answerImg: "assets/images/hanging-gardens.png",
        options: ['Swimming Pool', 'Hanging Gardens', 'Amazon', 'Your Backyard']}
];

// Global Variables 
    var qs;
    var questionCount= questions.length;
    var countDown;
    var timeLeft = 10;
    var myInterval;
    var currentQuestion;
    var timeOut = true;
    var userSelected='';
    var userSelection ='';
    var correctAnswer='';
    var intervalId;
    var qCount=0;
    var ansInterval;
    var timeInterval= false;
    var unanswered=0;
    var answered=0;
    var timedOut=0;
    var isClicked = false;;
    var ansImage;

// Invoke Trivia Game here when user presses the start button
$("#start").on("click" , function(e) {      
    $("#start").hide();
    myQuestions();
    
})
    
function triviaSummary()
{
    console.log("Trivia Game over");
}
function myQuestions() {
  askQuestion();
}

// The reset function resets all values assigned before asking the next question
function resetValues() {

    clearInterval(myInterval);
    clearTimeout(countDown);
    timeLeft=10;
    timeOut = false;
    userSelection='';
    clearInterval(timeInterval);
    clearTimeout(ansInterval);
    timeInterval='';
    ansInterval='';
    isClicked = false;
    $('.btn-list').remove();
    askQuestion();
    if(questions.length ===0  && isClicked) {
        console.log("Questions over");
        triviaSummary();

    }
}

    
// 
// Functions 
// askQuestion function will read the last question from the list and present it to the user
// It will call showOptions function which creates a set of buttons with possible answers as a list group
// answerQuestion function is called next which invokes the answer based on user selection
// A countdown timer keeps track of the time left

    function askQuestion() {
        
        if(questions.length > 0 ){
            currentQuestion= questions.pop();
            correctAnswer = currentQuestion.answer;

            timeInterval = setInterval(timeLapsed,1000);
            $("#trivia-game").html("<h2>" + currentQuestion.question + "</h2>");
            showOptions(currentQuestion.options);

            $(".btn-list").on("click" , function() {
                isClicked = true;
                userSelection = $(this).attr('value');
               
                answerQuestion (currentQuestion,userSelection);
                
                //answerQuestion (currentQuestion,userSelection);
                setTimeout(resetValues, 2000);
            })
            

        }
        if(questions.length == 0){
           
           if(isClicked){
               triviaSummary();
               console.log(questions.length);
           }
                   
        }
    }


    function showOptions(cq){
            var currentOption;
            var currentQuestion=cq;
           

            for(i=0;i< currentQuestion.length;i++){
              //  console.log("showOption " + currentQuestion.options[0]);
                
                currentOption= currentQuestion[i];
                console.log("ShowOption's " + currentOption);
                var divlist = $("<div>");
                divlist.attr("id","buttonList");
                var optionList = $("<button>");
                optionList.addClass("btn-list list-group-item list-group-item-action");
                optionList.attr("id", "button-"+i);
                optionList.attr("value", currentOption);
                optionList.text(currentOption);
                $("#trivia-options").append(divlist);
                $("#buttonList").append(optionList);

           
        }      

    }


  // Maintain a time elapsed count down
    function timeLapsed() {
        timeLeft--;
        $("#trivia-timeLeft").text("Time Left: " + timeLeft );
        // If the use did not press any key then the question times out 
        if(timeLeft === 0){
            if(!isClicked) {
                timedOut++;
                $("#qAnswer").text("Time Out");
                console.log(currentQuestion.answerImg);
                $("#qAnswerImg").html("<img class= img'-thumbnail src=" + currentQuestion.answerImg + " width='300px'>");
                console.log("timeout " +timedOut);

            }   
            setTimeout(resetValues, 1000);
        }
     
     
    }
// answer Question is where the user selection to answer is verified, if the answer is right he get a point  if he gets it wrong
// He loses and a count is added to correct , incorrect and not answered questions

    function answerQuestion (currentQuestion,userSelection) {
        
       

            if (userSelection === correctAnswer ) {
                answered++;
                $('.btn-list').remove();
                $("#qAnswer").text("Correct Answer!");
                $("#qAnswerImg").html("<img class= img'-thumbnail src=" + currentQuestion.answerImg + " width='300px'>");
                console.log(answered);
                //resetValues();
            }
            else{
                $('.btn-list').remove();
                unanswered++;
                $("#qAnswer").text("Incorrect Answer. Correct Answer is "+currentQuestion.answer);
                $("#qAnswerImg").html("<img class= img'-thumbnail src=" + currentQuestion.answerImg + " width='300px'>");
                console.log("That is not the right answer");
                console.log("correct answer" + currentQuestion.answer);
               // resetValues();
            }
           
        }      

   
    function removeButtons () {
        $("trivia-options").removeButtons();
    }

})
    
   

    
        