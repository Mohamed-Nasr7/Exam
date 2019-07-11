

var examObj = {

    name: "Exam",
    time: 30,
    questions: [
        {
            head: "Full form of URL is?",
            answers: [
                "a. Uniform Resource Locator",
                "b. Uniform Resource Link",
                "c. Uniform Registered Link",
                "d. Uniform Resource Link"
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




function radios(){

//               Radio Buttons


    for(i_of_answer=0; i_of_answer<examObj.questions[1].answers.length; i_of_answer++){


        //Radio 
        radio = document.createElement('input');
        radio.setAttribute('type', 'radio');
        radio.setAttribute('value', examObj.questions[i].answers[i_of_answer]);
        radio.setAttribute('name', 'ques');


        //span
        radioSpan = document.createElement('span');
        radioSpan.innerText = " "+ examObj.questions[i].answers[i_of_answer];
        radioSpan.style.fontSize = "18px";
        radioSpan.style.display = "inline-block";
        radioSpan.style.margin = "10px";


        internalwrapper.appendChild(radio);
        internalwrapper.appendChild(radioSpan);

        var br = document.createElement('br');
        internalwrapper.appendChild(br);

    }


    $("[type='radio']").on("click", function(){

        for(i_of_answer=0; i_of_answer<examObj.questions[1].answers.length; i_of_answer++){

            if(document.getElementsByTagName("input")[i_of_answer].checked){

                checkedarr[i] = i_of_answer;

                if(examObj.questions[i].correctAnswer == checkedarr[i]){
                    correctAnswer[i] = 1;
                }
                else{
                    correctAnswer[i] = undefined;
                }

            }
        }
    });


}


//To save the user's choice
var checkedarr = new Array(examObj.questions.length);
//To save the correct answer that user chose
var correctAnswer = new Array();
var i_of_answer;
var sum = 0;
$(function(){

    i=0;
    // internalwrapper div
    internalwrapper = document.getElementById('internalwrapper');


    var examName = examObj.name;
    var title = document.createElement("div");
    title.innerText = examName;
    title.style.fontSize = "40px"
    internalwrapper.appendChild(title);



//            QUESTION
    nameheader = document.createElement('h2');
    // h2 inner text => name
    nameheader.innerText = examObj.questions[0].head;
    nameheader.style.color = 'blue';

    // add h2 with internalwrapper
    internalwrapper.appendChild(nameheader);



    radios();

    // btnnext
    btnnext = document.getElementById('btnnext');
    btnnext.addEventListener('click', nextques);


    btnprev = document.getElementById('btnprev');
    btnprev.addEventListener('click', prevques);
    btnprev.setAttribute("disabled","disabled");


    btnsubmit = document.getElementById('btnsubmit');
    btnsubmit.addEventListener('click', submitAnswer);




//end of load function

    });







function nextques() {

    btnprev.removeAttribute("disabled");
    i++;
    if (i == examObj.questions.length-1)
    {
        btnnext.setAttribute("disabled","disabled");
    }

    internalwrapper = document.getElementById('internalwrapper');
    internalwrapper.innerText = "";




    var examName = examObj.name;
    var title = document.createElement("div");
    title.innerText = examName;
    title.style.fontSize = "40px"
    internalwrapper.appendChild(title);


    nameheader = document.createElement('h2');
    // h2 inner text => name
    nameheader.innerText = examObj.questions[i].head;
    nameheader.style.color = 'blue';

    // add h2 with internalwrapper
    internalwrapper.appendChild(nameheader);

    radios();


}



function prevques() {

    btnnext.removeAttribute("disabled");
    i--;
    if (i == 0) {
//                i = persons.length-1;
        btnprev.setAttribute("disabled","disabled");
    }



    internalwrapper = document.getElementById('internalwrapper');
    internalwrapper.innerText = "";


    var examName = examObj.name;
    var title = document.createElement("div");
    title.innerText = examName;
    title.style.fontSize = "40px"
    internalwrapper.appendChild(title);




    nameheader = document.createElement('h2');
    // h2 inner text => name
    nameheader.innerText = examObj.questions[i].head;
    nameheader.style.color = 'blue';

    // add h2 with internalwrapper
    internalwrapper.appendChild(nameheader);


    radios();

}


flag = 0;
var x = 30;
t =setInterval(function(){

    x--;
    document.getElementsByClassName('timer')[0].innerText = "Timer : "+x;
    if(x == 0 && flag == 0){
    submitAnswer();
    clearInterval(t);
}

},1000)




function submitAnswer(){
    flag = 1;
    for(i in correctAnswer){
        if(correctAnswer[i] == 1)
            sum++;
    }

//            alert("Your result is "+sum+" / "+ examObj.questions.length);

    internalwrapper.innerText="";
    var par = document.createElement("p");
    par.style.fontSize = "30px";
    internalwrapper.appendChild(par);
    par.innerHTML="Exam is ended<br><br>Your result: "+sum+" / "+ examObj.questions.length;


    document.getElementById("btnprev").style.display = "none";
    document.getElementById("btnnext").style.display = "none";
    document.getElementById("btnsubmit").style.display = "none";
    document.getElementsByClassName('timer')[0].style.display = "none";

}
        
