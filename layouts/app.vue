<script setup lang="ts">
  import OffCanvasArea from '~/components/OffCanvasArea.vue';
  import ToastNotification from '~/components/ToastNotification.vue';
  import { useAppStore } from '~/store/appStore';

  const { getTitle, routes } = useRoutes();

  const store = useAppStore();
  const route = useRoute();
  const user = useSupabaseUser();

  const title = ref();

  function getPageTitle() {
    if (route.name === 'app-day') {
      return route.params.day + '.&thinsp;Dezember';
    }

    if (route.name === 'app-day-statistik') {
      return route.params.day + '.&thinsp;Dezember&thinsp;/&thinsp;Statistik';
    }

    if (route.path === routes.leaderboard) {
      return 'Bestenliste';
    }

    if (route.path === routes.app) {
      return 'Hi, ' + (user.value?.user_metadata.display_name ?? 'Nutzer');
    }

    if (route.path === routes.statistics) {
      return 'Statistik';
    }

    if (route.path === routes.changePasswordAuthorized) {
      return 'Passwort ändern';
    }

    if (route.path === routes.changeEmail) {
      return 'E-Mail ändern';
    }

    if (route.path === routes.deleteAccount) {
      return 'Account löschen';
    }

    if (route.path === routes.score) {
      return 'Score';
    }
  }

  watch(
    () => route.fullPath,
    () => {
      title.value = getPageTitle();
      useHead({
        title: getTitle(),
      });
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
  <div class="non-off-canvas">
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
      <button class="avatar" @click="store.openOffCanvas('UserMenu')">
        {{ user?.user_metadata?.display_name?.slice(0, 1) }}
      </button>
    </header>
    <div class="toast-notifications">
      <ToastNotification v-for="toast in store.toastNotifications" v-bind="toast" :key="toast.id" />
    </div>
    <main>
      <div class="page-content">
        <NuxtPage :page-key="(route) => route.fullPath" />
      </div>
    </main>
  </div>
  <OffCanvasArea />
</template>

<style lang="scss" scoped>
  .non-off-canvas {
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

  .page-content {
    padding: 100px spacing('m') spacing('m') spacing('m');
    overflow-x: hidden;

    @include breakpoint('small') {
      max-width: 616px;
      margin: 0 auto;
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
    color: color('white');
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
