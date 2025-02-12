import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PaginatorProps = {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
};
const Paginator = ({ page, setPage, totalPages }: PaginatorProps) => {
  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };
  const handlePageClick = (pageNumber: number) => () => {
    setPage(pageNumber);
  };
  return (
    <div className="flex justify-center mt-8">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={handlePrevious}
              className={page === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;

            // Show only the current page, the previous page, the next page, and the first and last page
            if (
              // pageNumber === 1 ||
              // pageNumber === totalPages ||
              pageNumber === page ||
              pageNumber === page - 1 ||
              pageNumber === page + 1
            ) {
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    onClick={handlePageClick(pageNumber)}
                    className={page === pageNumber ? "bg-black text-white" : ""}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            }
            // Show ellipsis after the first page
            if (pageNumber === 2 && page > 4) {
              return (
                <PaginationItem key={"start-ellipsis"}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            // Show ellipsis before the last page
            if(pageNumber===totalPages-1 && page<totalPages-3){
              return (
                <PaginationItem key={"end-ellipsis"}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }
          })}

          <PaginationItem>
            <PaginationNext
              onClick={handleNext}
              className={
                page === totalPages ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Paginator;
