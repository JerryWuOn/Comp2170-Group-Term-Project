const startingMinutes = 5;
let time = startingMinutes * 60;
let alertDisplayed = false;

const countdown = document.getElementById('countdown');
const messageContainer = document.getElementById('messageContainer');

const intervalId = setInterval(updateCountdown, 1000);

function updateCountdown() {
  if (time <= -1 && !alertDisplayed) {
    alertDisplayed = true;
    clearInterval(intervalId);
    alert('Time has ended. Redirecting to the main screen...');
    setTimeout(() => {
      window.location.href = 'index.html'; // Replace 'index.html' with the actual filename of your main screen
    }, 1000); // Adjust the delay (in milliseconds) before redirecting to the main screen
    return;
  }

  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  seconds = seconds < 10 ? '0' + seconds : seconds;

  countdown.innerHTML = `${minutes}:${seconds}`;
  time--;
}

function showMessage(message) {
  const messageElement = document.createElement('p');
  messageElement.textContent = message;
  messageContainer.appendChild(messageElement);
}



fetch("https://opentdb.com/api.php?amount=10&type=multiple")
.then(response => response.json())
.then(responseData => {
    const questionsContainer = document.querySelector('#questionsContainer');
    responseData.results.forEach(question => {
      const questionElement = document.createElement('div');
      questionElement.innerHTML = question.question;
      questionsContainer.appendChild(questionElement);

      const answersElement = document.createElement('ul');
      question.incorrect_answers.forEach(incorrectAnswer => {
        const incorrectAnswerElement = document.createElement('li');
        incorrectAnswerElement.innerHTML = incorrectAnswer;
        incorrectAnswerElement.classList.add('questions')
        answersElement.appendChild(incorrectAnswerElement);
        incorrectAnswerElement.addEventListener('click', () => {
          incorrectAnswerElement.classList.add('selected')
        })
      });
      
      const correctAnswerElement = document.createElement('li');
      correctAnswerElement.innerHTML = question.correct_answer;
      correctAnswerElement.classList.add('questions')
      answersElement.appendChild(correctAnswerElement);
      correctAnswerElement.addEventListener('click', () => {
        correctAnswerElement.classList.add('selected')
      })

      questionElement.appendChild(answersElement);
      questionsContainer.appendChild(questionElement);
      console.log(question)
     
    });
  })
  .catch(error => {
    console.log(error);
  });



  


