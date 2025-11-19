<script setup lang="ts">
  import PuzzleStatistics from '~/components/PuzzleStatistics.vue';

  definePageMeta({
    layout: 'app',
  });

  const route = useRoute();
  const user = useSupabaseUser();
  const { getScoreFromSavegame } = usePuzzle();
  const { getSavegames } = useSavegames();
  const puzzleId = route.params.day as string;

  const { data: savegame } = useAsyncData('savegame', () => getSavegames({ userId: user.value?.sub ?? '', puzzleId }), {
    transform: (result) => (result ? result[0] : undefined),
  });
</script>

<template>
  <div>
    <PuzzleStatistics v-if="savegame" :state="savegame.data" />
  </div>
</template>
