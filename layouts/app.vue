<script setup lang="ts">
  import { onClickOutside } from '@vueuse/core';
  import AppButton from '~/components/AppButton.vue';
  import LoadingIndicator from '~/components/LoadingIndicator.vue';
  import ToastNotification from '~/components/ToastNotification.vue';
  import { useAppStore } from '~/store/appStore';

  const store = useAppStore();
  const route = useRoute();
  const { routes } = useRoutes();
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();

  const { $gsap } = useNuxtApp();

  async function signOut() {
    await supabase.auth.signOut();
    navigateTo(routes.login);
  }

  async function deleteAccount() {
    const result = await $fetch<boolean>('/api/delete-user', {
      method: 'POST',
      body: { id: user.value?.sub },
    });

    if (!result) {
      store.pushToastNotification('Dein Account konnte nicht gelöscht werden.');
      return;
    }

    navigateTo(routes.home);
  }

  const offCanvasVisible = ref(false);

  function showOffCanvas() {
    offCanvasVisible.value = true;
    $gsap.to('.off-canvas', { translateY: 0, duration: 0.3 });
    $gsap.to('.non-off-canvas', { scale: 0.9, duration: 0.3 });
  }

  function hideOffCanvas() {
    offCanvasVisible.value = false;
    $gsap.to('.off-canvas', { translateY: '100%', duration: 0.3 });
    $gsap.to('.non-off-canvas', { scale: 1, duration: 0.3 });
  }

  const offCanvasRef = ref<HTMLElement>();

  const title = ref();

  function getPageTitle() {
    if (route.name === 'app-day') {
      return route.params.day + '.&thinsp;Dezember';
    }

    if (route.name === 'app-day-statistik') {
      return route.params.day + '.&thinsp;Dezember&thinsp;/&thinsp;Statistik';
    }

    if (route.path === routes.scores) {
      return 'Bestenliste';
    }

    if (route.path === routes.app) {
      return 'Hi, ' + (user.value?.user_metadata.display_name ?? 'Nutzer');
    }

    if (route.path === routes.statistics) {
      return 'Statistik';
    }
  }

  watch(
    () => route.fullPath,
    () => {
      title.value = getPageTitle();
    },
    { immediate: true }
  );

  const backButtonTarget = computed(() => {
    if (route.name === 'app-day-statistik') {
      return routes.app + '/' + route.params.day;
    }

    return routes.app;
  });
</script>

