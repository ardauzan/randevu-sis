import React from 'react'

interface usePaginationProps {
  totalCount: number
  currentPage: number
  pageSize: number
  siblingCount: number
}

interface PaginationProps {
  totalCount: number
  currentPage: number
  pageSize: number
  onPageChange: (page: number) => void
  siblingCount?: number
}

export function usePagination({
  totalCount,
  currentPage,
  pageSize,
  siblingCount = 1
}: usePaginationProps) {
  const paginationRange = []

  const totalPageCount = Math.ceil(totalCount / pageSize)

  if (totalPageCount > 1) {
    const startPage = Math.max(2, currentPage - siblingCount)
    const endPage = Math.min(totalPageCount - 1, currentPage + siblingCount)

    paginationRange.push(1)
    if (startPage > 2) {
      paginationRange.push('...')
    }

    for (let i = startPage; i <= endPage; i++) {
      paginationRange.push(i)
    }

    if (endPage < totalPageCount - 1) {
      paginationRange.push('...')
    }
    paginationRange.push(totalPageCount)
  }

  return paginationRange
}

export default function Pagination({
  totalCount,
  currentPage,
  pageSize,
  onPageChange,
  siblingCount = 1
}: PaginationProps) {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  })

  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }

  return (
    <nav className="flex" role="navigation" aria-label="pagination">
      <ul className="mt-10 flex flex-1 justify-around">
        {paginationRange.map((pageNumber: string | number, index: number) => {
          return (
            <li key={index}>
              <a
                className={`  ${
                  pageNumber === currentPage
                    ? 'cursor-not-allowed'
                    : 'cursor-pointer'
                }`}
                aria-label={`Goto page ${pageNumber}`}
                onClick={() => onPageChange(pageNumber as number)}
              >
                {pageNumber}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
