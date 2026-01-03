exports.calculateMinPrice = (basePrice) => {
  return Math.floor(basePrice * 0.7);
};

exports.validatePrice = (proposed, min) => {
  return proposed >= min;
};