<template>
  <div class="non-off-canvas" :class="{ 'off-canvas-visible': offCanvasVisible }">
    <header class="header">
      <div class="back">
        <Transition name="slide-fade">
          <NuxtLink v-if="route.path !== routes.app" :to="backButtonTarget" class="back-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
          </NuxtLink>
        </Transition>
      </div>
      <TransitionGroup name="elevator" tag="div" class="title-wrapper">
        <div :key="title" class="title heading-large" v-html="title"></div>
      </TransitionGroup>
      <div class="avatar" @click="showOffCanvas">
        {{ user?.user_metadata?.name?.slice(0, 1) ?? 'B' }}
      </div>
    </header>
    <div class="toast-notifications">
      <ToastNotification v-for="toast in store.toastNotifications" v-bind="toast" :key="toast.id" />
    </div>
    <main>
      <div class="page-content" :class="{ 'off-canvas-visible': offCanvasVisible }">
        <NuxtPage :page-key="(route) => route.fullPath" />
      </div>
    </main>
  </div>
  <div class="off-canvas-backdrop" :class="{ visible: offCanvasVisible }" @click="hideOffCanvas"></div>
  <div class="off-canvas" ref="offCanvasRef">
    <div class="off-canvas-inner">
      <div class="close-button">×</div>
      <div class="user-menu">
        <button @click="signOut">Abmelden</button>
        <button @click="deleteAccount">Account löschen</button>
        <div>Build ID: {{ useRuntimeConfig().public.NUXT_PUBLIC_BUILD_ID }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .non-off-canvas {
    backdrop-filter: blur(10px);
    overflow: auto;
    overscroll-behavior: contain;
    height: 100%;
  }

  header {
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: spacing('m');
    width: 100%;
    left: 0;
    top: 0;
    z-index: 1;

    &::after {
      position: absolute;
      content: '';
      z-index: -1;
      height: 100%;
      top: 0;
      left: spacing('m');
      width: calc(100% - spacing('m') * 2);
      background: #efefef;
    }
  }

  h1 {
    white-space: nowrap;
  }

  .user-menu {
    display: flex;
    flex-direction: column;
    gap: spacing('s');
  }

  .page-content {
    padding: 100px spacing('m') spacing('m') spacing('m');
    overflow-x: hidden;

    @include breakpoint('large') {
      max-width: 616px;
      margin: 0 auto;
    }

    &.off-canvas-visible {
      backdrop-filter: blur(10px);
    }
  }

  .off-canvas-backdrop {
    background: rgba(0, 0, 0, 0.7);
    opacity: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    transition: opacity 0.2s, backdrop-filter 0.2s;
    pointer-events: none;

    &.visible {
      opacity: 1;
      pointer-events: all;
      // backdrop-filter: blur(20px);
    }
  }

  .page-title {
    display: flex;
    align-items: center;
    gap: spacing('s');
  }

  .back {
    width: 40px;
    height: 40px;

    @include breakpoint('medium') {
      width: 48px;
      height: 48px;
    }
  }

  .back-button {
    width: 40px;
    height: 40px;
    background: color('beige');
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: color('white');

    @include breakpoint('medium') {
      width: 48px;
      height: 48px;
    }
  }

  .avatar {
    width: 40px;
    height: 40px;
    background: linear-gradient(#5c5c5c, #000);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: white;
    font-size: 14px;

    @include breakpoint('medium') {
      font-size: 18px;
      width: 48px;
      height: 48px;
    }
  }

  .toast-notifications {
    position: fixed;
    top: 0;
    left: 50px;
    width: calc(100% - 100px);
    height: 100%;
    padding-top: spacing('m');
    display: flex;
    align-items: center;
    flex-direction: column-reverse;
    justify-content: flex-end;
    gap: spacing('s');
    z-index: 1;
    pointer-events: none;

    .toast-notification {
      pointer-events: all;
    }
  }

  .off-canvas {
    left: 0;
    bottom: 0;
    width: 100%;
    position: fixed;
    background: color('white');
    border-top-left-radius: border-radius('large');
    border-top-right-radius: border-radius('large');
    transform: translateY(100%);
  }

  .close-button {
    position: absolute;
    right: spacing('m');
    top: spacing('m');
    width: 40px;
    height: 40px;
    background: color('beige');
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    @include breakpoint('medium') {
      width: 48px;
      height: 48px;
    }
  }

  .off-canvas-inner {
    padding: spacing('l') spacing('m');
    width: 100%;

    @include breakpoint('large') {
      width: 616px;
      margin: 0 auto;
    }
  }

  .slide-fade-enter-active {
    transition: all 0.3s cubic-bezier(0.17, 0.84, 0.44, 1);
  }

  .slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(0.17, 0.84, 0.44, 1);
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(-8px);
    opacity: 0;
  }

  /* wrapper prevents layout jumping */
  .title-wrapper {
    position: relative;
    flex: 1;
    overflow: hidden;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    @include breakpoint('small', 'max') {
      .title {
        font-size: 20px;
      }
    }
  }

  .title {
    position: relative;
    display: inline-block;
    white-space: nowrap;
    line-height: 40px;
  }

  /* entering item */
  .elevator-enter-from {
    transform: translateY(-100%);
    opacity: 0;
  }

  .elevator-enter-to {
    transform: translateY(0);
    opacity: 1;
  }

  .elevator-enter-active {
    transition: transform 0.6s cubic-bezier(0.17, 0.84, 0.44, 1), opacity 0.5s ease;
  }

  /* leaving item */
  .elevator-leave-from {
    transform: translateY(0);
    opacity: 1;
  }

  .elevator-leave-to {
    transform: translateY(100%);
    opacity: 0;
  }

  .elevator-leave-active {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    transition: transform 0.6s cubic-bezier(0.17, 0.84, 0.44, 1), opacity 0.5s ease;
  }
</style>
