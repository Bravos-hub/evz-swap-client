import { ROUTES } from './router/routes';

test('defines onboarding and support route aliases used by the router', () => {
  expect(ROUTES.PROFILE_SETUP).toBe('/onboarding/profile');
  expect(ROUTES.TOP_UP_ALIAS).toBe('/wallet/top-up');
  expect(ROUTES.CONTACT_SUPPORT_ALIAS).toBe('/help/contact');
});
