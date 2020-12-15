var text_symbol = require("../data/keyboards/text-symbol").text_symbol;

export const textToSymbol = (value, symbol_display) => {
  if (symbol_display) {
    var item = text_symbol.find((v) => v[1] == value.toLowerCase());
    return item ? item[0] : value;
  } else {
    return value;
  }
};
