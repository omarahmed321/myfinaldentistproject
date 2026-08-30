import React from 'react';

export default function Skeleton() {
  return (
    <div className="w-full h-full bg-white rounded-2xl border border-slate-200 p-4 md:p-8 space-y-4 md:space-y-6 shadow-sm">
      <div className="flex items-center gap-3 md:gap-4 animate-pulse">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-200 rounded-xl shrink-0"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-slate-200 rounded-full w-1/2 md:w-1/3"></div>
          <div className="h-3 bg-slate-100 rounded-full w-1/3 md:w-1/4"></div>
        </div>
      </div>
      <div className="space-y-3 animate-pulse pt-3 md:pt-4 border-t border-slate-100">
        <div className="h-3 bg-slate-100 rounded-full w-full"></div>
        <div className="h-3 bg-slate-100 rounded-full w-full"></div>
        <div className="h-3 bg-slate-100 rounded-full w-2/3"></div>
      </div>
    </div>
  );
}