var questions = 
    [{questionNo: 1, 
        question: "Which continent is inhabitated by Penguins", 
        answer: "Antartica", 
        options: ['Antartica', 'Jamica', 'UK', 'India']},
    {questionNo: 2, 
        question: "What is the Capital of Italy", 
        answer: "Rome", 
        options: ['Sydney', 'Nicaragua', 'Switzerland', 'Rome']},
    {questionNo: 3, 
        question: "What is one of the Wonders of the World", 
        answer: "Hanging Gardens", 
        options: ['Swimming Pool', 'Hanging Gardens', 'Amazon', 'Car']}
];

    var qs;
    var questionCount= questions.length;
    var countDown;
    var timeLeft = Math.floor((30 % (1000 * 60)) / 1000);
    var myInterval;
    var currentQuestion;
    var timeOut = false;

    function askQuestion() {
      //  qs = Math.floor(Math.random() * questions.length) ;
          
        if(questions.length >= 0 ){
            console.log(questions.length);
            
            currentQuestion= questions.pop();
            $("#trivia-game").html("<h2>" + currentQuestion.question + "</h2>");
            //console.log("AskQuestion " + currentQuestion.options[0]);
            showOptions(currentQuestion.options);
            answerQuestion(currentQuestion); // THis is work in progress 
        }
        if(questions.length < 0){
            clearInterval(myInterval);
            clearTimeout(countDown);
            timeLeft=30;
            timeOut = false;
            removeButtons();
            $("#trivia-game").text("");
            console.log("reset");
        }
    }
   
    function answerQuestion () {
        if 
    }
    function removeButtons () {
        $("trivia-options").removeButtons();
    }
    function showOptions(cq){
            var currentOption;
            var currentQuestion=cq;
            
            for(i=0;i< currentQuestion.length;i++){
              //  console.log("showOption " + currentQuestion.options[0]);
                
                currentOption= currentQuestion[i];
                console.log("ShowOption's " + currentOption);
                var optionList = $("<button>");
                optionList.addClass("list-group-item list-group-item-action");
                optionList.attr("id", "button-"+i);
                optionList.attr("value", currentOption);
                optionList.text(currentOption);
                $("#trivia-options").append(optionList);
            }

    }


    function myQuestions() {

             askQuestion();
  
    }
    
    $("#start").on("click" , function(e) {
      
        if (!timeOut) {
            timeOut = true;
            myQuestions();
        }
    })
  

    
        