const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const DIRNAME = (() => {
    const strings = __dirname.split('\\');
    return strings.slice(0, strings.length - 1).join('\\')
})();

app.use(express.static(DIRNAME + '/public'));

app.get("/", (req, res) => {
    const path = DIRNAME + '/public/pages/index.html';
    res.sendFile(path);
});

app.get("/new-quiz", (req, res) => {
    const path = DIRNAME + '/public/pages/quiz.html';
    res.sendFile(path);
});

app.get("/answer", (req, res) => {
  const path = DIRNAME + '/public/pages/answer.html';
  res.sendFile(path);
});

app.get('/questions', (req, res) => {
    fs.readFile(path.join(__dirname, 'questions.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading questions file:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        const questions = JSON.parse(data);
        res.json(questions);
    });
});

app.post('/submit', (req, res) => {
  const submittedAnswers = req.body.answers;

  fs.readFile(path.join(__dirname, 'questions.json'), 'utf8', (err, data) => {
      if (err) {
          console.error('Error reading questions file:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
      }
      
      const questions = JSON.parse(data);
      const results = [];

      questions.forEach(question => {
          const submittedAnswer = submittedAnswers.find(sa => sa.id === question.id);
          const isCorrect = submittedAnswer ? question.answer === submittedAnswer.selectedAnswer : '';
          results.push({
              id: question.id,
              question: question.question,
              selectedAnswer: submittedAnswer ? submittedAnswer.selectedAnswer : '',
              correctOption: question.answer,
              isCorrect
          });
      });

      res.json({ results });
  });
});

module.exports = { app };
