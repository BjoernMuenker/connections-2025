import { useAppStore } from '~/store/appStore';

export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter();
  const store = useAppStore();

  router.afterEach((_to, from) => {
    store.closeOffCanvas();
    store.removeAllToastNotifications();

    setTimeout(() => {
      const el = document.querySelector('main');
      if (el) {
        el.scrollTo({
          top: 0,
        });
      }
    });
  });
});
