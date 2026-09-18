export const isCorrect = (q, picked = []) =>
  picked.length === q.answer.length && q.answer.every((i) => picked.includes(i));

export const LETTERS = 'ABCDEFGH';

export function formatTime(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const mm = h ? String(m).padStart(2, '0') : m;
  return `${h ? `${h}:` : ''}${mm}:${String(s).padStart(2, '0')}`;
}
