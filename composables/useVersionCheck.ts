import { useIntervalFn, useDocumentVisibility } from '@vueuse/core';
import { useAppStore } from '~/store/appStore';

export function useVersionCheck(interval = 60000) {
  const currentVersion = ref<string | null>(null);
  const store = useAppStore();
  const route = useRoute();
  const { isAppRoute } = useRoutes();

  const check = async () => {
    if (!isAppRoute(route.path)) {
      return;
    }

    try {
      const res = await fetch('/version.json', {
        cache: 'no-cache',
      });

      const json = await res.json();

      if (!currentVersion.value) {
        currentVersion.value = json.version;
      } else if (json.version !== currentVersion.value) {
        if (store.offCanvasVisible) return;
        store.openOffCanvas({ component: 'AppUpdate', closeButton: false });
      }
    } catch (e) {
      console.warn('Version check failed:', e);
    }
  };

  if (import.meta.server) return;

  onNuxtReady(() => {
    const visibility = useDocumentVisibility();

    const { pause, resume } = useIntervalFn(check, interval, {
      immediate: true,
      immediateCallback: true,
    });

    watch(visibility, (newState) => {
      if (newState === 'visible') {
        resume();
      } else {
        pause();
      }
    });
  });
}
