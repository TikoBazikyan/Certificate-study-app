import clfExams from './exams/clf-c02/index.js';

// Each certificate's practiceExams list comes from data/exams/<cert-id>/index.js. Certificates with no practice exams show as "Coming soon".
export const CERTIFICATES = [
  {
    id: 'clf-c02',
    code: 'CLF-C02',
    name: 'Cloud Practitioner',
    level: 'Foundational',
    color: '#ff9900',
    blurb: 'Cloud concepts, security, core services, billing and support.',
    minutes: 90,
    examQuestions: 65,
    passingScore: 700,
    practiceExams: clfExams,
  },
  {
    id: 'aif-c01',
    code: 'AIF-C01',
    name: 'AI Practitioner',
    level: 'Foundational',
    color: '#9d6bff',
    blurb: 'AI/ML basics, generative AI, Amazon Bedrock and responsible AI.',
    minutes: 90,
    examQuestions: 65,
    passingScore: 700,
    practiceExams: [],
  },
  {
    id: 'saa-c03',
    code: 'SAA-C03',
    name: 'Solutions Architect',
    level: 'Associate',
    color: '#2ea0f2',
    blurb: 'Secure, resilient, high-performing and cost-optimized designs.',
    minutes: 130,
    examQuestions: 65,
    passingScore: 720,
    practiceExams: [],
  },
  {
    id: 'dva-c02',
    code: 'DVA-C02',
    name: 'Developer',
    level: 'Associate',
    color: '#1fb87a',
    blurb: 'Building, securing, deploying and debugging apps on AWS.',
    minutes: 130,
    examQuestions: 65,
    passingScore: 720,
    practiceExams: [],
  },
];

export const getCertificate = (id) => CERTIFICATES.find((c) => c.id === id);

// Time allowed for a practice exam: its own `minutes` if set, otherwise the real exam's
// pace scaled to the number of questions.
export const examMinutes = (cert, exam) =>
  exam.minutes ?? Math.max(1, Math.round((cert.minutes * exam.questions.length) / cert.examQuestions));

// Pass mark as a percentage. AWS uses scaled scoring, so this is only an approximation.
export const passPercent = (cert) => cert.passingScore / 10;
