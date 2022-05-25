import NotFound from '@containers/NotFoundPage/Loadable';
import TrackDetails from '@containers/SearchContainer/TrackDetails/Loadable';
import SearchContainer from '@containers/SearchContainer/ItunesTracks/Loadable';
import routeConstants from '@utils/routeConstants';

export const routeConfig = {
  itunes: {
    component: SearchContainer,
    ...routeConstants.itunes
  },
  trackDetails: {
    component: TrackDetails,
    ...routeConstants.trackDetails
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
