import NotFound from '@containers/NotFoundPage/Loadable';
import SearchContainer from '@containers/SearchContainer/ItunesTracks/Loadable';
import SongDetailsPage from '@containers/SearchContainer/TrackDetails/Loadable';
import routeConstants from '@utils/routeConstants';

export const routeConfig = {
  itunes: {
    component: SearchContainer,
    ...routeConstants.itunes
  },
  songPape: {
    component: SongDetailsPage,
    ...routeConstants.songPape
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
