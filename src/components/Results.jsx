import { useState } from 'react';
import { passPercent } from '../data/certificates.js';
import { formatTime, isCorrect, LETTERS, questionToText } from '../utils.js';
import CopyButton from './CopyButton.jsx';

const FILTERS = [
  ['all', 'All'],
  ['wrong', 'Incorrect'],
  ['right', 'Correct'],
  ['skipped', 'Unanswered'],
  ['flagged', 'Flagged'],
];

// Turns bare URLs in an explanation into clickable links.
function linkify(text) {
  return text.split(/(https?:\/\/\S+)/g).map((part, i) =>
    /^https?:\/\//.test(part) ? (
      <a key={i} href={part} target="_blank" rel="noreferrer">
        {part}
      </a>
    ) : (
      part
    ),
  );
}

export default function Results({ cert, exam, result, onRetake, onBackToExams }) {
  const [filter, setFilter] = useState('all');
  const { questions } = exam;
  const { answers, flagged } = result;
  const pass = result.percent >= passPercent(cert);

  const rows = questions.map((q, i) => {
    const picked = answers[q.id] ?? [];
    const status = !picked.length ? 'skipped' : isCorrect(q, picked) ? 'right' : 'wrong';
    return { q, i, picked, status, flagged: flagged.includes(q.id) };
  });
  const count = (s) => rows.filter((r) => r.status === s).length;

  const domains = Object.values(
    rows.reduce((acc, r) => {
      if (!r.q.domain) return acc;
      const d = (acc[r.q.domain] ??= { name: r.q.domain, right: 0, total: 0 });
      d.total += 1;
      if (r.status === 'right') d.right += 1;
      return acc;
    }, {}),
  );

  const shown = rows.filter((r) =>
    filter === 'all' ? true : filter === 'flagged' ? r.flagged : r.status === filter,
  );

  return (
    <section className="narrow results">
      <div className={`score-card ${pass ? 'pass' : 'fail'}`}>
        <div className="score-ring" style={{ '--p': result.percent }}>
          <span>{result.percent}%</span>
        </div>
        <div>
          <span className="code">
            {cert.code} · {exam.title}
          </span>
          <h1>{pass ? 'Passed 🎉' : 'Not passed yet'}</h1>
          <p className="muted">
            You scored {result.score} of {result.total}. The pass mark is about {passPercent(cert)}%.
            {result.timedOut && ' Time ran out, so the exam was submitted automatically.'}
          </p>
        </div>
      </div>

      <dl className="facts">
        <div>
          <dt>Correct</dt>
          <dd className="good">{count('right')}</dd>
        </div>
        <div>
          <dt>Incorrect</dt>
          <dd className="bad">{count('wrong')}</dd>
        </div>
        <div>
          <dt>Unanswered</dt>
          <dd>{count('skipped')}</dd>
        </div>
        <div>
          <dt>Time used</dt>
          <dd>{formatTime(result.secondsUsed)}</dd>
        </div>
      </dl>

      {domains.length > 0 && (
      <div className="panel">
        <h3>Score by topic</h3>
        <ul className="domain-bars">
          {domains.map((d) => {
            const pct = Math.round((d.right / d.total) * 100);
            return (
              <li key={d.name}>
                <div className="domain-bar-label">
                  <span>{d.name}</span>
                  <span>
                    {d.right}/{d.total} · <strong>{pct}%</strong>
                  </span>
                </div>
                <div className="bar">
                  <div className={`bar-fill ${pct >= passPercent(cert) ? 'good' : 'bad'}`} style={{ width: `${pct}%` }} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      )}

      <div className="review-head">
        <h3>Review answers</h3>
        <div className="seg">
          {FILTERS.map(([key, label]) => (
            <button key={key} className={filter === key ? 'on' : ''} onClick={() => setFilter(key)}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {shown.length === 0 && <p className="muted">No questions in this view.</p>}
      <ol className="review-list">
        {shown.map(({ q, i, picked, status, flagged: isFlagged }) => (
          <li key={q.id} className={`review-item ${status}`}>
            <div className="q-meta">
              <span>
                Question {i + 1} {isFlagged && <span className="flag-mark">⚑</span>}
              </span>
              <span className="q-meta-right">
                <span className={`status ${status}`}>
                  {status === 'right' ? '✓ Correct' : status === 'wrong' ? '✗ Incorrect' : '– Unanswered'}
                </span>
                <CopyButton
                  text={questionToText(q, { includeAnswer: true })}
                  title="Copy the question, answers and explanation"
                />
              </span>
            </div>
            <p className="q-text small">{q.question}</p>
            <ul className="review-options">
              {q.options.map((opt, oi) => {
                const correct = q.answer.includes(oi);
                const chosen = picked.includes(oi);
                return (
                  <li key={oi} className={`${correct ? 'correct' : ''} ${chosen && !correct ? 'chosen-wrong' : ''}`}>
                    <span className="letter">{LETTERS[oi]}</span>
                    <span>{opt}</span>
                    <span className="tags">
                      {chosen && <em>Your answer</em>}
                      {correct && <em>Correct answer</em>}
                    </span>
                  </li>
                );
              })}
            </ul>
            {q.explanation && (
              <div className="explanation">
                <strong>Explanation</strong>
                <p>{linkify(q.explanation)}</p>
              </div>
            )}
          </li>
        ))}
      </ol>

      <div className="result-actions">
        <button className="ghost" onClick={onBackToExams}>
          ← Back to practice exams
        </button>
        <button className="primary" onClick={onRetake}>
          Retake this exam
        </button>
      </div>
    </section>
  );
}
