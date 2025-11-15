export function useRoutes() {
  const routes = {
    app: '/app',
    home: '/',
    login: '/sign-in',
    resetPassword: '/passwort-zuruecksetzen',
    changePassword: '/passwort-aendern',
    confirmEmail: '/email-bestaetigen',
    signup: '/signup',
    scores: '/app/scores',
    statistics: '/app/statistik',
  };

  return { routes };
}
