import { useDocumentVisibility as vueUseDocumentVisibility } from '@vueuse/core';

export function useDocumentVisibility(callback: () => void) {
  const visibility = vueUseDocumentVisibility();

  watch(visibility, (current, previous) => {
    if (current === 'visible' && previous === 'hidden') {
      callback();
    }
  });
}
