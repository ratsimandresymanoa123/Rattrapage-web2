import React from 'react'
export default function Question({ q, value, onChange }) {
    return (
        <div style={{
            marginBottom: 12, padding: 8, border: '1px solid #ddd',
            borderRadius: 6
        }}>
            <p><strong>{q.id}. {q.question}</strong></p>
            <div>
                {q.options.map(opt => (
                    <label key={opt} style={{ display: 'block', marginBottom: 6 }}>
                        <input
                            type="radio"
                            name={`q-${q.id}`}
                            value={opt}
                            checked={value === opt}
                            onChange={() => onChange(q.id, opt)}
                        /> {opt}
                    </label>
                ))}
            </div>
        </div>
    )
}

