<script setup lang="ts">
  import AppButton from '~/components/AppButton.vue';
  import Puzzle from '~/components/Puzzle.vue';
  import { puzzles } from '~/content/puzzles';

  const user = useSupabaseUser();
  const client = useSupabaseClient();
  const route = useRoute();
  const router = useRouter();

  const { $gsap } = useNuxtApp();

  const puzzleId = route.params.day as string;

  // await client.from('savegames').select('*').eq('user', user.value!.id).order('created_at');

  definePageMeta({
    layout: 'app',
  });
</script>

<template>
  <!-- <pre>
      {{ user }}
  </pre> -->

  <!-- loaded savegames: {{ data }}
  <AppButton @click="saveGame">save game</AppButton>
  <div>{{ puzzleId }}</div> -->
  <Puzzle :puzzle-id="puzzleId" />
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
