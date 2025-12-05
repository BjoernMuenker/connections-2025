<script setup lang="ts">
  import AppButton from '~/components/AppButton.vue';
  import LoadingIndicator from '~/components/LoadingIndicator.vue';
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

  const fetchedData = computed(() => {
    return scope.value === 'player' ? playerData.value : globalData.value;
  });

  const playerData = useState<
    { states: PuzzlePersistedState[]; scores: { score: number; rank?: number; totalRanks: number; badge?: string } } | undefined
  >('app/statistik/player-data', undefined);

  const globalData = useState<
    { states: PuzzlePersistedState[]; scores: { score: number; rank?: number; totalRanks: number; badge?: string } } | undefined
  >('app/statistik/global-data', undefined);

  const { data, status, refresh } = useAsyncData('app/statistik', async () => {
    if (scope.value === 'player' && playerData.value) return playerData.value;
    if (scope.value === 'global' && globalData.value) return globalData.value;

    const [savegames, scores] = await Promise.all([
      getSavegames({ ...(scope.value === 'player' && { userId: user.value?.sub ?? '' }) }),
      scope.value === 'player' ? getScore(user.value?.user_metadata.display_name ?? '') : getGlobalScore(),
    ]);

    const states = savegames?.map((savegame) => savegame.data) ?? [];

    if (scores) {
      if (scope.value === 'player') {
        playerData.value = { states, scores };
      } else {
        globalData.value = { states, scores };
      }
    }

    return { states, scores };
  });

  watch(
    () => scope.value,
    () => {
      showDelay.value = 0;
      refresh();
    }
  );

  const showDelay = ref(250);
  const { showLoadingIndicator } = useLoadingIndicator(status, { showDelay });

  function resetCache() {
    playerData.value = undefined;
    globalData.value = undefined;
  }

  function forceRefresh() {
    showDelay.value = 0;
    resetCache();
    refresh();
  }

  useDocumentVisibility(() => {
    forceRefresh();
  });

  onBeforeUnmount(() => {
    resetCache();
  });
</script>

<template>
  <div>
    <div class="header">
      <ToggleButton
        v-model="scope"
        :items="[
          { data: 'player', caption: 'Du' },
          { data: 'global', caption: 'Global' },
        ]"
        :disabled="showLoadingIndicator"
      />
      <AppButton hierarchy="secondary" size="small" :disabled="showLoadingIndicator" @click="forceRefresh">Aktualisieren</AppButton>
    </div>
    <div class="wrapper">
      <LoadingIndicator v-if="showLoadingIndicator" />
      <Transition name="slide-fade-y">
        <UserStatistics
          v-if="!showLoadingIndicator && fetchedData && fetchedData.states"
          :states="fetchedData!.states"
          :score="fetchedData!.scores"
          :scope="scope"
        />
      </Transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: spacing('l');
  }

  .loading-indicator {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .user-progress {
    margin-bottom: spacing('xl');
  }
</style>
