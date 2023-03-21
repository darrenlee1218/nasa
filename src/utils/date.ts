export const getDateString = (date: Date): string => {
  return date.toLocaleString('default', { dateStyle: 'medium' });
};
