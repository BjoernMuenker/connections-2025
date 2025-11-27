import type { ErrorCode } from '~/types/ErrorCode';

export const errorMessages: { [key in ErrorCode]: string } = {
  otp_expired: 'Dieser Link ist ungültig oder abgelaufen.',
  email_not_confirmed: 'Diese E-Mail-Adresse ist noch nicht bestätigt.',
  invalid_credentials: 'E-Mail und/oder Passwort sind ungültig.',
  user_already_exists: 'Diese E-Mail-Adresse ist bereits vergeben.',
  same_password: 'Dein neues Passwort muss anders sein als dein bisheriges.',
  unknown: 'Ein unbekannter Fehler ist aufgetreten.',
};
