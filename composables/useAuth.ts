import { errorMessages } from '~/content/errorMessages';
import type { ErrorCode } from '~/types/ErrorCode';

export function useAuth() {
  function getErrorMessage(code?: string) {
    if (!code || !errorMessages[code as ErrorCode]) return errorMessages.unknown;
    return errorMessages[code as ErrorCode];
  }

  return { getErrorMessage };
}
