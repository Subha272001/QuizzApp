const serverIp = "http://localhost:8080";

window.onload = () => {
  const questions = JSON.parse(sessionStorage.getItem('questions'));
  let currentQuestionIndex = 0;
  let answers = []; // Array to store selected answers

  const questionText = document.getElementById('questionText');
  const labels = [document.getElementById('label1'), document.getElementById('label2'), document.getElementById('label3'), document.getElementById('label4')];
  const prevButton = document.getElementById('prevButton');
  const nextButton = document.getElementById('nextButton');
  const submitButton = document.getElementById('submitButton');

  function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = `Q${currentQuestion.id}: ${currentQuestion.question}`;
    currentQuestion.options.forEach((option, index) => {
      labels[index].textContent = option;
    });

    // Clear previous selection
    const radioButtons = document.querySelectorAll('input[name="answer"]');
    radioButtons.forEach(radioButton => {
      radioButton.checked = false;
    });

    // Check if answer is already selected for the current question
    const selectedAnswer = answers.find(answer => answer.id === currentQuestion.id);
    if (selectedAnswer) {
      const radioButton = document.querySelector(`input[value="${selectedAnswer.selectedOption}"]`);
      if (radioButton) {
        radioButton.checked = true;
      }
    }

    // Hide or show buttons based on current question index
    prevButton.style.display = currentQuestionIndex === 0 ? 'none' : 'inline-block';
    nextButton.style.display = currentQuestionIndex === questions.length - 1 ? 'none' : 'inline-block';
    submitButton.style.display = currentQuestionIndex === questions.length - 1 ? 'inline-block' : 'none';
  }

  loadQuestion();

  prevButton.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      loadQuestion();
    }
  });


nextButton.addEventListener('click', () => {
  // Add selected answer to answers array
  const radioButtons = document.querySelectorAll('input[name="answer"]');
  radioButtons.forEach(radioButton => {
    if (radioButton.checked) {
      const labelForOptionId = radioButton.getAttribute('id');
      const labelForOption = document.querySelector(`label[for="${labelForOptionId}"]`);
  
      
      if (labelForOption) { 
        const selectedAnswer = labelForOption.textContent.trim(); 
       
        answers.push({
          id: questions[currentQuestionIndex].id,
          selectedAnswer
        });
      }
    }
  });
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
  }
});



  submitButton.addEventListener('click', () => {
    // Make API call to submit answers
    fetch(serverIp + '/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ answers })
    })
    .then(response => response.json())
    .then(data => {
      // Redirect to answer.html with the response data
      sessionStorage.setItem('results', JSON.stringify(data.results));
      window.location.href = '/answer';
    })
    .catch(error => console.error('Error submitting answers:', error));
  });
};
