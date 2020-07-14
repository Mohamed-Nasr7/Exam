
// Exam Object

var examObj = {

    name: "Exam",
    time: 60,
    questions: [
        {
            head: "Full form of URL is?",
            answers: [
                "a. Uniform Resource Locator",
                "b. Uniform Resource Link",
                "c. Uniform Registered Link",
                "d. Uniform Reference Link"
            ],
            correctAnswer: 0,
            grade: 1
        },

        {
            head: "In which of the following form, data is stored in computer ?",
            answers: [
                "a. Decimal",
                "b. Binary",
                "c. HexaDecimal",
                "d. Octal"
            ],
            correctAnswer: 1,
            grade: 1
        },

        {

            head: "HTML is a ",
            answers: [
                "a. Programming language",
                "b. Library",
                "c. Framework",
                "d. Markup Language"
            ],
            correctAnswer: 3,
            grade: 1
        },

        {

            head: "Full form of HTTP is?",
            answers: [
                "a. Hypertext preprocessor",
                "b. Hypertext Markup Language",
                "c. Hypertext Transfer Protocol",
                "d. None of these"
            ],
            correctAnswer: 2,
            grade: 1
        },

        {

            head: "JavaScript is a",
            answers: [
                "a. Compiled Language",
                "b. Interpreted Language",
                "c. Markup Language",
                "d. None of these"
            ],
            correctAnswer: 1,
            grade: 1
        }

    ]

};



//To save the user's choice
var checkedRadio = new Array(examObj.questions.length);
//To save the correct answer that user chose
var correctAnswer = new Array();

// Index that indicates where we are in the questions array
var questionsIndex = 0;

var i_of_answer;
var sum = 0;
var flag = 0;

internalwrapper = document.getElementById('internalwrapper');





// fetching questions from exam object

function questions(){

    for(i_of_answer=0; i_of_answer<examObj.questions[1].answers.length; i_of_answer++){

        //Radio 
        radio = document.createElement('input');
        radio.setAttribute('type', 'radio');
        radio.setAttribute('value', examObj.questions[questionsIndex].answers[i_of_answer]);
        radio.setAttribute('name', 'ques');


        //choices
        radioSpan = document.createElement('span');
        radioSpan.innerText = " "+ examObj.questions[questionsIndex].answers[i_of_answer];
        
        radioSpan.classList.add("choices");


        internalwrapper.appendChild(radio);
        internalwrapper.appendChild(radioSpan);

        var br = document.createElement('br');
        internalwrapper.appendChild(br);

    }

    radioButtonsEventListener()

}



// Question Template

function questionBody(index){

    internalwrapper.innerText = "";

    nameheader = document.createElement('h2');
    nameheader.classList.add('question-head');
    // h2 inner text => name
    nameheader.innerText = examObj.questions[index].head;

    // add h2 with internalwrapper
    internalwrapper.appendChild(nameheader);
}





// setup radio buttons events and calcuate all selected radio

function radioButtonsEventListener(){

    var radioButtons = document.querySelectorAll("[type='radio']");

    radioButtons.forEach(function(radio){
        radio.addEventListener("click", function(){

            for(i_of_answer = 0; i_of_answer < examObj.questions[1].answers.length; i_of_answer++){

                
                if(radioButtons[i_of_answer].checked){
                    
                    checkedRadio[questionsIndex] = i_of_answer;
                    console.log(checkedRadio);

                    if(examObj.questions[questionsIndex].correctAnswer === checkedRadio[questionsIndex]){
                        correctAnswer[questionsIndex] = 1;
    
                        console.log(correctAnswer);
                    }
                    else{
                        correctAnswer[questionsIndex] = undefined;
                    }
    
                }
            }

        });
    });


}




// Next Question function

function nextQuestion() {

    btnprev.removeAttribute("disabled");

    questionsIndex++;

    if (questionsIndex == examObj.questions.length-1)
    {
        btnnext.setAttribute("disabled","disabled");
    }
    
    questionBody(questionsIndex);
    questions();
}




// Previous Question function

function previousQuestion() {

    btnnext.removeAttribute("disabled");
    
    questionsIndex--;
    
    if (questionsIndex == 0) {
        btnprev.setAttribute("disabled","disabled");
    }
    
    questionBody(questionsIndex);
    questions();
}




// Submit answer and finish test function

function submitAnswer(){
    flag = 1;
    for(i in correctAnswer){
        if(correctAnswer[i] == 1)
            sum++;
    }

    internalwrapper.innerText="";
    internalwrapper.innerHTML="<h2 class='end'>Exam is ended</h2>  <p class='result'>Your result: "+sum+" / "+ examObj.questions.length+ "</p>";


    document.querySelector('.buttons').style.display = "none"
    document.getElementsByClassName('timer')[0].style.display = "none";

}




// App starts after clicking start button

document.querySelector('#start').addEventListener('click', appController);


// App Controller

function appController(){

    //Remove starting paragraph after clicking start
    document.querySelector('.start').style.display = "none";

    // Template of every question
    questionBody(questionsIndex);

    // Call radio buttons method
    questions();


    //displaying submit, next and previous buttons
    document.querySelector('.buttons').style.display = "block"


    // btnnext event handler
    btnnext = document.getElementById('btnnext');
    btnnext.addEventListener('click', nextQuestion);

    // btnprev event handler
    btnprev = document.getElementById('btnprev');
    btnprev.addEventListener('click', previousQuestion);
    btnprev.setAttribute("disabled","disabled");


    btnsubmit = document.getElementById('btnsubmit');
    btnsubmit.addEventListener('click', submitAnswer);


    // Timer 
    var examTime = examObj.time;
    document.getElementsByClassName('timer')[0].innerText = "Timer : "+examTime;

    var t = setInterval(function(){
        examTime--;
        document.getElementsByClassName('timer')[0].innerText = "Timer : "+examTime;
        if(examTime == 0 && flag == 0){
            clearInterval(t);
            submitAnswer();
        }

    },1000)

}



