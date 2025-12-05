export function useLoadingIndicator(
  status: Ref<'idle' | 'pending' | 'success' | 'error'>,
  options: {
    showDelay?: Ref<number> | number;
    minVisible?: Ref<number> | number;
  } = {}
) {
  const showDelay = computed(() => unref(options.showDelay ?? 250));
  const minVisible = computed(() => unref(options.minVisible ?? 500));

  const showLoadingIndicator = ref(false);
  let showTimer: ReturnType<typeof setTimeout>;
  let hideTimer: ReturnType<typeof setTimeout>;

  const timestamp = ref<number>(Date.now());

  const formattedTimestamp = computed(() => {
    const date = new Date(timestamp.value);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}.${month}. / ${hours}:${minutes} Uhr`;
  });

  watch(
    status,
    async (newStatus) => {
      // if (import.meta.server) return;

      if (newStatus === 'pending') {
        clearTimeout(showTimer);

        showTimer = setTimeout(() => {
          showLoadingIndicator.value = true;
        }, showDelay.value);
        return;
      }

      clearTimeout(showTimer);

      if (showLoadingIndicator.value) {
        clearTimeout(hideTimer);
        hideTimer = setTimeout(() => {
          showLoadingIndicator.value = false;
          timestamp.value = Date.now();
        }, minVisible.value);
      } else {
        showLoadingIndicator.value = false;
      }
    },
    { immediate: true }
  );

  return { formattedTimestamp, showLoadingIndicator, timestamp };
}
