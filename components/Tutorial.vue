<script setup lang="ts">
  import type { TutorialId } from '~/types/TutorialId';
  import AppButton from './AppButton.vue';
  import { useAppStore } from '~/store/appStore';
  import TutorialCommunityView from './TutorialCommunityView.vue';
  import TutorialFirstGroup from './TutorialFirstGroup.vue';
  import TutorialFirstLogin from './TutorialFirstLogin.vue';
  import TutorialFirstMistake from './TutorialFirstMistake.vue';
  import TutorialFirstPuzzleLost from './TutorialFirstPuzzleLost.vue';
  import TutorialFirstPuzzleStarted from './TutorialFirstPuzzleStarted.vue';
  import TutorialFirstPuzzleWon from './TutorialFirstPuzzleWon.vue';
  import TutorialLastPuzzleCompleted from './TutorialLastPuzzleCompleted.vue';

  const props = defineProps<{ id: TutorialId }>();
  const store = useAppStore();

  function closeOffCanvas() {
    store.closeOffCanvas();
  }
</script>

<template>
  <div class="wrapper">
    <TutorialCommunityView v-if="id === 'communityView'" />
    <TutorialFirstGroup v-if="id === 'firstGroup'" />
    <TutorialFirstLogin v-if="id === 'firstLogin'" />
    <TutorialFirstMistake v-if="id === 'firstMistake'" />
    <TutorialFirstPuzzleLost v-if="id === 'firstPuzzleLost'" />
    <TutorialFirstPuzzleStarted v-if="id === 'firstPuzzleStarted'" />
    <TutorialFirstPuzzleWon v-if="id === 'firstPuzzleWon'" />
    <TutorialLastPuzzleCompleted v-if="id === 'lastPuzzleCompleted'" />

    <template v-if="id === 'firstLogin'">
      <AppButton @click="closeOffCanvas">Auf geht's</AppButton>
    </template>

    <AppButton v-if="id !== 'firstLogin'" @click="closeOffCanvas">Alles klar</AppButton>
  </div>
</template>

<style lang="scss" scoped>
  button {
    margin-top: spacing('l');
    width: 100%;

    @include breakpoint('medium') {
      margin-top: spacing('xl');
      width: auto;
    }
  }
</style>
