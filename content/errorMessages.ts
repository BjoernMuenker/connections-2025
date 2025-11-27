import type { ErrorCode } from '~/types/ErrorCode';

export const errorMessages: { [key in ErrorCode]: string } = {
  email_not_confirmed: 'Diese E-Mail-Adresse ist noch nicht bestätigt.',
  invalid_credentials: 'E-Mail und/oder Passwort sind ungültig.',
  otp_expired: 'Dieser Link ist ungültig oder abgelaufen.',
  same_password: 'Dein neues Passwort muss anders sein als dein bisheriges.',
  unknown: 'Ein unbekannter Fehler ist aufgetreten.',
  user_already_exists: 'Diese E-Mail-Adresse ist bereits vergeben.',
  weak_password: 'Passwörter müssen mindestens 6 Zeichen lang sein.',
};
