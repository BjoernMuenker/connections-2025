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

    function removeToastNotification(id: string) {
      toastNotifications.value = toastNotifications.value.filter((notification) => notification.id !== id);
    }

    function removeAllToastNotifications() {
      toastNotifications.value = [];
    }

    return {
      debug,
      fullscreen,
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
