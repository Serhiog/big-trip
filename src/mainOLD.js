
import { generateMocks } from "./mock/point.js";
import HeaderTripPresenter from "./presenter/header.js";
import BoardPointsPresenter from "./presenter/boardPointsOLD.js";
import Groups from "./presenter/groupsOLD.js";

const COUNT_RENDER_DAYS_TRIP = 3;
const points = generateMocks(COUNT_RENDER_DAYS_TRIP);


const siteMainContainer = document.querySelector(`.trip-events`);
const siteHeaderMainTripContainer = document.querySelector(`.trip-main`);
const siteHeaderFilterTrip = siteHeaderMainTripContainer.querySelector(`.trip-main__trip-controls`);
new HeaderTripPresenter(points, siteHeaderMainTripContainer, siteHeaderFilterTrip).init();
new Groups(siteMainContainer, points).init(points);
