import { useAppStore } from '~/store/appStore';

export default defineNuxtPlugin(() => {
  const router = useRouter();
  const store = useAppStore();

  router.afterEach((_to, from) => {
    store.closeOffCanvas();
    store.removeAllToastNotifications();
  });
});
