export function useRoutes() {
  const routes = {
    app: '/app',
    home: '/',
    login: '/sign-in',
    resetPassword: '/passwort-zuruecksetzen',
    changePassword: '/passwort-aendern',
    signup: '/signup',
  };

  return { routes };
}