<script setup lang="ts">
  import AppButton from '~/components/AppButton.vue';
  import Leaderboard from '~/components/Leaderboard.vue';
  import UserScore from '~/components/UserScore.vue';
  import { puzzles } from '~/content/puzzles';
  import { useAppStore } from '~/store/appStore';

  const store = useAppStore();
  const user = useSupabaseUser();
  const { $gsap } = useNuxtApp();
  const { getServerTime } = useServerTime();
  const { getScores } = useStats();
  const router = useRouter();

  definePageMeta({
    layout: 'app',
  });

  useHead({
    title: 'Bestenliste',
  });

  const { data: scores } = useAsyncData('scores', () => getScores());
</script>

<template>
  <div class="wrapper">
    <Leaderboard v-if="scores" :scores="scores" />
  </div>
</template>

<style lang="scss" scoped></style>
