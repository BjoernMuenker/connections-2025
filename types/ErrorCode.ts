export type ErrorCode =
  | 'email_not_confirmed'
  | 'invalid_credentials'
  | 'otp_expired'
  | 'same_password'
  | 'unknown'
  | 'user_already_exists'
  | 'weak_password';
