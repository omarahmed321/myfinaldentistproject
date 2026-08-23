import React from 'react';

export default function Skeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-8 space-y-6 shadow-sm">
      <div className="flex items-center gap-4 animate-pulse">
        <div className="w-12 h-12 bg-slate-200 rounded-xl"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-slate-200 rounded-full w-1/3"></div>
          <div className="h-3 bg-slate-100 rounded-full w-1/4"></div>
        </div>
      </div>
      <div className="space-y-3 animate-pulse pt-4 border-t border-slate-100">
        <div className="h-3 bg-slate-100 rounded-full w-full"></div>
        <div className="h-3 bg-slate-100 rounded-full w-full"></div>
        <div className="h-3 bg-slate-100 rounded-full w-2/3"></div>
      </div>
      <div className="flex justify-end gap-3 animate-pulse pt-4">
        <div className="h-9 bg-slate-200 rounded-lg w-24"></div>
        <div className="h-9 bg-slate-100 rounded-lg w-24"></div>
      </div>
    </div>
  );
}
