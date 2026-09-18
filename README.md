# AWS Cert Practice

Practice exams for AWS certifications.

Flow: **choose a certificate → choose a practice exam → read the exam info → take the timed exam → see detailed results**.

## Run it

```bash
npm install     # first time only
npm run dev     # then open the URL it prints (usually http://localhost:5173)
```

## Cloud Practitioner exams

The 23 Cloud Practitioner practice exams come from
[kananinirav/AWS-Certified-Cloud-Practitioner-Notes](https://github.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes)
(MIT licensed). To pull in updates from that repo:

```bash
git clone --depth 1 https://github.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes.git /tmp/ccp
node scripts/import-ccp-exams.mjs /tmp/ccp
```

This regenerates `src/data/exams/clf-c02/`. Don't edit those files by hand.

## Adding a practice exam by hand

1. Create a file in `src/data/exams/<certificate-id>/`, for example `src/data/exams/clf-c02/practice-exam-2.js`:

```js
const questions = [
  {
    id: 'pe2-01',                       // unique within the exam
    domain: 'Cloud Concepts',           // topic, used for the score-by-topic breakdown
    question: 'Which AWS service ...?',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    answer: [1],                        // zero-based: 0 = A, 1 = B, 2 = C ...
    explanation: 'Why B is correct ...',
  },
  {
    id: 'pe2-02',
    domain: 'Security and Compliance',
    question: 'Which TWO ...? (Choose TWO.)',
    options: ['A', 'B', 'C', 'D', 'E'],
    answer: [0, 3],                     // more than one index = checkbox question
    explanation: '...',
  },
];
export default questions;
```

2. Add it to that folder's `index.js` (or, for a new certificate, import that folder's `index.js` in `src/data/certificates.js` as its `practiceExams`):

```js
import pe2 from './practice-exam-2.js';
export default [
  { id: 'practice-exam-2', title: 'Practice Exam 2', questions: pe2 },
];
```

`domain` and `explanation` are optional.

The time limit scales with the number of questions (90 min for 65 on Cloud Practitioner). To override it,
add `minutes: 60` to the entry. A certificate with no practice exams shows as "Coming soon".

Past scores are saved in the browser (localStorage).

`src/data/unused-samples/` holds sample question banks for AI Practitioner, Solutions Architect and Developer.
They aren't used yet.
