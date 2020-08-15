export const createMajorTripCostTemplate = (points) => {
  let totalPrice = 0;
  points.forEach(point => {
    totalPrice += point.price;
  });

  return `<p class="trip-info__cost">
  Total: €&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
</p>`;
};
