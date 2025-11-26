import { onLongPress } from '@vueuse/core';
import { useAppStore } from '~/store/appStore';

export default defineNuxtPlugin((nuxtApp) => {
  /* START DEBUG */
  const appStore = useAppStore();

  const attachGlobalEventListeners = () => {
    document.body.addEventListener('keydown', (e) => {
      if (e.key === 'Dead' || e.key === '`') appStore.debug = !appStore.debug;
    });

    onLongPress(
      document.body,
      () => {
        appStore.debug = !appStore.debug;
      },
      { delay: 2000 }
    );
  };

  attachGlobalEventListeners();
  /* END DEBUG */
});
