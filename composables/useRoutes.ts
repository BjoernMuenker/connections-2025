export function useRoutes() {
  const routes = {
    app: '/app',
    changeEmail: '/app/e-mail-aendern',
    changePassword: '/passwort-aendern',
    changePasswordAuthorized: '/app/passwort-aendern',
    confirmEmail: '/e-mail-bestaetigen',
    deleteAccount: '/app/account-loeschen',
    home: '/',
    leaderboard: '/app/bestenliste',
    resetPassword: '/passwort-zuruecksetzen',
    score: '/app/score',
    signIn: '/anmelden',
    signUp: '/account-erstellen',
    statistics: '/app/statistik',
  };

  const titles: { [key in keyof typeof routes]: string } = {
    app: 'Home',
    changeEmail: 'E-Mail ändern',
    changePassword: 'Passwort ändern',
    changePasswordAuthorized: 'Passwort ändern',
    confirmEmail: 'E-Mail bestätigen',
    deleteAccount: 'Account löschen',
    home: 'Willkommen',
    leaderboard: 'Bestenliste',
    resetPassword: 'Passwort zurücksetzen',
    score: 'Score',
    signIn: 'Anmelden',
    signUp: 'Account erstellen',
    statistics: 'Statistik',
  };

  function getTitle() {
    const routeName = getKeyByValue(routes, useRoute().path);
    if (!routeName) return;

    return titles[routeName];
  }

  function isAppRoute(path: string) {
    return path.startsWith(routes.app);
  }

  return { getTitle, isAppRoute, routes, titles };
}
