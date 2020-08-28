
import PointListPresenter from "../presenter/boardNEW.js";
import { render, RenderPosition } from "../utils/render.js";

export default class Groups {
  constructor(siteMainContainer, points) {
    this.siteMainContainer = siteMainContainer;
    this.points = points;
  }

  init(points) {
    this._makeGroups(points);
  }

  _makeGroups(points) {
    const groups = new Map();
    this.points.forEach((stop) => {
      const date = stop.startDate.toISOString().split(`T`)[0];
      if (!groups.has(date)) {
        groups.set(date, [stop]);
      } else {
        const items = groups.get(date);
        items.push(stop);
      }
    });

    const boardPresenter = new PointListPresenter(this.siteMainContainer, groups);
    boardPresenter.init(points);
  }
}
