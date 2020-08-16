export const createMajorTripCostTemplate = (points) => {

  let totalPrice = 0;
  points.forEach((point) => {
    point.options.forEach((price) => {
      totalPrice += price[1];
    })
  });

  return `<p class="trip-info__cost">
  Total: €&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
</p>`;
};
