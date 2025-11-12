import { scoreActions } from '~/content/scoreActions';
import type { ScoreAction } from '~/types/ScoreAction';
import type { ScoreActionId } from '~/types/ScoreActionId';
import type { ToastNotification } from '~/types/ToastNotification';

export const useAppStore = defineStore(
  'appStore',
  () => {
    const { $gsap } = useNuxtApp();

    const debug = ref(false);
    const fullscreen = ref(false);
    const supportsFullscreen = ref(false);
    const saving = ref(false);
    const toastNotifications = ref<ToastNotification[]>([]);

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

    function removeToastNotification(id: string) {
      toastNotifications.value = toastNotifications.value.filter((notification) => notification.id !== id);
    }

    function removeAllToastNotifications() {
      toastNotifications.value = [];
    }

    return {
      debug,
      fullscreen,
      pushScoreNotification,
      pushToastNotification,
      removeAllToastNotifications,
      removeToastNotification,
      saving,
      supportsFullscreen,
      toastNotifications,
    };
  },
  {
    persist: {
      pick: [],
      storage: piniaPluginPersistedstate.localStorage(),
    },
  }
);
