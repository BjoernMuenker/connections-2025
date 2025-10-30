<script setup lang="ts">
  import AppButton from '~/components/AppButton.vue';
  import { puzzles } from '~/content/puzzles';
  import { onClickOutside } from '@vueuse/core';

  const user = useSupabaseUser();
  const supabase = useSupabaseClient();

  const { $gsap } = useNuxtApp();

  definePageMeta({
    layout: 'app',
  });

  async function signOut() {
    await supabase.auth.signOut();
    navigateTo('/');
  }

  const offCanvasVisible = ref(false);

  function showOffCanvas() {
    offCanvasVisible.value = true;
    $gsap.to('.off-canvas', { translateY: 0, duration: 0.3 });
    $gsap.to('.wrapper', { scale: 0.9, duration: 0.3 });
  }

  function hideOffCanvas() {
    offCanvasVisible.value = false;
    console.log('hello');
    $gsap.to('.off-canvas', { translateY: '100%', duration: 0.3 });
    $gsap.to('.wrapper', { scale: 1, duration: 0.3 });
  }

  const offCanvasRef = ref<HTMLElement>();

  onMounted(() => {
    onClickOutside(offCanvasRef.value, hideOffCanvas);
  });
</script>

<template>
  <div class="wrapper" :class="{ 'off-canvas-visible': offCanvasVisible }">
    <header class="header">
      <h1>Hi, {{ user?.user_metadata.name ?? 'User' }}</h1>
      <div class="avatar" @click="showOffCanvas">
        {{ user?.user_metadata.name.slice(0, 1) ?? 'B' }}
      </div>
    </header>
    <div class="puzzles">
      <div v-for="puzzle in puzzles">
        <div class="puzzle">{{ puzzle.id }}</div>
      </div>
    </div>
    <div class="stats">
      <div class="heading-medium">Dein Fortschritt</div>
    </div>
    <pre>
    {{ user }}
  </pre
    >
  </div>
  <div class="off-canvas" ref="offCanvasRef">
    <AppButton @click="signOut">Abmelden</AppButton>
  </div>
</template>

<style lang="scss" scoped>
  .wrapper.off-canvas-visible::after {
    content: '';
    position: absolute;
    width: 500%;
    height: 500%;
    left: -50%;
    top: -50%;
    background: rgba(0, 0, 0, 0.8);
  }

  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .avatar {
    width: 48px;
    height: 48px;
    background: linear-gradient(#454545, #000);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: white;
  }

  .puzzles {
    display: flex;
  }

  .puzzle {
    width: 200px;
    height: 200px;
    background: #cdcdcd;
    margin: 0 20px;
    border-radius: spacing('s');
    padding: spacing('l');
    font-size: 50px;
  }

  .stats {
    margin-top: spacing('xl');
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
