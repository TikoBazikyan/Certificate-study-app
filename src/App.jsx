import { useState } from 'react';
import { getCertificate } from './data/certificates.js';
import CertificatePicker from './components/CertificatePicker.jsx';
import PracticeExamList from './components/PracticeExamList.jsx';
import ExamInfo from './components/ExamInfo.jsx';
import ExamRunner from './components/ExamRunner.jsx';
import Results from './components/Results.jsx';

export default function App() {
  // step: 'certificates' → 'exams' → 'info' → 'running' → 'results'
  const [view, setView] = useState({ step: 'certificates' });
  const cert = view.certId ? getCertificate(view.certId) : null;
  const exam = cert && view.examId ? cert.practiceExams.find((e) => e.id === view.examId) : null;

  const toCertificates = () => setView({ step: 'certificates' });
  const toExams = () => setView({ step: 'exams', certId: cert.id });
  const toInfo = () => setView({ step: 'info', certId: cert.id, examId: exam.id });

  return (
    <div className="app">
      <header className="topbar">
        <button className="brand" onClick={toCertificates} disabled={view.step === 'running'}>
          <span className="brand-mark">☁</span> AWS Cert Practice
        </button>
        {cert && view.step !== 'running' && (
          <nav className="crumbs">
            <button onClick={toExams}>{cert.name}</button>
            {exam && (
              <>
                <span>/</span>
                <button onClick={toInfo}>{exam.title}</button>
              </>
            )}
          </nav>
        )}
      </header>

      <main className="content" style={cert ? { '--accent': cert.color } : undefined}>
        {view.step === 'certificates' && (
          <CertificatePicker onPick={(certId) => setView({ step: 'exams', certId })} />
        )}
        {view.step === 'exams' && (
          <PracticeExamList
            cert={cert}
            onBack={toCertificates}
            onPick={(examId) => setView({ step: 'info', certId: cert.id, examId })}
          />
        )}
        {view.step === 'info' && (
          <ExamInfo
            cert={cert}
            exam={exam}
            onBack={toExams}
            onStart={(minutes) => setView({ ...view, step: 'running', minutes, startedAt: Date.now() })}
          />
        )}
        {view.step === 'running' && (
          <ExamRunner
            key={view.startedAt}
            cert={cert}
            exam={exam}
            minutes={view.minutes}
            onQuit={toInfo}
            onFinish={(result) => setView({ ...view, step: 'results', result })}
          />
        )}
        {view.step === 'results' && (
          <Results
            cert={cert}
            exam={exam}
            result={view.result}
            onRetake={() => setView({ ...view, step: 'running', startedAt: Date.now() })}
            onBackToExams={toExams}
          />
        )}
      </main>
    </div>
  );
}
