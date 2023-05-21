const startingMinutes = 5;
let time = startingMinutes * 60;
let alertDisplayed = false;
let quizData;
const numOfQuestions = 10;

const countdown = document.getElementById("countdown");
const messageContainer = document.getElementById("messageContainer");
const finishButton = document.querySelector(".next-button");
// add a click handler to finishButton, that uses finishQuiz
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
      // if a query selector looking for a class of .selected comes back as null
      if(question.querySelector('.selected') === null) {
        // userMissedQuestion = true;
      }
      // that means the user did not select an answer
      // we want to trigger our alert, and do an early return
  }) 
  if(userMissedQuestion) {
    alert('You missed a question!')
    return;
  }

  // if the function is still running from here, then the user did answer every question, so we can mark them
  // we want to scroll the user to the top of the page
  // we need to start marking the quiz, so we grab all the .question divs
  // we want to see if the answer containing a 'selected' class, has a matching inner text to the correct answer
  for (let index = 0; index < numOfQuestions; index++) {
      console.log(index)    
      debugger;
      const correctAnswerText = quizData[index].correct_answer
      const correctAnswerElem = findElementByInnerText(questions[index], correctAnswerText)
      const selectedAnswerElm = questions[index].querySelector('.selected')

      if(correctAnswerElem.innerHTML === selectedAnswerElm.innerHTML) {
          rightanswers++;
      } else {
          
      }

  }

};

function findElementByInnerText(parentElement, searchText) {
  const elements = parentElement.getElementsByTagName('*');

  for (let i = 0; i < elements.length; i++) {
    if (elements[i].innerText === searchText) {
      return elements[i];
    }
  }

  return null; // Element not found
}

function updateCountdown() {
  if (time <= -1 && !alertDisplayed) {
    alertDisplayed = true;
    clearInterval(intervalId);
    alert("Time has ended. Redirecting to the main screen...");
    setTimeout(() => {
      window.location.href = "index.html"; // Replace 'index.html' with the actual filename of your main screen
    }, 1000); // Adjust the delay (in milliseconds) before redirecting to the main screen
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

  // Loop through each child element of the parent element
  for (const childElement of parentElement.children) {
    childElement.classList.remove("selected");
  }

  // we have to add selected class to the event.target
  targetElement.classList.add("selected");
}

// write our code here to extract the category id

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

      // set up an array to temporarily hold all the the answer elements we build
      const answersElements = [];

      question.incorrect_answers.forEach((incorrectAnswer) => {
        const incorrectAnswerElement = document.createElement("li");
        incorrectAnswerElement.innerHTML = incorrectAnswer;
        incorrectAnswerElement.classList.add("questions");
        // current approach: we are immediately appending the element after we build it
        // alternative approach: we can add them to an array, then
        // answersElement.appendChild(incorrectAnswerElement);
        incorrectAnswerElement.addEventListener("click", selectedAnswer);
        answersElements.push(incorrectAnswerElement);
      });

      const correctAnswerElement = document.createElement("li");
      correctAnswerElement.innerHTML = question.correct_answer;
      correctAnswerElement.classList.add("questions");
      // current approach: we are immediately appending the element after we build it
      // answersElement.appendChild(correctAnswerElement);
      correctAnswerElement.addEventListener("click", selectedAnswer);

      answersElements.push(correctAnswerElement);
      // add the correct answer element, to our answersElements array

      // once all the answers have been generated, we can shuffle the array
      const shuffledArray = shuffleArray(answersElements);
      console.log(shuffledArray);

      // then loop over it, and append each question to the questionsContainer
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
