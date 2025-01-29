/* Struttura dataset
{
    argomento {
        lezione [
            { (domanda)
                immagine,
                testo,
                risposta
            }
        ]
    }
}
*/

let quiz;
let data;
let image;

let totalQuiz = 0;
let rightAnswers = 0;

function getRandomQuiz() {
    let arguments = Object.values(data);
    let argument = arguments[Math.floor(Math.random() * arguments.length)];

    let lessons = Object.values(argument);
    let lesson = lessons[Math.floor(Math.random() * lessons.length)];

    let quizzes = Object.values(lesson);
    quiz = quizzes[Math.floor(Math.random() * quizzes.length)];

    image = "img" in quiz ? "<img src='." + quiz.img + "'>" : "";
}

function checkAns(ans) {
    let trueCheck = document.querySelector("#quizList .row:nth-child(1) #answer div #trueCheck");
    let falseCheck = document.querySelector("#quizList .row:nth-child(1) #answer div #falseCheck");

    trueCheck.disabled = true;
    falseCheck.disabled = true;
    if (ans) {
        trueCheck.classList.remove("btn-outline-success");
        trueCheck.classList.add("btn-success");
    } else {
        falseCheck.classList.remove("btn-outline-danger");
        falseCheck.classList.add("btn-danger");
    }

    if (ans == quiz.a) {
        rightAnswers++;
        document.querySelector("#quizList .row:nth-child(1) #solution").innerHTML = "<b class='text-success'>Giusto!</b>";
    } else {
        let rightAns = !ans ? "Vero" : "Falso";
        console.log(rightAns);
        document.querySelector("#quizList .row:nth-child(1) #solution").innerHTML = "<b class='text-danger'>Sbagliato! La risposta giusta era <b class='text-success'>" + rightAns + "</b></b>";
    }
    
    document.getElementById("score").innerHTML = rightAnswers + "/" + totalQuiz;

    newQuestion();
}

function newQuestion() {
    getRandomQuiz();
    totalQuiz++;

    document.getElementById("quizList").innerHTML = `<div class="row">
                <div class="col-6" id="question">
                </div>
        
                <div class="col" id="image">
                </div>
        
                <div class="col" id="answer">
                    <div class="input-group justify-content-center">
                        <button class="btn btn-outline-success" type="button" onclick="checkAns(true)" id="trueCheck">Vero</button>
                        <button class="btn btn-outline-danger" type="button" onclick="checkAns(false)" id="falseCheck">Falso</button>
                    </div>
                </div>
                
                <div class="col" id="solution">
                </div>
            </div><hr>` + document.getElementById("quizList").innerHTML;

    document.querySelector("#quizList .row:nth-child(1) #question").innerHTML = quiz.q;
    document.querySelector("#quizList .row:nth-child(1) #image").innerHTML = image;
}


// fetch("./test.json")
fetch("./quizPatenteB2023.json")
.then((response) => response.json())
.then((json) => {
    data = json;
    newQuestion();
});