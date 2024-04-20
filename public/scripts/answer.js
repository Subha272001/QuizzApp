window.onload = () => {
  const results = JSON.parse(sessionStorage.getItem('results'));
  
  
  // Check if results exist
  if (results && results.length > 0) {
    // Display the results
    const answersContainer = document.getElementById('answersContainer');
    results.forEach(result => {
      
      const questionDiv = document.createElement('div');
      questionDiv.innerHTML = `
        <p>Question ${result.id} :  ${result.question}</p>
        <p>Chosen Answer : ${result.selectedAnswer} </p>
        <p>Correct answer: ${result.correctOption}</p>
        <p>${result.isCorrect === '' ?'Not Answered' : result.isCorrect ? 'Correct' : 'Incorrect'}</p>
      `;
      answersContainer.appendChild(questionDiv);
    });
  } else {
    // Display message if no results found
    const noResultsMessage = document.createElement('p');
    noResultsMessage.textContent = 'No results found.';
    answersContainer.appendChild(noResultsMessage);
  }
};