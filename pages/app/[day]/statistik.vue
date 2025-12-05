<script setup lang="ts">
  import AppButton from '~/components/AppButton.vue';
  import LoadingIndicator from '~/components/LoadingIndicator.vue';
  import PuzzleStatistics from '~/components/PuzzleStatistics.vue';
  import ToggleButton from '~/components/ToggleButton.vue';
  import type { PuzzlePersistedState } from '~/types/PuzzlePersistedState';
  import type { StatisticsScope } from '~/types/StatisticsScope';

  definePageMeta({
    layout: 'app',
  });

  const route = useRoute();
  const user = useSupabaseUser();
  const { getSavegames } = useSavegames();

  const puzzleId = route.params.day as string;

  useHead({
    title: `${puzzleId}.Dezember / Statistik`,
  });

  const scope = ref<StatisticsScope>('player');

  const playerData = useState<PuzzlePersistedState[] | undefined>('app/day/statistik/player-data', undefined);
  const globalData = useState<PuzzlePersistedState[] | undefined>('app/day/statistik/global-data', undefined);

  const states = computed(() => {
    return scope.value === 'player' ? playerData.value : globalData.value;
  });

  const { status, refresh } = useAsyncData('app/day/statistik', async () => {
    if (scope.value === 'player' && playerData.value) return playerData.value;
    if (scope.value === 'global' && globalData.value) return globalData.value;

    const savegames = await getSavegames({ puzzleId, ...(scope.value === 'player' && { userId: user.value?.sub ?? '' }) });
    const states = savegames?.map((savegame) => savegame.data) ?? [];

    if (scope.value === 'global') {
      globalData.value = states;
    } else {
      playerData.value = states;
    }

    return states;
  });

  const showDelay = ref(250);
  const { showLoadingIndicator } = useLoadingIndicator(status, { showDelay });

  watch(
    () => scope.value,
    () => {
      showDelay.value = 0;
      refresh();
    }
  );

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
    <LoadingIndicator v-if="showLoadingIndicator" />
    <Transition name="slide-fade-y">
      <PuzzleStatistics v-if="!showLoadingIndicator && states" :states="states" :scope="scope" />
    </Transition>
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
</style>
