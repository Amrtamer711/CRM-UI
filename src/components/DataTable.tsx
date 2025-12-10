'use client';

import { useState } from 'react';
import { ChevronUp, ChevronDown, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';

interface Column<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
  width?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (item: T) => void;
  itemsPerPage?: number;
}

export default function DataTable<T extends { id: number | string }>({
  data,
  columns,
  onRowClick,
  itemsPerPage = 10
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    const aVal = (a as Record<string, unknown>)[sortKey];
    const bVal = (b as Record<string, unknown>)[sortKey];

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortDirection === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="relative bg-[var(--void-800)]/60 backdrop-blur-sm border border-[var(--void-700)] rounded-2xl overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--indigo-500)]/[0.02] to-transparent pointer-events-none" />

      <div className="relative z-10 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--void-700)]">
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={`px-6 py-4 text-left text-xs font-semibold text-[var(--void-400)] uppercase tracking-wider ${column.sortable ? 'cursor-pointer hover:text-[var(--void-100)] transition-colors' : ''}`}
                  style={{ width: column.width }}
                  onClick={() => column.sortable && handleSort(String(column.key))}
                >
                  <div className="flex items-center gap-2">
                    <span>{column.label}</span>
                    {column.sortable && sortKey === column.key && (
                      sortDirection === 'asc' ? (
                        <ChevronUp className="w-4 h-4 text-[var(--indigo-400)]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[var(--indigo-400)]" />
                      )
                    )}
                  </div>
                </th>
              ))}
              <th className="w-12"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--void-700)]/50">
            {paginatedData.map((item, index) => (
              <tr
                key={item.id}
                onClick={() => onRowClick?.(item)}
                className={`
                  group transition-colors duration-150
                  ${onRowClick ? 'cursor-pointer' : ''}
                  hover:bg-[var(--void-700)]/30
                  opacity-0 animate-fade-in
                `}
                style={{ animationDelay: `${index * 30}ms`, animationFillMode: 'forwards' }}
              >
                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    className="px-6 py-4 text-sm text-[var(--void-100)]"
                  >
                    {column.render
                      ? column.render(item)
                      : String((item as Record<string, unknown>)[String(column.key)] ?? '')}
                  </td>
                ))}
                <td className="px-4 py-4">
                  <button className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-[var(--void-600)] transition-all">
                    <MoreHorizontal className="w-4 h-4 text-[var(--void-400)]" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="relative z-10 px-6 py-4 border-t border-[var(--void-700)] flex items-center justify-between">
          <p className="text-sm text-[var(--void-400)]">
            Showing <span className="font-medium text-[var(--void-100)]">{startIndex + 1}</span> to{' '}
            <span className="font-medium text-[var(--void-100)]">{Math.min(startIndex + itemsPerPage, data.length)}</span> of{' '}
            <span className="font-medium text-[var(--void-100)]">{data.length}</span> results
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-[var(--void-700)]/50 hover:bg-[var(--void-600)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-[var(--void-600)]"
            >
              <ChevronLeft className="w-4 h-4 text-[var(--void-100)]" />
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`
                    w-8 h-8 rounded-lg text-sm font-medium transition-all
                    ${currentPage === page
                      ? 'bg-gradient-to-r from-[var(--indigo-500)] to-[var(--purple-500)] text-white shadow-lg shadow-[var(--indigo-500)]/25'
                      : 'text-[var(--void-400)] hover:text-[var(--void-100)] hover:bg-[var(--void-700)]'
                    }
                  `}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-[var(--void-700)]/50 hover:bg-[var(--void-600)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-[var(--void-600)]"
            >
              <ChevronRight className="w-4 h-4 text-[var(--void-100)]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
