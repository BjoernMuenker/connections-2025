<script setup lang="ts">
  import type { TutorialId } from '~/types/TutorialId';
  import AppButton from './AppButton.vue';
  import { useAppStore } from '~/store/appStore';
  import { scoreActions } from '~/content/scoreActions';
  import TutorialFirstLogin from './TutorialFirstLogin.vue';
  import TutorialFirstPuzzleLost from './TutorialFirstPuzzleLost.vue';
  import TutorialFirstPuzzleWon from './TutorialFirstPuzzleWon.vue';
  import TutorialCommunityView from './TutorialCommunityView.vue';
  import TutorialFirstMistake from './TutorialFirstMistake.vue';
  import TutorialFirstPuzzleStarted from './TutorialFirstPuzzleStarted.vue';
  import TutorialFirstGroup from './TutorialFirstGroup.vue';

  const props = defineProps<{ id: TutorialId }>();
  const store = useAppStore();

  function closeOffCanvas() {
    store.closeOffCanvas();
  }
</script>

<template>
  <TutorialFirstLogin v-if="id === 'firstLogin'" />
  <TutorialFirstPuzzleStarted v-if="id === 'firstPuzzleStarted'" />
  <TutorialCommunityView v-if="id === 'communityView'" />
  <TutorialFirstMistake v-if="id === 'firstMistake'" />
  <TutorialFirstPuzzleLost v-if="id === 'firstPuzzleLost'" />
  <TutorialFirstPuzzleWon v-if="id === 'firstPuzzleWon'" />
  <TutorialFirstGroup v-if="id === 'firstGroup'" />

  <template v-if="id === 'firstLogin'">
    <AppButton @click="closeOffCanvas">Auf geht's</AppButton>
  </template>

  <AppButton v-if="id !== 'firstLogin'" @click="closeOffCanvas">Alles klar</AppButton>
</template>

<style lang="scss" scoped>
  p + p,
  p + ul,
  ul + p {
    margin-top: spacing('m');
  }

  ul {
    padding-left: spacing('m');
  }

  button {
    margin-top: spacing('l');
    width: 100%;

    @include breakpoint('medium') {
      margin-top: spacing('xl');
      width: auto;
    }
  }
</style>
