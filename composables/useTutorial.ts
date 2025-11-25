import { useAppStore } from '~/store/appStore';
import type { TutorialId } from '~/types/TutorialId';

export function useTutorial() {
  const store = useAppStore();

  function showTutorial(id: TutorialId) {
    store.openOffCanvas('Tutorial');
    // persist that this tutorial has been show before
  }

  return { showTutorial };
}
