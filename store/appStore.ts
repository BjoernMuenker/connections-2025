export const useAppStore = defineStore(
  'appStore',
  () => {
    const debug = ref(false);
    const fullscreen = ref(false);
    const supportsFullscreen = ref(false);

    function pushToast(text: string) {
      // TODO implement toasts
      return;
    }

    return {
      debug,
      fullscreen,
      pushToast,
      supportsFullscreen,
    };
  },
  {
    persist: {
      pick: [],
      storage: piniaPluginPersistedstate.localStorage(),
    },
  }
);
