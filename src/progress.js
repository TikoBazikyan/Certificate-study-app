// Past results per practice exam, stored in the browser's localStorage.
const KEY = 'aws-cert-results-v1';

function readAll() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? {};
  } catch {
    return {};
  }
}

export function getResults(certId, examId) {
  return readAll()[`${certId}/${examId}`] ?? [];
}

export function saveResult(certId, examId, result) {
  const all = readAll();
  const key = `${certId}/${examId}`;
  all[key] = [result, ...(all[key] ?? [])].slice(0, 10);
  try {
    localStorage.setItem(KEY, JSON.stringify(all));
  } catch {
    // Storage unavailable; results just won't be remembered.
  }
}
