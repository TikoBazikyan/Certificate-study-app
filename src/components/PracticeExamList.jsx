import { examMinutes, passPercent } from '../data/certificates.js';
import { getResults } from '../progress.js';

export default function PracticeExamList({ cert, onBack, onPick }) {
  return (
    <section>
      <button className="link" onClick={onBack}>
        ← All certificates
      </button>
      <div className="page-head">
        <span className="code">{cert.code}</span>
        <h1>{cert.name} practice exams</h1>
        <p className="muted">Choose a practice exam. You'll see its details before it starts.</p>
      </div>

      <ul className="exam-list">
        {cert.practiceExams.map((exam, i) => {
          const results = getResults(cert.id, exam.id);
          const best = results.length ? Math.max(...results.map((r) => r.percent)) : null;
          return (
            <li key={exam.id}>
              <button className="exam-row" onClick={() => onPick(exam.id)}>
                <span className="exam-num">{i + 1}</span>
                <span className="exam-row-main">
                  <strong>{exam.title}</strong>
                  <span className="muted">
                    {exam.questions.length} questions · {examMinutes(cert, exam)} min
                  </span>
                </span>
                <span className="exam-row-score">
                  {best === null ? (
                    <span className="muted">Not taken</span>
                  ) : (
                    <>
                      <span className="muted">Best</span>
                      <strong className={best >= passPercent(cert) ? 'good' : 'bad'}>{best}%</strong>
                    </>
                  )}
                </span>
                <span className="chev">›</span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
