<script setup lang="ts">
  import ToggleButton from '~/components/ToggleButton.vue';
  import UserStatistics from '~/components/UserStatistics.vue';
  import type { PuzzlePersistedState } from '~/types/PuzzlePersistedState';

  const user = useSupabaseUser();
  const { getSavegames } = useSavegames();
  const { getScore, getGlobalScore } = useStats();

  definePageMeta({
    layout: 'app',
  });

  const scope = ref<'player' | 'global'>('player');

  let playerData: { states: PuzzlePersistedState[]; scores: { score: number; rank?: number; totalRanks: number; badge?: string } };
  let globalData: { states: PuzzlePersistedState[]; scores: { score: number; rank?: number; totalRanks: number; badge?: string } };

  const { data, refresh } = useAsyncData('data', async () => {
    if (scope.value === 'player' && playerData) return playerData;
    if (scope.value === 'global' && globalData) return globalData;

    const [savegames, scores] = await Promise.all([
      getSavegames({ ...(scope.value === 'player' && { userId: user.value?.sub ?? '' }) }),
      scope.value === 'player' ? getScore(user.value?.user_metadata.display_name ?? '') : getGlobalScore(),
    ]);

    const states = savegames?.map((savegame) => savegame.data) ?? [];

    if (scores) {
      if (scope.value === 'player') {
        playerData = { states, scores };
      } else {
        globalData = { states, scores };
      }
    }

    return { states, scores };
  });

  watch(
    () => scope.value,
    () => {
      refresh();
    }
  );
</script>

<template>
  <div>
    <ToggleButton
      v-model="scope"
      :items="[
        { data: 'player', caption: 'Du' },
        { data: 'global', caption: 'Global' },
      ]"
    />
    <div class="wrapper">
      <UserStatistics v-if="data" :states="data.states" :score="data.scores" :scope="scope" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .toggle-button {
    margin-bottom: spacing('xl');
  }

  .user-progress {
    margin-bottom: spacing('xl');
  }
</style>
