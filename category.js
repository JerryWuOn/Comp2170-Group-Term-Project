fetch("https://opentdb.com/api_category.php")
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.log(error))

fetch("https://opentdb.com/api.php?amount=10&category=9")
.then(response => response.json())
.then(questions => {
    const questionsContainer = document.querySelector('#general_knowledge .questions');
    questions.forEach(question => {
      const questionElement = document.createElement('div');
      questionElement.textContent = question.text;
      questionsContainer.appendChild(questionElement);
    });
  });

