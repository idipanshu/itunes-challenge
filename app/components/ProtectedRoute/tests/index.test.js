import React from 'react';
import { renderProvider } from '@utils/testUtils';
import ProtectedRoute from '../index';
import '@testing-library/jest-dom';
import { Router } from 'react-router-dom';
import SearchContainer from '@app/containers/SearchContainer/ItunesTracks';
import { createBrowserHistory } from 'history';

jest.mock('@utils/routeConstants', () => {
  return {
    dashboard: {
      route: '/',
      isProtected: true
    },
    login: {
      route: '/login',
      isProtected: false
    }
  };
});

describe('<ProtectedRoute />', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(
      <ProtectedRoute isLoggedIn={true} render={SearchContainer} exact={true} path="/" />
    );
    expect(baseElement).toMatchSnapshot();
  });
  it('should not render component if user is not logged in', () => {
    renderProvider(
      <ProtectedRoute isLoggedIn={false} render={SearchContainer} exact={true} path="/" handleLogout={submitSpy} />
    );
    expect(submitSpy).toHaveBeenCalledTimes(1);
  });

  it('should render component , not logged in, unprotected route', () => {
    const history = createBrowserHistory();
    renderProvider(
      <Router history={history}>
        <ProtectedRoute isLoggedIn={false} render={SearchContainer} exact={true} path="/login" />
      </Router>
    );
    expect(history.location.pathname).toBe('/login');
  });

  it('should redirect to the dashboard if logged in and accessing login page(unprotected)', () => {
    const history = createBrowserHistory();
    renderProvider(
      <Router history={history}>
        <ProtectedRoute isLoggedIn={true} render={SearchContainer} exact={true} path="/login" />
      </Router>
    );
    expect(history.location.pathname).toBe('/');
  });
});
