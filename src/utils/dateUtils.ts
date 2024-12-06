export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const generateDueDate = (date: string, days: number = 30): string => {
  const dueDate = new Date(date);
  dueDate.setDate(dueDate.getDate() + days);
  return dueDate.toISOString().split('T')[0];
};