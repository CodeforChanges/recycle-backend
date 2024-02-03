export const isTruthy = (data: any) => {
  if (data === undefined) {
    return false;
  }

  if (data === null) {
    return false;
  }

  if (data instanceof Array && data.length === 0) {
    return false;
  }

  if (data === '') {
    return false;
  }

  return true;
};
