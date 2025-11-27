import { scoreActions } from '~/content/scoreActions';
import type { OffCanvas } from '~/types/OffCanvas';
import type { OffCanvasComponent } from '~/types/OffCanvasComponent';
import type { ScoreActionId } from '~/types/ScoreActionId';
import type { ToastNotification } from '~/types/ToastNotification';
import type { TutorialId } from '~/types/TutorialId';

export const useAppStore = defineStore(
  'appStore',
  () => {
    const debug = ref(false);
    const fullscreen = ref(false);
    const supportsFullscreen = ref(false);
    const saving = ref(false);
    const toastNotifications = ref<ToastNotification[]>([]);
    const offCanvasVisible = ref(false);
    const offCanvas = ref<OffCanvas>();
    const lastPlayedPuzzleId = ref<string>();
    const tutorials = ref<TutorialId[]>([]);

    function pushToastNotification(text: string) {
      toastNotifications.value.push({ id: generateUUID(), text, type: 'info' });
    }

    function pushScoreNotification(data: { action: ScoreActionId; score: number; amount: number }) {
      toastNotifications.value.push({
        id: generateUUID(),
        text: (data.amount !== 1 ? data.amount + 'x' : '') + scoreActions[data.action].name,
        score: data.score,
        type: 'score',
      });
    }

    function openOffCanvas(options?: OffCanvas) {
      offCanvasVisible.value = true;

      if (!options) return;
      offCanvas.value = options;
    }

    function closeOffCanvas() {
      offCanvasVisible.value = false;
    }

    function removeToastNotification(id: string) {
      toastNotifications.value = toastNotifications.value.filter((notification) => notification.id !== id);
    }

    function removeAllToastNotifications() {
      toastNotifications.value = [];
    }

    return {
      closeOffCanvas,
      debug,
      fullscreen,
      lastPlayedPuzzleId,
      offCanvas,
      offCanvasVisible,
      openOffCanvas,
      pushScoreNotification,
      pushToastNotification,
      removeAllToastNotifications,
      removeToastNotification,
      saving,
      supportsFullscreen,
      toastNotifications,
      tutorials,
    };
  },
  {
    persist: {
      pick: [],
      storage: piniaPluginPersistedstate.localStorage(),
    },
  }
);
