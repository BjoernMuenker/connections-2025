<script setup lang="ts">
  import ToggleButton from '~/components/ToggleButton.vue';
  import UserProgress from '~/components/UserProgress.vue';
  import UserStatistics from '~/components/UserStatistics.vue';

  const user = useSupabaseUser();
  const { getSavegames } = useSavegames();
  const { getPlayerStats } = useStats();

  definePageMeta({
    layout: 'app',
  });

  useHead({
    title: 'Statistik',
  });

  const scope = ref('du');

  const { data: savegames } = useAsyncData('savegames', () => getSavegames({ ...(scope.value === 'du' && { userId: user.value?.sub ?? '' }) }));
  const { data: scores } = useAsyncData('profiles', () => getPlayerStats(user.value?.sub ?? ''));
</script>

<template>
  <div>
    <ToggleButton
      v-model="scope"
      :items="[
        { data: 'du', caption: 'Du' },
        { data: 'global', caption: 'Global' },
      ]"
    />
    <div class="wrapper">
      <UserStatistics v-if="savegames && scores" :states="savegames.map((savegame) => savegame.data)" :score="scores" />
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
