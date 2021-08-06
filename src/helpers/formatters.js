export const formatAmount = (num, currency = '$', noDecimal = false) => {
  if (+num) {
    const formatted = parseFloat(num)
      .toFixed(noDecimal ? 0 : 2)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

    return `${currency ?? ''}${formatted}`;
  }

  return `${currency ?? ''}0${noDecimal ? '' : '.00'}`;
};