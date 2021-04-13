export interface PaginationRequest {
  skip?: number;

  take?: number;

  search?: string;

  orderBy?: string;

  orderDirection?: 'ASC' | 'DESC';

  isGettingDeleted?: boolean;
}

export const PER_PAGE_OPTIONS = ['15', '25', '50'];

export const preparePerPageAllOptions = (total: number) => {
  const result = [...PER_PAGE_OPTIONS];
  result.push(`${total}`);
  return result;
};
