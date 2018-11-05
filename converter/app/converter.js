'use strict';

exports.rgbToHex = function(red, green, blue) {
  const redHex = red.toString(16);
  const greenHex = green.toString(16);
  const blueHex = blue.toString(16);

  return pad(redHex) + pad(greenHex) + pad(blueHex);
};

function pad(hex) {
  return hex.length === 1 ? '0' + hex : hex;
}