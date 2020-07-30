function currencyFormat(num) {
  return `$${num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
}

function formatPct(decimal) {
  return `${decimal * 100}%`;
}

export { currencyFormat, formatPct };
