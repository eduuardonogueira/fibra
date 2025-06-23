export interface IPaginationResponse<T> {
  data: T;
  totalPages: number;
  totalElements: number;
  size: number;
}

export interface IPaginationProps {
  currentPage: number;
  pageSize: number;
}
