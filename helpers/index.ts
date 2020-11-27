const rgbHex = require('rgb-hex');

export const getStyle = (variable: string) => getComputedStyle(document.documentElement).getPropertyValue(variable);

export const rbgToHex = (string: string) => {
  const values = string.split(',');
  const trimmedValues = values.map(value => Number(value.trim()));
  return '#' + rgbHex(trimmedValues[0], trimmedValues[1], trimmedValues[2]);
};

export const vStyleToHex = (style: string) => {
  return rbgToHex(getStyle(style));
};

export * from './time';
