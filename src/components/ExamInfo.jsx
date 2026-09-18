import { examMinutes, passPercent } from '../data/certificates.js';
import { getResults } from '../progress.js';

export default function ExamInfo({ cert, exam, onBack, onStart }) {
  const minutes = examMinutes(cert, exam);
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
          <dd>{minutes} min</dd>
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
        <h3>Before you start</h3>
        <ul className="rules">
          <li>The timer starts as soon as you press Start. When time runs out, the exam is submitted automatically.</li>
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

      <button className="primary big" onClick={onStart}>
        Start exam
      </button>
    </section>
  );
}
