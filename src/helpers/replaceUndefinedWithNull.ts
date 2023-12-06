export const replaceUndefinedWithNull = (obj: any): any => {
  const result: any = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key] !== undefined ? obj[key] : null;
    }
  }

  return result;
};
