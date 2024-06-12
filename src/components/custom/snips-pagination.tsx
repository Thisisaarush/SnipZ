import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination"

interface SnipsPaginationProps {
  currentPage: number
  totalPages: number[]
}

const SnipsPagination: React.FC<SnipsPaginationProps> = ({ currentPage, totalPages }) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {currentPage === 1 ? (
            <PaginationPrevious href={""} />
          ) : (
            <PaginationPrevious href={`/snips?page=${currentPage - 1}`} />
          )}
        </PaginationItem>

        {currentPage > 2 && (
          <PaginationItem>
            <PaginationLink href={`/snips?page=1`}>First</PaginationLink>
          </PaginationItem>
        )}

        {currentPage > 1 && (
          <PaginationItem>
            <PaginationLink href={`/snips?page=${currentPage - 1}`}>
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink href={`/snips?page=${currentPage}`} isActive>
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        {currentPage < totalPages.length && (
          <PaginationItem>
            <PaginationLink href={`/snips?page=${currentPage + 1}`}>
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
        )}
        {currentPage < 299 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {currentPage < 300 && (
          <PaginationItem>
            <PaginationLink href={`/snips?page=300`}>Last</PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          {currentPage === 300 ? (
            <PaginationNext href={""} />
          ) : (
            <PaginationNext href={`/snips?page=${currentPage - 1}`} />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default SnipsPagination
