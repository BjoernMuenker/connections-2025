<script setup lang="ts">
  import ToggleButton from '~/components/ToggleButton.vue';
  import UserStatistics from '~/components/UserStatistics.vue';

  const user = useSupabaseUser();
  const { getSavegames } = useSavegames();
  const { getScore, getGlobalScore } = useStats();

  definePageMeta({
    layout: 'app',
  });

  const scope = ref<'player' | 'global'>('player');

  const { data: savegames, refresh: refreshSavegames } = useAsyncData('savegames', () =>
    getSavegames({ ...(scope.value === 'player' && { userId: user.value?.sub ?? '' }) })
  );

  const { data: scores, refresh: refreshScores } = useAsyncData('profiles', () => {
    return scope.value === 'player' ? getScore(user.value?.sub ?? '') : getGlobalScore();
  });

  watch(
    () => scope.value,
    () => {
      refreshSavegames();
      refreshScores();
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
      <UserStatistics v-if="savegames && scores" :states="savegames.map((savegame) => savegame.data)" :score="scores" :scope="scope" />
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
