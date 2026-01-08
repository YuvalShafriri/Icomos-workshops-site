
import React from 'react';

interface Props {
  text: string;
  dir?: 'rtl' | 'ltr' | 'auto';
  theme?: 'light' | 'dark';
}

const MarkdownRenderer: React.FC<Props> = ({ text, dir = 'auto', theme = 'light' }) => {
  if (!text) return null;

  const cleanedText = text
    .replace(/<div[^>]*dir=["']?(rtl|ltr|auto)["']?[^>]*>/gi, '')
    .replace(/<\/div>/gi, '')
    .trim();

  const rtlCharRegex = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;
  const resolvedDir: 'rtl' | 'ltr' = dir === 'auto'
    ? (rtlCharRegex.test(cleanedText) ? 'rtl' : 'ltr')
    : (dir as 'rtl' | 'ltr');

  const isDark = theme === 'dark';
  
  const parseBold = (t: string) => {
    const parts = t.split(/\*\*(.*?)\*\*/g);
    return parts.map((p, i) => 
      i % 2 === 1 
        ? <strong key={i} className={isDark ? 'text-indigo-200 font-semibold' : 'font-bold text-slate-900 bg-yellow-50 px-1 rounded'}>{p}</strong> 
        : p
    );
  };

  const lines = cleanedText.split('\n');
  const elements: React.ReactNode[] = [];

  lines.forEach((line, i) => {
    const trimmedLine = line.trim();
    const key = `line_${i}`;
    
    if (trimmedLine.startsWith('### ')) {
      elements.push(
        <div key={key} className={`text-base font-semibold mt-4 mb-2 ${isDark ? 'text-indigo-200' : 'text-slate-800'}`}>
          {trimmedLine.replace('### ', '')}
        </div>
      );
    } else if (trimmedLine.startsWith('## ')) {
      elements.push(
        <div key={key} className={`text-lg font-bold mt-6 mb-3 ${isDark ? 'text-indigo-300 border-b border-indigo-800/50 pb-2' : 'text-indigo-700 border-b border-indigo-100 pb-2'}`}>
          {trimmedLine.replace('## ', '')}
        </div>
      );
    } else if (trimmedLine.startsWith('# ')) {
      elements.push(
        <div key={key} className={`text-xl font-bold mt-8 mb-4 ${isDark ? 'text-indigo-100' : 'text-indigo-900'}`}>
          {trimmedLine.replace('# ', '')}
        </div>
      );
    } else if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
      elements.push(
        <div key={key} className={`flex gap-2 mb-2 ${isDark ? 'text-indigo-100/90' : 'text-slate-700'}`}>
          <span className={isDark ? 'text-indigo-400' : 'text-indigo-500'}>•</span>
          <span className="flex-1 text-sm leading-relaxed">{parseBold(trimmedLine.replace(/^[\-\*] /, ''))}</span>
        </div>
      );
    } else if (!trimmedLine) {
      elements.push(<div key={key} className="h-3"></div>);
    } else {
      elements.push(
        <p key={key} className={`mb-3 text-sm leading-relaxed ${isDark ? 'text-indigo-100/90' : 'text-slate-700'}`}>
          {parseBold(line)}
        </p>
      );
    }
  });

  return <div className="space-y-1" dir={resolvedDir}>{elements}</div>;
};

export default MarkdownRenderer;
