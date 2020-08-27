

import BoardPointsPresenter from "./boardPoints.js";

export default class Groups {
  constructor(siteMainContainer, points) {
    this.siteMainContainer = siteMainContainer;
    this.points = points;
  }

  init(points) {
    this._defaultPoints = points.slice();
    this._makeGroups();
  }

  _makeGroups() {
    const groups = new Map();
    this._defaultPoints.forEach((stop) => {
      const date = stop.startDate.toISOString().split(`T`)[0];
      if (!groups.has(date)) {
        groups.set(date, [stop]);
      } else {
        const items = groups.get(date);
        items.push(stop);
      }
    });
    new BoardPointsPresenter(this.siteMainContainer, this.points, groups).init(this.points);
  }
}
