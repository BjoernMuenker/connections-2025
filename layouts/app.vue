<script setup lang="ts">
  import { onClickOutside } from '@vueuse/core';
  import AppButton from '~/components/AppButton.vue';

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
    console.log(user.value?.sub);

    await $fetch('/api/delete-user', {
      method: 'POST',
      body: { id: user.value?.sub },
    });
  }

  const offCanvasVisible = ref(false);

  function showOffCanvas() {
    offCanvasVisible.value = true;
    $gsap.to('.off-canvas', { translateY: 0, duration: 0.3 });
    $gsap.to('.wrapper', { scale: 0.9, duration: 0.3 });
  }

  function hideOffCanvas() {
    offCanvasVisible.value = false;
    $gsap.to('.off-canvas', { translateY: '100%', duration: 0.3 });
    $gsap.to('.wrapper', { scale: 1, duration: 0.3 });
  }

  const offCanvasRef = ref<HTMLElement>();

  onMounted(() => {
    onClickOutside(offCanvasRef.value, hideOffCanvas);
  });
</script>

<template>
  <header class="header">
    <h1>
      <template v-if="route.name === 'app-day'">
        <NuxtLink to="/app"><</NuxtLink>
        {{ route.params.day + '.Dezember' }}
      </template>
      <template v-else>Hello {{ user?.user_metadata.display_name }}</template>
    </h1>
    <div class="avatar" @click="showOffCanvas">
      {{ user?.user_metadata?.name?.slice(0, 1) ?? 'B' }}
    </div>
  </header>
  <main>
    <div class="page-content">
      <slot />
    </div>
  </main>
  <div class="off-canvas" ref="offCanvasRef">
    <AppButton @click="signOut">Abmelden</AppButton>
    <AppButton @click="deleteAccount">Account löschen</AppButton>
  </div>
</template>

<style lang="scss" scoped>
  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    padding: spacing('m');
  }

  .page-content {
    padding: 0 spacing('m');
  }

  .avatar {
    width: 48px;
    height: 48px;
    background: linear-gradient(#5c5c5c, #000);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: white;
  }

  .off-canvas {
    width: 100%;
    left: 0;
    bottom: 0;
    padding: spacing('l');
    position: fixed;
    background: white;
    border: 1px solid #cdcdcd;
    border-bottom: none;
    border-top-left-radius: spacing('m');
    border-top-right-radius: spacing('m');
    transform: translateY(100%);
  }
</style>
