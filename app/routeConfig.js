import NotFound from '@containers/NotFoundPage/Loadable';
import SearchContainer from '@containers/SearchContainer/ItunesTracks/Loadable';
import routeConstants from '@utils/routeConstants';

export const routeConfig = {
  itunes: {
    component: SearchContainer,
    ...routeConstants.itunes
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
