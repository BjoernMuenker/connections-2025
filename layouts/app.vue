<template>
  <div class="page-wrapper">
    <div class="page-content">
      <slot />
    </div>
    <!-- <nav class="navbar">
      <div>Home</div>
      <div>Play</div>
      <div>Stats</div>
    </nav> -->
  </div>
</template>

<style lang="scss" scoped>
  .page-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .page-content {
    margin: spacing('m');
  }
</style>
