export const isNotEmpty = (fieldValue: string) => {
  return (
    fieldValue !== undefined && fieldValue !== null && fieldValue.length > 0
  );
};

export const hasNumberOnly = (fieldValue: string) => {
  return RegExp('^[0-9]+$').test(fieldValue);
};

export const isASCIIString = (fieldValue: string) => {
  return /^[\x00-\x7F]*$/.test(fieldValue);
};

export const isFieldValueMatch = (firstField: string, secondField: string) => {
  return firstField !== null && firstField === secondField;
};

export const hasHTMLCode = (fieldString: string) => {
  return /(<([^>]+)>)/gi.test(fieldString);
};

export const removeHTMLCode = (fieldString: string) => {
  return fieldString.replace(/(<([^>]+)>)/gi, '');
};

export const hasExactLength = (fieldString: string, requiredLength: number) => {
  return fieldString.length === requiredLength;
};

export const hasEqLongerLength = (
  fieldString: string,
  miniumRequiredLength: number
) => {
  return fieldString.length >= miniumRequiredLength;
};

export const hasEqShorterLength = (
  fieldString: string,
  maximumLength: number
) => {
  return fieldString.length <= maximumLength;
};

export const isEveryValidatorPassed = (...rest: boolean[]) => {
  return rest.every((v) => v === true);
};

export const isSomeValidatorPassed = (...rest: boolean[]) => {
  return rest.some((v) => v === true);
};
