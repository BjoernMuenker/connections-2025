<script setup lang="ts">
  const { getTitle } = useRoutes();
  const route = useRoute();

  watch(
    () => route.fullPath,
    () => {
      useHead({
        title: getTitle(),
      });
    },
    { immediate: true }
  );
</script>

<template>
  <main>
    <div class="page-content">
      <slot />
    </div>
  </main>
</template>

<style lang="scss" scoped>
  main {
    display: flex;
    justify-content: center;
    padding: spacing('xl') spacing('m');
  }

  .page-content {
    margin-top: auto;
    margin-bottom: auto;
    max-width: 400px;
    flex: 1;
  }
</style>
