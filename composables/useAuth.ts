import { errorMessages } from '~/content/errorMessages';
import type { ErrorCode } from '~/types/ErrorCode';

export function useAuth() {
  function getErrorMessage(code?: ErrorCode) {
    if (!code || !errorMessages[code]) return errorMessages.unknown;
    return errorMessages[code];
  }

  return { getErrorMessage };
}
