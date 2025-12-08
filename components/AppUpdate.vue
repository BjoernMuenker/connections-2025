<script setup lang="ts">
  import AppButton from './AppButton.vue';

  function refresh() {
    window.location.reload();
  }
</script>

<template>
  <div class="app-update">
    <div class="copy">
      <div class="heading-large">Eine neue Version steht bereit.</div>
      <div>Bitte aktualisiere jetzt.</div>
    </div>
    <AppButton @click="refresh">Akutalisieren</AppButton>
  </div>
</template>

<style lang="scss" scoped>
  .heading-large {
    margin-bottom: spacing('xs');
  }

  .copy {
    margin-bottom: spacing('l');

    @include breakpoint('large') {
      margin-bottom: spacing('xl');
    }
  }
</style>
