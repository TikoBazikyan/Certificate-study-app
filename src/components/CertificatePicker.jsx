import { CERTIFICATES } from '../data/certificates.js';

export default function CertificatePicker({ onPick }) {
  return (
    <section>
      <div className="hero">
        <h1>Choose your certificate</h1>
        <p className="muted">Pick the AWS certification you're preparing for to see its practice exams.</p>
      </div>

      <div className="card-grid">
        {CERTIFICATES.map((cert) => {
          const count = cert.practiceExams.length;
          return (
            <button
              key={cert.id}
              className="cert-card"
              style={{ '--accent': cert.color }}
              disabled={!count}
              onClick={() => onPick(cert.id)}
            >
              <div className="cert-card-top">
                <span className="pill">{cert.level}</span>
                <span className="code">{cert.code}</span>
              </div>
              <h2>{cert.name}</h2>
              <p className="muted">{cert.blurb}</p>
              <span className="cta">
                {count ? `${count} practice exam${count > 1 ? 's' : ''} →` : 'Coming soon'}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
