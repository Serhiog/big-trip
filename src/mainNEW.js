
import { generatePoints } from "./mock/point.js";
import HeaderTripPresenter from "./presenter/header.js";
import Groups from "./presenter/groups.js";

const COUNT_RENDER_DAYS_TRIP = 10;
const points = generatePoints(COUNT_RENDER_DAYS_TRIP);

const siteMainContainer = document.querySelector(`.trip-events`);
const siteHeaderMainTripContainer = document.querySelector(`.trip-main`);
const siteHeaderFilterTrip = siteHeaderMainTripContainer.querySelector(`.trip-main__trip-controls`);
new HeaderTripPresenter(points, siteHeaderMainTripContainer, siteHeaderFilterTrip).init();

new Groups(siteMainContainer, points).init(points);

