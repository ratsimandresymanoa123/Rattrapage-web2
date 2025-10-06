import React, { useEffect, useState } from 'react'
import Question from './components/Question'
export default function App() {
  const [questions, setQuestions] = useState([])
  3
  const [answers, setAnswers] = useState({})
  const [results, setResults] = useState(null)
  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then(r => r.json())
      .then(setQuestions)
      .catch(err => console.error(err))
  }, [])
  const setAnswer = (id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    // construire payload: tableau d'objets { id, answer }
    const payload = questions.map(q => ({
      id: q.id, answer: answers[q.id] ??
        null
    }))
    const res = await fetch('http://localhost:4000/answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const data = await res.json()
    // data.results => [{id, correct}]
    if (data.results) {
      const map = {};
      let score = 0;
      data.results.forEach(r => {
        map[r.id] = r.correct; if (r.correct)
          score++
      })
      setResults({ perQuestion: map, score, total: questions.length })
    } else if (data.id) {
      setResults({
        perQuestion: { [data.id]: data.correct }, score:
          data.correct ? 1 : 0, total: 1
      })
    }
  }
  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>Quiz</h1>
      <form onSubmit={handleSubmit}>
        {questions.map(q => (
          <Question key={q.id} q={q} value={answers[q.id] ?? ''}
            onChange={setAnswer} />
        ))}
        4
        <div style={{ marginTop: 16 }}>
          <button type="submit">Valider les réponses</button>
        </div>
      </form>
      {results && (
        <div style={{ marginTop: 20 }}>
          <h2>Résultats</h2>
          <p>Note: {results.score} / {results.total}</p>
          <ul>
            {questions.map(q => (
              <li key={q.id}>{q.question} — {(results.perQuestion[q.id] ?
                'Correct' : 'Incorrect')}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
