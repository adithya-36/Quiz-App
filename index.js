const questions = [{
  question:"What is the largest planet in our solar system?",
  answers: [
    {text: "Venus", correct: false},
    {text:"Saturn",correct:false},
    {text:"Earth",correct:false},
    {text:"Jupiter",correct:true}
  ]
},
{
  question:"In which year did World War II end?",
  answers: [
    {text: "1945", correct: true},
    {text:"1946",correct:false},
    {text:"1947",correct:false},
    {text:"none of the above",correct:false}
  ]
},
{
  question:"What is the largest mammal in the world?",
  answers: [
    {text: "Elephant", correct: false},
    {text:"Blue Whale",correct:true},
    {text:"all of the above",correct:false},
    {text:"none of the above",correct:false}
  ]
},
{
  question:"Which gas makes up the majority of Earth's atmosphere?",
  answers: [
    {text: "Nitrogen", correct:true},
    {text:"Oxygen",correct:false},
    {text:"CO2",correct:false},
    {text:"Helium",correct:false}
  ]
}
]
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
let currentQuestionIndex = 0;
let score = 0;
function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}
function showQuestion(){
  resetState();
   let currentQuestion = questions[currentQuestionIndex];
   let questionNo = currentQuestionIndex + 1;
   questionElement.innerHTML = questionNo + ". "+currentQuestion.question;
   //display ans
   currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click",selectAnswer);
   })
}
function resetState(){
  nextButton.style.display = "none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}
function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
  }
  else{
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display= "block";
}
function showScore(){
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}
function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }
  else{
    showScore();
  }
}
nextButton.addEventListener("click",()=>{
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  }
  else{
    startQuiz();
  }
});
startQuiz();
