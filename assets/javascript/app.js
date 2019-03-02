//$(document).ready( function (){
// create an array of questions 
var questionsArr = 
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
        options: ['Swimming Pool', 'Hanging Gardens', 'Amazon', 'Your Backyard']},
    {questionNo: 4, 
            question: "Where is the Golden Gate Bridge", 
            answer: "San Francisco", 
            answerImg: "assets/images/goldengate.jpg",
            options: ['San Francisco', 'Belgium', 'London', 'Sacramento']},
    {questionNo: 5, 
                question: "What were the Wright Brothers famous for ", 
                answer: "Planes", 
                answerImg: "assets/images/wrightbrothers.jpg",
                options: ['Cars', 'Pens', 'Planes', 'Bunji Jumping']},
    {questionNo: 6, 
                    question: "What were the Native's in America", 
                    answer: "American Indian", 
                    answerImg: "assets/images/nativeamerican.jpg",
                    options: ['Japanese', 'British', 'French', 'American Indian']},
    {questionNo: 7, 
                    question: "What Temprature does water freeze", 
                    answer: "0 Degree", 
                    answerImg: "assets/images/waterfreezing.jpg",
                    options: ["100 Degree Fh", '20 Degree Fh', '10 Degree C', '0 Degree']},
    {questionNo: 8, 
                    question: "Who was the first man in space", 
                    answer: "Yuri Gagarin", 
                    answerImg: "assets/images/yurigagarin.jpg",
                    options: ['Buzz Aldrige', 'Yuri Gagarin', 'Scooby Do', 'Neil Armstrong']},
    {questionNo: 9, 
                    question: "Where was the first man on the moon", 
                    answer: "Neil Armstrong", 
                    answerImg: "assets/images/neilarmstrong.jpg",
                    options: ['John Gault', 'Neil Armstrong', 'Yuri Gagarin', 'None of these']}
];

// Global Variables 
    var qs;
    var questions =[];
    var questionCount= questions.length;
    var countDown;
    var timeLeft = 30;
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
$("#start").click( function(e) { 
    e.preventDefault();     
    $("#start").hide();
     questions = questionsArr.slice(0);
    //questions= questionsArr;
    askQuestion();
    
})
    

// function myQuestions() {
//   askQuestion();
// }

// The reset function resets all values assigned before asking the next question
function resetValues() {
    clearInterval(timeInterval);
    
    $("#qAnswer").empty();
    $("#qAnswerImg").empty();
    $('.btn-list').remove();
    timeLeft=30;
    timeOut = false;
    userSelection='';
    timeInterval='';
    ansInterval='';
    isClicked = false;
    $("#qAnswer").addClass("hide");
    $("#qAnswerImg").addClass("hide");
    askQuestion();
    
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
                $("#qAnswer").addClass("show");
                $("#qAnswerImg").addClass("show");
                 setTimeout(resetValues, 1000);
                 if(questions.length == 0 && isClicked){
                    if(isClicked){
                        isClicked=false;
                        triviaSummary();
                        
                        console.log("End of questions"+ questions.length);
                    }   
                           
                 }
            })
        }
    }

    function showOptions(cq){
            var currentOption;
            var currentQuestion=cq;
           

            for(i=0;i< currentQuestion.length;i++){
                
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
                $('.btn-list').remove();
                $("#qAnswer").text("Time Out. Correct Answer is"+ currentQuestion.answer );
                $("#qAnswerImg").html("<img class= img'-thumbnail src=" + currentQuestion.answerImg + " width='300px'>");
                console.log("timeout " +timedOut);

            }   
           
            setTimeout(resetValues, 1000);
            if(questions.length ==0 ){
               triviaSummary();
            }
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
                
            }
            else{
                
                unanswered++;
                $('.btn-list').remove();
                $("#qAnswer").text("Incorrect Answer. Correct Answer is " + currentQuestion.answer);
                $("#qAnswerImg").html("<img class= img'-thumbnail src=" + currentQuestion.answerImg + " width='300px'>");
                console.log("That is not the right answer");
                console.log("correct answer" + currentQuestion.answer);
               
            }
           
        }      

    function triviaSummary(){
        
        $("#trivia-timeLeft").empty();
        $("#trivia-game").empty();
        $("#trivia-options").empty();
        $("#qAnswer").empty();
        $("#qAnswerImg").empty();
        $("#trivia-game").show();
        $("#trivia-game").html("<h3>" + "All done here. Let's see how you did" + "</h3> <br><br>");
        $("#trivia-options").html("<h4 class='text-center mx-auto'> Correct Answers: " + answered + " </h4> <br>" );
        $("#trivia-options").append("<h4 class='text-center mx-auto'> Incorrect Answers: " + unanswered+ " </h4> <br>" );
        $("#trivia-options").append("<h4 class='text-center mx-auto'> Unanswered: " + timedOut + " </h4> <br>" );
        $("#startOver").attr("style", "visibility:visible");
 
    }

    
    $("#startOver").on("click",function (e) {
        e.preventDefault(); 
        $("#startOver").hide();
        $("#trivia-timeLeft").empty();
        $("#trivia-game").empty();
        $("#trivia-options").empty();
        $("#qAnswer").empty();
        $("#qAnswerImg").empty();
        timedOut=0;
        unanswered=0;
        answered=0;
        timeLeft=30;
        userSelected='';
        userSelection='';
        isClicked = false;
        clearInterval(timeInterval);
        questions = questionsArr.slice(0);
       // findQuestions();
        askQuestion();
         console.log("trivia Question");
     });

    //  function findQuestions() {
    //     for(i=0;i< questions.length;i++){
    //         console.log(questions[i].answer);
    //     }
    //  }
   
//})
    
   

    
        