import { render, RenderPosition } from "./utils/render.js";
import { generateMocks } from "./mock/point.js";
import NoPoints from "./view/no-Points.js";
import HeaderTripPresenter from "./presenter/header.js";
import BoardPointsPresenter from "./presenter/boardPoints.js";
import PointsPresenter from "./presenter/trip.js";

const COUNT_RENDER_DAYS_TRIP = 1;
const points = generateMocks(COUNT_RENDER_DAYS_TRIP);

const siteSiteMainContainer = document.querySelector(`.trip-events`);

render(siteSiteMainContainer, new NoPoints(points), RenderPosition.AFTEREND);

new HeaderTripPresenter(points).init();
new BoardPointsPresenter(siteSiteMainContainer, points).init();
new PointsPresenter(siteSiteMainContainer, points).init();

