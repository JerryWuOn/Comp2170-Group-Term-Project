const startingMinutes = 5;
let time = startingMinutes * 60;
let alertDisplayed = false;
let quizData;
const numOfQuestions = 10;


const countdown = document.getElementById("countdown");
const messageContainer = document.getElementById("messageContainer");
const finishButton = document.querySelector(".next-button");
finishButton.onclick = finishQuiz;

const intervalId = setInterval(updateCountdown, 1000);

function finishQuiz () {
  let rightanswers = 0; 
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  const questions = document.querySelectorAll('.question ul')
  let userMissedQuestion = false;
  questions.forEach((question) => {
     
      if(question.querySelector('.selected') === null) {
       userMissedQuestion = true;
      }
    
  }) 
  if(userMissedQuestion) {
    alert('You missed a question!')
    return;
  }

 
  for (let index = 0; index < numOfQuestions; index++) {
    console.log(index);    
    const correctAnswerText = quizData[index].correct_answer;
    const answerOptions = questions[index].querySelectorAll('li');
    const selectedAnswerElm = questions[index].querySelector('.selected');

    answerOptions.forEach((option) => {
      if (option.innerHTML === correctAnswerText) {
        highlightedAnswer(option, '#06D6A0'); 
      } else if (option === selectedAnswerElm) {
        highlightedAnswer(option, '#EF476F'); 
      } else {
        highlightedAnswer(option, '#EF476F'); 
      }
    });

   

  

    if (correctAnswerText === selectedAnswerElm.innerHTML) {
      rightanswers++;
      console.log('Question ' + (index + 1) + ': Correct');
    } else {
      console.log('Question ' + (index + 1) + ': Incorrect');
    }
  }

  function highlightedAnswer(element, color) {
    element.style.backgroundColor = color
  }

  const score = (rightanswers / numOfQuestions) * 100; 
  if(score < 50) {
    alert('Final Score: ' + score + '%.' + ' Good Thing this is not for marks!!')
  } else if(score >= 80) {
    alert('Final Score: ' + score + '%' + 'YAY Good Job!!' )
  }
  else {
    alert('Final Score: ' + score + '%')
  }
};



function findElementByInnerText(parentElement, searchText) {
  const elements = parentElement.getElementsByTagName('*');

  for (let i = 0; i < elements.length; i++) {
    if (elements[i].innerText === searchText) {
      return elements[i];
    }
  }

  return null; 
}

function updateCountdown() {
  if (time <= -1 && !alertDisplayed) {
    alertDisplayed = true;
    clearInterval(intervalId);
    alert("Time has ended. Redirecting to the main screen...");
    setTimeout(() => {
      window.location.href = "category.html"; 
    }, 1000); 
    return;
  }

  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  seconds = seconds < 10 ? "0" + seconds : seconds;

  countdown.innerHTML = `${minutes}:${seconds}`;
  time--;
}

function showMessage(message) {
  const messageElement = document.createElement("p");
  messageElement.textContent = message;
  messageContainer.appendChild(messageElement);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function selectedAnswer(event) {
  const parentElement = event.target.parentElement;
  const targetElement = event.target;

 
  for (const childElement of parentElement.children) {
    childElement.classList.remove("selected");
  }

  
  targetElement.classList.add("selected");
}



const urlParams = new URLSearchParams(window.location.search);
const categoryID = urlParams.get("category");

fetch(
  `https://opentdb.com/api.php?amount=${numOfQuestions}&type=multiple&category=${categoryID}`
)
  .then((response) => response.json())
  .then((responseData) => {
    quizData = responseData.results;
    const questionsContainer = document.querySelector("#questionsContainer");
    responseData.results.forEach((question) => {
      const questionElement = document.createElement("div");
      questionElement.classList.add("question");
      questionElement.innerHTML = question.question;
      questionsContainer.appendChild(questionElement);

      const answersElement = document.createElement("ul");

      
      const answersElements = [];

      question.incorrect_answers.forEach((incorrectAnswer) => {
        const incorrectAnswerElement = document.createElement("li");
        incorrectAnswerElement.innerHTML = incorrectAnswer;
        incorrectAnswerElement.classList.add("questions");
        incorrectAnswerElement.addEventListener("click", selectedAnswer);
        answersElements.push(incorrectAnswerElement);
      });

      const correctAnswerElement = document.createElement("li");
      correctAnswerElement.innerHTML = question.correct_answer;
      correctAnswerElement.classList.add("questions");
      correctAnswerElement.addEventListener("click", selectedAnswer);

      answersElements.push(correctAnswerElement);
    
      const shuffledArray = shuffleArray(answersElements);
      console.log(shuffledArray);

    
      shuffledArray.forEach((answer) => {
        answersElement.appendChild(answer);
      });

      questionsContainer.appendChild(questionElement);
      questionElement.appendChild(answersElement);
      console.log(question);
    });
  })
  .catch((error) => {
    console.log(error);
  });
