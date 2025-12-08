import { onLongPress } from '@vueuse/core';
import { useAppStore } from '~/store/appStore';

export default defineNuxtPlugin(async (nuxtApp) => {
  const store = useAppStore();

  const currentVersion = ref<string | null>(null);

  const check = async () => {
    try {
      const res = await fetch('/version.json', {
        cache: 'no-cache',
      });

      const json = await res.json();

      if (!currentVersion.value) {
        currentVersion.value = json.version;
      } else if (json.version !== currentVersion.value) {
        console.log('app version changed');
      }
    } catch (e) {
      console.warn('Version check failed:', e);
    }
  };

  onMounted(() => {
    check();
    setInterval(check, 60000);
  });

  /* START DEBUG */
  const attachGlobalEventListeners = () => {
    document.body.addEventListener('keydown', (e) => {
      if (e.key === 'Dead' || e.key === '`') store.debug = !store.debug;
    });

    onLongPress(
      document.body,
      () => {
        store.debug = !store.debug;
      },
      { delay: 2000 }
    );
  };

  attachGlobalEventListeners();
  /* END DEBUG */
});
