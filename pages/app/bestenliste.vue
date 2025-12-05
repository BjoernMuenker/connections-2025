<script setup lang="ts">
  import AppButton from '~/components/AppButton.vue';
  import Leaderboard from '~/components/Leaderboard.vue';
  import LoadingIndicator from '~/components/LoadingIndicator.vue';

  const { getScores } = useStats();

  definePageMeta({
    layout: 'app',
  });

  const { data: scores, status, refresh } = useAsyncData('app/bestenliste', () => getScores());

  const showDelay = ref(250);
  const { showLoadingIndicator, formattedTimestamp } = useLoadingIndicator(status, { showDelay });

  function forceRefresh() {
    showDelay.value = 0;
    refresh();
  }

  useDocumentVisibility(() => {
    forceRefresh();
  });
</script>

<template>
  <div class="wrapper">
    <div class="controls">
      <div>
        <ClientOnly>
          Stand: <br />
          <strong>{{ formattedTimestamp }}</strong>
        </ClientOnly>
      </div>
      <AppButton hierarchy="secondary" size="small" :disabled="showLoadingIndicator" @click="forceRefresh">Aktualisieren</AppButton>
    </div>
    <LoadingIndicator v-if="showLoadingIndicator" />
    <Transition name="slide-fade-y">
      <Leaderboard v-if="!showLoadingIndicator && scores" :scores="scores" />
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
  .controls {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: spacing('m');
    margin-bottom: spacing('l');
  }

  .loading-indicator {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
