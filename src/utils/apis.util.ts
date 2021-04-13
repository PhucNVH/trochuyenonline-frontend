import { useLocation } from 'react-router-dom';

export const handleResponseError = (error: any) => {
  return Promise.reject(error);
};

export const removeConfirmationFields = (object: any) => {
  const keysWithConfirmation = Object.keys(object).filter((key) =>
    key.includes('confirm')
  );

  const excludedFiltered = { ...object };
  keysWithConfirmation.map((key) => delete excludedFiltered[key]);
  return excludedFiltered;
};

export const prepareGetQuery = (filter: Record<string, any>) => {
  const keys = Object.keys(filter);
  const filterValues = keys
    .filter((key) => !!filter[key] || filter[key] === 0)
    .map((key) => `${key}=${filter[key]}`);

  const behind = filterValues.join('&');

  if (behind) return `?${behind}`;

  return '';
};

export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
