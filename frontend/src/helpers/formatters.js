export const formatPrice = (p) => {
  if (p == null || isNaN(p)) return "0 so'm";
  try {
    return new Intl.NumberFormat('ru-RU').format(Math.round(p)) + " so'm";
  } catch {
    return Math.round(p).toLocaleString() + " so'm";
  }
};

export const formatDate = (d) => {
  if (!d) return '';
  try {
    return new Date(d).toLocaleDateString('ru-RU', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  } catch {
    return new Date(d).toLocaleDateString();
  }
};
