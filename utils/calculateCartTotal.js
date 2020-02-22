export default products => {
  const total = products.reduce(
    (accumulator, { quantity, product: { price } }) => {
      accumulator += quantity * price;
      return accumulator;
    },
    0
  );
  // to remove rounding errors
  const cartTotal = ((total * 100) / 100).toFixed(2);
  const stripeTotal = Number((total * 100).toFixed(2));
  return {
    cartTotal,
    stripeTotal
  };
};
