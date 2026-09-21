import { useState } from 'react';
import { examMinutes, passPercent } from '../data/certificates.js';
import { getResults } from '../progress.js';

const MAX_MINUTES = 600;

export default function ExamInfo({ cert, exam, onBack, onStart }) {
  const defaultMinutes = examMinutes(cert, exam);
  const [noLimit, setNoLimit] = useState(false);
  const [minutesText, setMinutesText] = useState(String(defaultMinutes));
  const typed = Number(minutesText);
  const validTime = /^\d+$/.test(minutesText.trim()) && typed >= 1 && typed <= MAX_MINUTES;
  const minutes = noLimit ? null : typed;
  const presets = [...new Set([defaultMinutes, 30, 45, 60, 90, 120])].sort((a, b) => a - b);

  const domains = Object.entries(
    exam.questions.reduce((acc, q) => (q.domain ? { ...acc, [q.domain]: (acc[q.domain] ?? 0) + 1 } : acc), {}),
  );
  const multi = exam.questions.filter((q) => q.answer.length > 1).length;
  const past = getResults(cert.id, exam.id);

  return (
    <section className="narrow">
      <button className="link" onClick={onBack}>
        ← {cert.name} practice exams
      </button>
      <div className="page-head">
        <span className="code">
          {cert.code} · {cert.name}
        </span>
        <h1>{exam.title}</h1>
      </div>

      <dl className="facts">
        <div>
          <dt>Questions</dt>
          <dd>{exam.questions.length}</dd>
        </div>
        <div>
          <dt>Time limit</dt>
          <dd>{noLimit ? 'None' : validTime ? `${typed} min` : '—'}</dd>
        </div>
        <div>
          <dt>Pass mark</dt>
          <dd>{passPercent(cert)}%</dd>
        </div>
        <div>
          <dt>Attempts</dt>
          <dd>{past.length}</dd>
        </div>
      </dl>

      {domains.length > 0 && (
      <div className="panel">
        <h3>Topics covered</h3>
        <ul className="domain-list">
          {domains.map(([d, n]) => (
            <li key={d}>
              <span>{d}</span>
              <span className="muted">{n} questions</span>
            </li>
          ))}
        </ul>
      </div>
      )}

      <div className="panel">
        <h3>Choose your time</h3>
        <p className="muted note">
          {defaultMinutes} min matches the real exam's pace. Give yourself more if you want to read slowly or
          translate as you go.
        </p>
        <div className="seg time-seg">
          {presets.map((m) => (
            <button
              key={m}
              className={!noLimit && typed === m ? 'on' : ''}
              onClick={() => {
                setNoLimit(false);
                setMinutesText(String(m));
              }}
            >
              {m} min{m === defaultMinutes ? ' · default' : ''}
            </button>
          ))}
          <button className={noLimit ? 'on' : ''} onClick={() => setNoLimit(true)}>
            No limit
          </button>
        </div>
        <label className="custom-time">
          <span>Or set your own</span>
          <input
            type="number"
            min="1"
            max={MAX_MINUTES}
            value={minutesText}
            disabled={noLimit}
            onChange={(e) => setMinutesText(e.target.value)}
          />
          <span>minutes</span>
        </label>
        {!noLimit && !validTime && (
          <p className="bad note">Enter a number of minutes between 1 and {MAX_MINUTES}.</p>
        )}
      </div>

      <div className="panel">
        <h3>Before you start</h3>
        <ul className="rules">
          <li>
            {noLimit
              ? 'With no time limit the clock counts up, and nothing is submitted until you press Submit.'
              : 'The timer starts as soon as you press Start. When time runs out, the exam is submitted automatically.'}
          </li>
          <li>You can select any question or answer with the mouse and copy it, or use the Copy button to take the whole question at once.</li>
          <li>
            Most questions have one correct answer.
            {multi > 0 && ` ${multi} ask you to choose more than one; these use checkboxes.`}
          </li>
          <li>You can move between questions and flag any you want to come back to before you submit.</li>
          <li>Unanswered questions count as wrong, so answer every question.</li>
          <li>
            You need about {passPercent(cert)}% to pass. The real exam reports a scaled score out of 1000, with
            {` ${cert.passingScore}`} needed to pass.
          </li>
          <li>Keyboard: A–E choose an answer, ← → move between questions, F flags a question.</li>
        </ul>
      </div>

      <button className="primary big" onClick={() => onStart(minutes)} disabled={!noLimit && !validTime}>
        Start exam{noLimit ? ' · no time limit' : validTime ? ` · ${typed} min` : ''}
      </button>
    </section>
  );
}
