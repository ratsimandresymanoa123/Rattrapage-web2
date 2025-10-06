const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
1
const app = express();
app.use(cors());
app.use(bodyParser.json());
const questions = [
  {
    id: 1,
    question: "Combien font 2 + 2 ?",
    options: ["3", "4", "5"],
    correctAnswer: "4"
  },
  {
    id: 2,
    question: "Quelle est la capitale de la France ?",
    options: ["Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris"
  },
  {
    id: 3,
    question: "Quelle couleur obtient-on en mélangeant le bleu et le jaune ?",
    options: ["Vert", "Violet", "Orange"],
    correctAnswer: "Vert"
  }
];
app.get('/questions', (req, res) => {
  res.json(questions);
});
app.post('/answer', (req, res) => {
  const body = req.body;
  const checkOne = (item) => {
    const q = questions.find(q => q.id === Number(item.id));
    if (!q) return {
      id: item.id, correct: false, error: 'Question not found' };
return {
        id: q.id, correct: String(item.answer) ===
          String(q.correctAnswer)
      };
    };
    if (Array.isArray(body)) {
      const results = body.map(checkOne);
      return res.json({ results });
    }
    2

    const result = checkOne(body);
    res.json(result);
  });
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on http://localhost:$
{PORT}`));