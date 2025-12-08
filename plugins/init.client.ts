import { onLongPress } from '@vueuse/core';
import { useAppStore } from '~/store/appStore';

export default defineNuxtPlugin(async (nuxtApp) => {
  const store = useAppStore();

  useVersionCheck(60000);

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
