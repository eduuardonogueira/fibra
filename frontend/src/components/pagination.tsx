import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (p: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}: IPaginationProps) {
  if (totalPages > 1)
    return (
      <div className="flex items-center justify-center space-x-2 py-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="hover:cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Página anterior</span>
        </Button>
        <div className="text-sm text-muted-foreground">
          Página {currentPage} de {totalPages}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="hover:cursor-pointer"
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Próxima página</span>
        </Button>
      </div>
    );
}
