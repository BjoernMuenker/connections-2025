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
        store.removeToastNotification(props.id);
      },
    });
  }

  onMounted(() => {
    if (!rootRef.value) return;
    $gsap.fromTo(rootRef.value, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.3, ease: 'power3.out' });
    setTimeout(remove, 7000); // clear this on unmounted?
  });
</script>

<template>
  <div class="toast-notification" :class="type" ref="rootRef" @click="remove">
    <span v-if="score" class="score-badge">+{{ score }}</span>
    {{ text }}
  </div>
</template>

<style lang="scss" scoped>
  .toast-notification {
    color: white;
    border-radius: spacing('xs');
    padding: spacing('xs') spacing('s');
    background: color('grey-dark');
    display: flex;
    gap: spacing('xs');
    font-size: 15px;

    @include breakpoint('medium') {
      font-size: 16px;
      padding: spacing('s') spacing('s');
    }
  }

  .score-badge {
    color: color('grey-dark');
    background: color('white');
    padding: 0 spacing('xxs');
    border-radius: 50px;
    line-height: 1em;
    display: flex;
    align-items: center;
    @include var-font-weight(800);
  }
</style>
