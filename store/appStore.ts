export const useAppStore = defineStore(
  'appStore',
  () => {
    const debug = ref(false);
    const fullscreen = ref(false);
    const supportsFullscreen = ref(false);

    return {
      debug,
      fullscreen,
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
