import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../../router/routes';

/**
 * Custom navigation hook that provides helper functions for navigation
 */
export function useNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Navigate to a route, optionally replacing route params
   * @param {string} route - Route constant from ROUTES
   * @param {object} params - Object with param keys to replace (e.g., { id: '123' })
   * @param {object} options - Navigation options (replace, state)
   */
  const navigateTo = (route, params = {}, options = {}) => {
    let finalRoute = route;
    
    // Replace route parameters (e.g., :id)
    Object.keys(params).forEach(key => {
      finalRoute = finalRoute.replace(`:${key}`, params[key]);
    });

    navigate(finalRoute, options);
  };

  /**
   * Navigate to a route with query parameters
   * @param {string} route - Route constant from ROUTES
   * @param {object} queryParams - Object with query params (e.g., { msisdn: '123456' })
   * @param {object} routeParams - Route params to replace
   */
  const navigateWithQuery = (route, queryParams = {}, routeParams = {}) => {
    let finalRoute = route;
    
    // Replace route parameters
    Object.keys(routeParams).forEach(key => {
      finalRoute = finalRoute.replace(`:${key}`, routeParams[key]);
    });

    // Add query parameters
    const queryString = new URLSearchParams(queryParams).toString();
    if (queryString) {
      finalRoute += `?${queryString}`;
    }

    navigate(finalRoute);
  };

  /**
   * Navigate back in history
   * @param {number} steps - Number of steps to go back (default: 1)
   */
  const navigateBack = (steps = 1) => {
    navigate(-steps);
  };

  /**
   * Navigate to a route or go back if no route provided
   * @param {string} route - Optional route to navigate to
   * @param {object} options - Navigation options
   */
  const navigateOrBack = (route = null, options = {}) => {
    if (route) {
      navigate(route, options);
    } else {
      navigateBack();
    }
  };

  /**
   * Get current route path
   */
  const getCurrentPath = () => {
    return location.pathname;
  };

  /**
   * Get query parameters from current location
   */
  const getQueryParams = () => {
    return Object.fromEntries(new URLSearchParams(location.search));
  };

  return {
    navigate,
    navigateTo,
    navigateWithQuery,
    navigateBack,
    navigateOrBack,
    getCurrentPath,
    getQueryParams,
    location,
  };
}

/**
 * Helper function to build route with params (for use outside components)
 */
export function buildRoute(route, params = {}) {
  let finalRoute = route;
  Object.keys(params).forEach(key => {
    finalRoute = finalRoute.replace(`:${key}`, params[key]);
  });
  return finalRoute;
}

/**
 * Helper function to build route with query params
 */
export function buildRouteWithQuery(route, queryParams = {}, routeParams = {}) {
  let finalRoute = buildRoute(route, routeParams);
  const queryString = new URLSearchParams(queryParams).toString();
  if (queryString) {
    finalRoute += `?${queryString}`;
  }
  return finalRoute;
}

