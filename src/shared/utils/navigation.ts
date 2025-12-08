import { useNavigate, useLocation, NavigateOptions } from 'react-router-dom';
import { ROUTES } from '../../router/routes';

export interface RouteParams {
  [key: string]: string;
}

export interface QueryParams {
  [key: string]: string | number | boolean;
}

export interface NavigationOptions extends NavigateOptions {
  replace?: boolean;
  state?: unknown;
}

/**
 * Custom navigation hook that provides helper functions for navigation
 */
export function useNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Navigate to a route, optionally replacing route params
   * @param route - Route constant from ROUTES
   * @param params - Object with param keys to replace (e.g., { id: '123' })
   * @param options - Navigation options (replace, state)
   */
  const navigateTo = (route: string, params: RouteParams = {}, options: NavigationOptions = {}): void => {
    let finalRoute = route;
    
    // Replace route parameters (e.g., :id)
    Object.keys(params).forEach(key => {
      finalRoute = finalRoute.replace(`:${key}`, params[key]);
    });

    navigate(finalRoute, options);
  };

  /**
   * Navigate to a route with query parameters
   * @param route - Route constant from ROUTES
   * @param queryParams - Object with query params (e.g., { msisdn: '123456' })
   * @param routeParams - Route params to replace
   */
  const navigateWithQuery = (route: string, queryParams: QueryParams = {}, routeParams: RouteParams = {}): void => {
    let finalRoute = route;
    
    // Replace route parameters
    Object.keys(routeParams).forEach(key => {
      finalRoute = finalRoute.replace(`:${key}`, routeParams[key]);
    });

    // Add query parameters
    const queryString = new URLSearchParams(
      Object.entries(queryParams).reduce((acc, [key, value]) => {
        acc[key] = String(value);
        return acc;
      }, {} as Record<string, string>)
    ).toString();
    if (queryString) {
      finalRoute += `?${queryString}`;
    }

    navigate(finalRoute);
  };

  /**
   * Navigate back in history
   * @param steps - Number of steps to go back (default: 1)
   */
  const navigateBack = (steps: number = 1): void => {
    navigate(-steps);
  };

  /**
   * Navigate to a route or go back if no route provided
   * @param route - Optional route to navigate to
   * @param options - Navigation options
   */
  const navigateOrBack = (route: string | null = null, options: NavigationOptions = {}): void => {
    if (route) {
      navigate(route, options);
    } else {
      navigateBack();
    }
  };

  /**
   * Get current route path
   */
  const getCurrentPath = (): string => {
    return location.pathname;
  };

  /**
   * Get query parameters from current location
   */
  const getQueryParams = (): Record<string, string> => {
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
export function buildRoute(route: string, params: RouteParams = {}): string {
  let finalRoute = route;
  Object.keys(params).forEach(key => {
    finalRoute = finalRoute.replace(`:${key}`, params[key]);
  });
  return finalRoute;
}

/**
 * Helper function to build route with query params
 */
export function buildRouteWithQuery(route: string, queryParams: QueryParams = {}, routeParams: RouteParams = {}): string {
  let finalRoute = buildRoute(route, routeParams);
  const queryString = new URLSearchParams(
    Object.entries(queryParams).reduce((acc, [key, value]) => {
      acc[key] = String(value);
      return acc;
    }, {} as Record<string, string>)
  ).toString();
  if (queryString) {
    finalRoute += `?${queryString}`;
  }
  return finalRoute;
}

