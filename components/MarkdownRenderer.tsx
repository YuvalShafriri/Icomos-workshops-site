
import React from 'react';

interface Props {
  text: string;
}

const MarkdownRenderer: React.FC<Props> = ({ text }) => {
  if (!text) return null;

  // Pre-process text to remove redundant HTML wrappers that Gemini might include
  const cleanedText = text
    .replace(/<div[^>]*dir=["']?rtl["']?[^>]*>/gi, '')
    .replace(/<\/div>/gi, '')
    .trim();

  const parseBold = (t: string) => 
    t.split(/\*\*(.*?)\*\*/g).map((p, i) => 
      (i % 2 === 1 ? <strong key={i} className="font-bold text-slate-900 bg-yellow-50 px-1 rounded">{p}</strong> : p)
    );

  const lines = cleanedText.split('\n');
  const elements: React.ReactNode[] = [];
  let isTable = false;
  let rows: string[] = [];

  const renderTable = (r: string[], k: string) => {
    const cells = (line: string) => line.split('|').map(c => c.trim()).filter(c => c !== '');
    const header = cells(r[0]);
    if (!header.length) return null;

    return (
      <div key={k} className="my-6 overflow-x-auto shadow-sm rounded-2xl border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200" dir="rtl">
          <thead className="bg-slate-50">
            <tr>
              {header.map((c, i) => (
                <th key={i} className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-widest">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {r.slice(2).map((row, ri) => (
              <tr key={ri} className="hover:bg-indigo-50/20 transition-colors">
                {cells(row).map((c, ci) => (
                  <td key={ci} className="px-6 py-4 text-sm text-slate-800 text-right">{parseBold(c)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  lines.forEach((line, i) => {
    if (line.trim().startsWith('|')) {
      rows.push(line);
      isTable = true;
    } else {
      if (isTable) {
        elements.push(renderTable(rows, `table_${i}`));
        rows = [];
        isTable = false;
      }
      
      const uk = `l_${i}`;
      const trimmedLine = line.trim();
      
      if (trimmedLine.startsWith('### ')) {
        elements.push(
          <h4 key={uk} className="text-lg font-bold text-slate-800 mt-6 mb-2 flex items-center gap-2">
            <span className="w-1 h-4 bg-indigo-300 rounded-full"></span>
            {trimmedLine.replace('### ', '')}
          </h4>
        );
      } else if (trimmedLine.startsWith('## ')) {
        elements.push(
          <h3 key={uk} className="text-xl font-bold text-indigo-700 mt-10 mb-4 border-b border-indigo-100 pb-2 flex items-center gap-3">
            <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
            {trimmedLine.replace('## ', '')}
          </h3>
        );
      } else if (trimmedLine.startsWith('# ')) {
        elements.push(
          <h2 key={uk} className="text-2xl font-black text-indigo-900 mt-12 mb-6 bg-indigo-50 p-3 rounded-lg border-r-4 border-indigo-500 shadow-sm">
            {trimmedLine.replace('# ', '')}
          </h2>
        );
      } else if (trimmedLine.startsWith('* ') || trimmedLine.startsWith('- ')) {
        elements.push(
          <div key={uk} className="flex gap-2 mr-2 group hover:bg-slate-50 p-1 rounded transition-colors">
            <span className="text-indigo-400 font-bold mt-1">•</span>
            <span className="flex-1 text-slate-700">{parseBold(trimmedLine.replace(/^[\*\-] /, ''))}</span>
          </div>
        );
      } else if (!trimmedLine) {
        elements.push(<div key={uk} className="h-2"></div>);
      } else {
        elements.push(<p key={uk} className="mb-4 text-slate-700 leading-relaxed text-base">{parseBold(line)}</p>);
      }
    }
  });

  if (isTable) elements.push(renderTable(rows, "final_t"));

  return <div className="space-y-1" dir="rtl">{elements}</div>;
};

export default MarkdownRenderer;
