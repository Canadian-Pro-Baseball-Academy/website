import { Table } from "@tanstack/react-table"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DataTablePaginationProps<TData> {
  table: Table<TData>
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between px-2 float-right md:float-none">
      <div className="hidden flex-1 text-sm text-muted-foreground md:block">
        Showing rows{" "}
        {table.getState().pagination.pageSize *
          table.getState().pagination.pageIndex +
          1}{" "}
        -{" "}
        {table.getState().pagination.pageSize *
          (table.getState().pagination.pageIndex + 1) >
        table.getFilteredRowModel().rows.length
          ? table.getFilteredRowModel().rows.length
          : table.getState().pagination.pageSize *
            (table.getState().pagination.pageIndex + 1)}{" "}
        of {table.getFilteredRowModel().rows.length}.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="hidden sm:flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <button
            className={cn(
              buttonVariants({ variant: "outline" }),
              "hidden h-8 w-8 p-0 lg:flex"
            )}
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeftIcon className="h-4 w-4" />
          </button>
          <button
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-8 w-8 p-0"
            )}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
          <button
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-8 w-8 p-0"
            )}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </button>
          <button
            className={cn(
              buttonVariants({ variant: "outline" }),
              "hidden h-8 w-8 p-0 lg:flex"
            )}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
