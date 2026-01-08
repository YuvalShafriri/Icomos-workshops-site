import React from 'react';

export interface ResourceGroupProps {
  title: string;
  children: React.ReactNode;
}

export const ResourceGroup: React.FC<ResourceGroupProps> = ({ title, children }) => (
  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
    <div className="bg-slate-50 px-4 py-2 border-b border-slate-100">
      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</h4>
    </div>
    <div className="divide-y divide-slate-100 flex flex-col">{children}</div>
  </div>
);

export default ResourceGroup;
