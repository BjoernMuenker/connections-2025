<script setup lang="ts">
  import BaseTile from '~/components/BaseTile.vue';
  import TutorialCommunityView from '~/components/TutorialCommunityView.vue';
  import TutorialFirstGroup from '~/components/TutorialFirstGroup.vue';
  import TutorialFirstMistake from '~/components/TutorialFirstMistake.vue';
  import TutorialFirstPuzzleLost from '~/components/TutorialFirstPuzzleLost.vue';
  import TutorialFirstPuzzleStarted from '~/components/TutorialFirstPuzzleStarted.vue';
  import TutorialFirstPuzzleWon from '~/components/TutorialFirstPuzzleWon.vue';

  definePageMeta({
    layout: 'app',
  });
</script>

<template>
  <div class="wrapper">
    <div class="section">
      <div class="heading-large">Die Grundregeln</div>
      <BaseTile padding="small">
        <TutorialFirstPuzzleStarted />
      </BaseTile>
    </div>
    <div class="section">
      <div class="heading-large">Die 4 Farben</div>
      <BaseTile padding="small">
        <TutorialFirstGroup />
      </BaseTile>
    </div>
    <div class="section">
      <div class="heading-large">Fehler machen</div>
      <BaseTile padding="small">
        <TutorialFirstMistake />
      </BaseTile>
    </div>
    <div class="section">
      <div class="heading-large">Die Community-Sicht</div>
      <BaseTile padding="small">
        <TutorialCommunityView />
      </BaseTile>
    </div>
    <div class="section">
      <div class="heading-large">Gewinnen</div>
      <BaseTile padding="small">
        <TutorialFirstPuzzleWon />
      </BaseTile>
    </div>
    <div class="section">
      <div class="heading-large">Verlieren</div>
      <BaseTile padding="small">
        <TutorialFirstPuzzleLost />
      </BaseTile>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .section + .section {
    margin-top: spacing('xl');
  }

  .heading-large {
    margin-bottom: spacing('s');

    @include breakpoint('medium') {
      margin-bottom: spacing('m');
    }
  }

  :deep(.base-tile) {
    p + p,
    p + ul,
    ul + p {
      margin-top: spacing('m');
    }

    ul {
      padding-left: spacing('m');
    }
  }
</style>
