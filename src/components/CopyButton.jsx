import { useEffect, useState } from 'react';
import { copyText } from '../utils.js';

export default function CopyButton({ text, label = 'Copy', title = 'Copy the question and answers' }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <button
      type="button"
      className={`copy-btn ${copied ? 'copied' : ''}`}
      title={title}
      onClick={async () => setCopied(await copyText(text))}
    >
      {copied ? '✓ Copied' : `⧉ ${label}`}
    </button>
  );
}
