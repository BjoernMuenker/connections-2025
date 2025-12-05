<script setup lang="ts">
  import LoadingIndicator from '~/components/LoadingIndicator.vue';
  import UserScoreBreakdown from '~/components/UserScoreBreakdown.vue';

  definePageMeta({
    layout: 'app',
  });

  const { getSavegames } = useSavegames();
  const user = useSupabaseUser();

  const { data: savegames, status, refresh } = useAsyncData('app/score', () => getSavegames({ userId: user.value?.sub ?? '' }));
  const states = computed(() => (savegames.value ?? []).map((savegame) => savegame.data));

  const showDelay = ref(250);

  function forceRefresh() {
    showDelay.value = 0;
    refresh();
  }

  const { showLoadingIndicator } = useLoadingIndicator(status, { showDelay });

  useDocumentVisibility(() => forceRefresh());
</script>

<template>
  <div>
    <LoadingIndicator v-if="showLoadingIndicator" />
    <Transition name="slide-fade-y">
      <UserScoreBreakdown v-if="!showLoadingIndicator && states" :states="states" scope="player" />
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
  .loading-indicator {
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
  }
</style>
