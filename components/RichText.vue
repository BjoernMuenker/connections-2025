<template>
  <div class="rich-text">
    <div class="slot">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  :deep(.slot) {
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
