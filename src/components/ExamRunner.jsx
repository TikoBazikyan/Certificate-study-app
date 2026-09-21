import { useCallback, useEffect, useRef, useState } from 'react';
import { examMinutes } from '../data/certificates.js';
import { saveResult } from '../progress.js';
import { formatTime, isCorrect, LETTERS, questionToText } from '../utils.js';
import CopyButton from './CopyButton.jsx';

export default function ExamRunner({ cert, exam, minutes, onQuit, onFinish }) {
  const { questions } = exam;
  // `minutes` comes from the picker on the exam info screen; null means no time limit.
  const limit = minutes === null ? null : (minutes ?? examMinutes(cert, exam)) * 60;
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({}); // question id → picked option indexes
  const [flagged, setFlagged] = useState([]);
  const [elapsed, setElapsed] = useState(0);
  const [confirming, setConfirming] = useState(false);
  const done = useRef(false);
  const pressedAt = useRef(null);

  const left = limit === null ? null : Math.max(0, limit - elapsed);

  const q = questions[idx];
  const picked = answers[q.id] ?? [];
  const multi = q.answer.length > 1;
  const answeredCount = questions.filter((x) => answers[x.id]?.length).length;

  const finish = useCallback(
    (timedOut = false) => {
      if (done.current) return;
      done.current = true;
      const score = questions.filter((x) => isCorrect(x, answers[x.id])).length;
      const result = {
        date: Date.now(),
        score,
        total: questions.length,
        percent: Math.round((score / questions.length) * 100),
        secondsUsed: elapsed,
        timedOut,
        answers,
        flagged,
      };
      saveResult(cert.id, exam.id, { date: result.date, score, total: result.total, percent: result.percent });
      onFinish(result);
    },
    [answers, flagged, elapsed, questions, cert.id, exam.id, onFinish],
  );

  useEffect(() => {
    const t = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (limit !== null && elapsed >= limit) finish(true);
  }, [elapsed, limit, finish]);

  const choose = useCallback(
    (i) => {
      setAnswers((cur) => {
        const prev = cur[q.id] ?? [];
        let next;
        if (!multi) next = [i];
        else if (prev.includes(i)) next = prev.filter((x) => x !== i);
        else next = [...prev, i].slice(-q.answer.length); // keep only as many as the question asks for
        return { ...cur, [q.id]: next };
      });
    },
    [q, multi],
  );

  const toggleFlag = useCallback(
    () => setFlagged((f) => (f.includes(q.id) ? f.filter((x) => x !== q.id) : [...f, q.id])),
    [q.id],
  );

  const go = useCallback((n) => setIdx(Math.min(questions.length - 1, Math.max(0, n))), [questions.length]);

  // Option text is selectable, so a click that was really a drag to select text
  // (or that left a selection behind) must not change the answer.
  const startPress = (e) => {
    pressedAt.current = { x: e.clientX, y: e.clientY };
  };
  const wasTextSelection = (e) => {
    const from = pressedAt.current;
    pressedAt.current = null;
    if (from && Math.hypot(e.clientX - from.x, e.clientY - from.y) > 6) return true;
    const sel = window.getSelection?.();
    return !!sel && !sel.isCollapsed && sel.toString().trim().length > 0;
  };

  useEffect(() => {
    const onKey = (e) => {
      if (confirming || e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.toUpperCase();
      const opt = LETTERS.indexOf(k);
      if (opt >= 0 && opt < q.options.length) choose(opt);
      else if (e.key === 'ArrowRight') go(idx + 1);
      else if (e.key === 'ArrowLeft') go(idx - 1);
      else if (k === 'F') toggleFlag();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [q, idx, choose, go, toggleFlag, confirming]);

  const lowTime = left !== null && left <= 300;

  return (
    <section className="runner">
      <div className="runner-bar">
        <div>
          <strong>{exam.title}</strong>
          <span className="muted"> · {cert.code}</span>
        </div>
        <div className={`timer ${lowTime ? 'low' : ''}`} aria-live="polite">
          ⏱ {formatTime(limit === null ? elapsed : left)}
          {limit === null && <span className="muted"> · no limit</span>}
        </div>
        <div className="muted">
          {answeredCount}/{questions.length} answered
        </div>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${((idx + 1) / questions.length) * 100}%` }} />
      </div>

      <div className="runner-body">
        <article className="question-card">
          <div className="q-meta">
            <span>
              Question {idx + 1} of {questions.length}
            </span>
            <span className="q-meta-right">
              {q.domain && <span className="pill">{q.domain}</span>}
              <CopyButton text={questionToText(q)} />
            </span>
          </div>
          <h2 className="q-text">{q.question}</h2>
          {multi && <p className="hint">Select {q.answer.length} answers.</p>}

          <div className="options" role={multi ? 'group' : 'radiogroup'}>
            {q.options.map((opt, i) => {
              const on = picked.includes(i);
              return (
                <div
                  key={i}
                  role={multi ? 'checkbox' : 'radio'}
                  aria-checked={on}
                  tabIndex={0}
                  className={`option ${on ? 'on' : ''} ${multi ? 'multi' : ''}`}
                  onMouseDown={startPress}
                  onClick={(e) => !wasTextSelection(e) && choose(i)}
                  onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                      e.preventDefault();
                      choose(i);
                    }
                  }}
                >
                  <span className="letter">{LETTERS[i]}</span>
                  <span className="opt-text">{opt}</span>
                </div>
              );
            })}
          </div>

          <div className="q-actions">
            <button className="ghost" onClick={() => go(idx - 1)} disabled={idx === 0}>
              ← Previous
            </button>
            <button className={`ghost flag ${flagged.includes(q.id) ? 'on' : ''}`} onClick={toggleFlag}>
              ⚑ {flagged.includes(q.id) ? 'Flagged' : 'Flag for review'}
            </button>
            {idx < questions.length - 1 ? (
              <button className="primary" onClick={() => go(idx + 1)}>
                Next →
              </button>
            ) : (
              <button className="primary" onClick={() => setConfirming(true)}>
                Finish exam
              </button>
            )}
          </div>
        </article>

        <aside className="navigator">
          <h4>Questions</h4>
          <div className="nav-grid">
            {questions.map((x, i) => (
              <button
                key={x.id}
                className={[
                  'nav-cell',
                  i === idx && 'current',
                  answers[x.id]?.length && 'answered',
                  flagged.includes(x.id) && 'flagged',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => go(i)}
                aria-label={`Question ${i + 1}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <div className="legend">
            <span><i className="sw answered" /> Answered</span>
            <span><i className="sw flagged" /> Flagged</span>
          </div>
          <button className="primary full" onClick={() => setConfirming(true)}>
            Submit exam
          </button>
          <button className="link danger" onClick={() => window.confirm('Quit this exam? Your answers will be lost.') && onQuit()}>
            Quit without saving
          </button>
        </aside>
      </div>

      {confirming && (
        <div className="overlay" role="dialog" aria-modal="true">
          <div className="dialog">
            <h3>Submit your exam?</h3>
            <p>
              You've answered <strong>{answeredCount}</strong> of {questions.length} questions.
              {answeredCount < questions.length && ` ${questions.length - answeredCount} unanswered will count as wrong.`}
              {flagged.length > 0 && ` ${flagged.length} flagged for review.`}
            </p>
            <div className="dialog-actions">
              <button className="ghost" onClick={() => setConfirming(false)}>
                Keep working
              </button>
              <button className="primary" onClick={() => finish(false)}>
                Submit and see results
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
