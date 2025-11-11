<script setup lang="ts">
  import { useAppStore } from '~/store/appStore';
  import type { ToastNotification } from '~/types/ToastNotification';

  const { $gsap } = useNuxtApp();
  const store = useAppStore();
  const props = defineProps<ToastNotification>();

  const rootRef = ref<HTMLElement>();

  function remove() {
    if (!rootRef.value) return;

    $gsap.to(rootRef.value, {
      opacity: 0,
      scale: 0,
      duration: 0.3,
      ease: 'power3.out',
      overwrite: true,
      onComplete: () => {
        // const flipState = $gsap.Flip.getState('.toast-notification');
        store.removeToastNotification(props.id);
        // nextTick(() => {
        //   $gsap.Flip.from(flipState, { duration: 0.3, ease: 'power3.out' });
        // });
      },
    });
  }

  onMounted(() => {
    if (!rootRef.value) return;
    $gsap.fromTo(rootRef.value, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.3, ease: 'power3.out' });

    setTimeout(remove, 5000);
  });
</script>

<template>
  <div class="toast-notification" :class="type" ref="rootRef" @click="remove">
    {{ text }}
  </div>
</template>

<style lang="scss" scoped>
  .toast-notification {
    color: white;
    border-radius: spacing('xs');
    padding: spacing('s');
    background: #333;
  }
</style>
