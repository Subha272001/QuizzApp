
const serverIp = "http://localhost:8080";

window.onload = () => {

  const startQuizButton = document.getElementById("start-quiz");
  
  startQuizButton.onclick = () => {
    fetch(serverIp + '/questions') // Make API call to fetch questions
      .then(response => response.json())
      .then(data => {
        sessionStorage.setItem('questions', JSON.stringify(data)); // Store questions in sessionStorage
        window.location.href = "/new-quiz"; // Redirect to quiz.html
      })
      .catch(error => console.error('Error fetching questions:', error));
  }
}