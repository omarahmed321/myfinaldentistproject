import React from 'react';

export default function PaginationControls({
  currentPage,
  setCurrentPage,
  totalPages,
  from,
  to,
  total,
  unitName = ''
}) {
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white border-t border-[#E2E8F0] rounded-b-xl" dir="rtl">
      <p className="text-sm text-[#62748E] font-medium">
        عرض {from} إلى {to} من أصل {total} {unitName}
      </p>

      <div className="flex items-center gap-1.5" dir="ltr">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="w-8 h-8 flex justify-center items-center rounded-lg border border-[#E2E8F0] text-[#62748E] hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          &lt;
        </button>

        {Array.from({ length: totalPages }, (_, index) => {
          let pageNum = index + 1;
          let isActive = currentPage === pageNum;
          return (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`w-8 h-8 rounded-lg font-bold text-sm transition ${
                isActive
                  ? 'bg-[#0D9488] text-white shadow-sm'
                  : 'bg-white text-[#62748E] border border-[#E2E8F0] hover:bg-gray-50'
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="w-8 h-8 flex justify-center items-center rounded-lg border border-[#E2E8F0] text-[#62748E] hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}