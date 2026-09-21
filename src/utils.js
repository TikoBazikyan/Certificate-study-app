export const isCorrect = (q, picked = []) =>
  picked.length === q.answer.length && q.answer.every((i) => picked.includes(i));

export const LETTERS = 'ABCDEFGH';

// Plain text for a question, for copying out to a translator.
export function questionToText(q, { includeAnswer = false } = {}) {
  const lines = [q.question, '', ...q.options.map((o, i) => `${LETTERS[i]}. ${o}`)];
  if (includeAnswer) {
    lines.push('', `Correct answer: ${q.answer.map((i) => LETTERS[i]).join(', ')}`);
    if (q.explanation) lines.push('', `Explanation: ${q.explanation}`);
  }
  return lines.join('\n');
}

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // The clipboard API needs a secure context; fall back to a hidden textarea.
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  }
}

export function formatTime(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const mm = h ? String(m).padStart(2, '0') : m;
  return `${h ? `${h}:` : ''}${mm}:${String(s).padStart(2, '0')}`;
}
