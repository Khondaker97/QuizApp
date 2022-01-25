const sBtn = document.querySelector('.start_btn button');
const iBox = document.querySelector('.info_box');
const exitBtn = document.querySelector('.buttons .quit');
const conBtn = document.querySelector('.buttons .restart');
const quizBox = document.querySelector('.quiz_box');
const nBtn = document.querySelector('footer .next_btn');
const optionList = document.querySelector('.option_list');
const timeCount = quizBox.querySelector(".timer .timer_sec");
const timeLine = quizBox.querySelector("header .time_line"); 
const resBox = document.querySelector('.result_box');
const rQuiz = resBox.querySelector('.buttons .restart');
const exitQuiz = resBox.querySelector('.buttons .quit');

//if start quiz button is clicked
sBtn.onclick = () => {
    iBox.classList.add("active"); // show the info box
}
// i can use addEventListener too
// sBtn.addEventListener('click', () => {
//     iBox.classList.add("active");
// });

//if Exit button is clicked
exitBtn.onclick = () => {
    iBox.classList.remove("active"); // the info box will be hidden
}

conBtn.onclick = () => {
    iBox.classList.remove("active"); // the info box will be removed
    quizBox.classList.add("active"); // show the quiz box
    showQues(0);
    qCounter(1);
    startTimer(15);
    startTimerLine(0);
    nBtn.style.display = "none";
}




let que_count = 0;
let que_num = 1;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

nBtn.onclick = () => {
    if (que_count < questions.length - 1) {
        que_count++;
        que_num++;
        showQues(que_count);
        qCounter(que_num);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        nBtn.style.display = "none";
    } else {
        console.log("Questions Completed.")
        clearInterval(counter);
        clearInterval(counterLine);
        showResultBox();
    }
}

rQuiz.onclick = () => {
    
    quizBox.classList.add("active"); // show the info box
    resBox.classList.remove("active"); // the info box will be removed

}
exitQuiz.onclick = () => {
    window.location.reload();
}

// getting questions and option from array
function showQues(i) {
    const qText = document.querySelector('.que_text span');
    qText.textContent = questions[i].numb + "." + questions[i].question;
    
    const optionList = document.querySelector('.option_list');
    
    let optionTag = '<div class="option">'+ questions[i].options [0] +'</div>'
                + '<div class="option">'+ questions[i].options [1] +'</div>'
                + '<div class="option">'+ questions[i].options [2] +'</div>'
                + '<div class="option">'+ questions[i].options [3] +'</div>';
    
    optionList.innerHTML = optionTag;

    const option = optionList.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
    
}


let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';

let alloptions = optionList.children.length;
function optionSelected(answer) {
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;

    if (userAns == correctAns) {
        answer.classList.add("correct");
        // console.log("Answer is Correct");
        userScore += 1;
        // console.log(userScore);
        answer.insertAdjacentHTML('beforeend', tickIcon);
    } else {
        answer.classList.add("incorrect");
        // console.log("Answer is Wrong");
        answer.insertAdjacentHTML('beforeend', crossIcon);

        //if answers is incorrect then automtically selected the correct answer
        for (let i = 0; i < alloptions; i++) {
            if(optionList.children[i].textContent == correctAns) {
                optionList.children[i].setAttribute("class", "option correct");
                optionList.children[i].insertAdjacentHTML('beforeend', tickIcon);
            }
        }
    }
    //once user selected an option, disabled all other options
    for (let i = 0; i < alloptions; i++) {
        optionList.children[i].classList.add("disabled");
    }
    nBtn.style.display = "block";
}

let counter;
let counterLine;

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer() {
        
        timeCount.textContent = time;
        time--;
        if (time < 0) {
            clearInterval(counter);
            timeCount.textContent = "00";

            for (let i = 0; i < alloptions; i++) {
                optionList.children[i].classList.add("disabled");
            }
            
            nBtn.style.display = "block";
        } 
    }
}
function startTimerLine(t){
    counterLine = setInterval(timer, 29);
    function timer() {
        // timeLine.textContent = t;
        t += 1;
        timeLine.style.width = t + "px";
        if (t > 549) {
            clearInterval(counterLine);
        }
    }
}

function showResultBox() {
    iBox.classList.remove("active"); //hide the info box
    quizBox.classList.remove("active"); //hide the quiz box
    resBox.classList.add("active"); //show the result box

    const scoreText = resBox.querySelector(".score_text span");
    if (userScore > 3) {
        scoreText.innerText = `Congrats! You got ${userScore} of ${questions.length}`;
    }
    else if (userScore > 1) {
        scoreText.innerText = `Nice! You got ${userScore} of ${questions.length}`;
    }
    else {
        scoreText.innerText = `Sorry! You got ${userScore} of ${questions.length}`;
    }

}


function qCounter() {
    const qCounter = document.querySelector('.total_que span');
    qCounter.innerText = `${que_num} of ${questions.length} Questions`;
}