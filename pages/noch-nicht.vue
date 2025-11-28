<script setup lang="ts">
  import AppButton from '~/components/AppButton.vue';
  import BaseTile from '~/components/BaseTile.vue';

  const { routes } = useRoutes();
</script>

<template>
  <div>
    <BaseTile>
      <h1>Noch nicht.</h1>
      <p>Accounts können erst ab dem 1.Dezember erstellt werden. Vorher geht schließlich das erste Türchen nicht auf.</p>
      <NuxtLink :to="routes.home" v-slot="{ href, navigate }" custom>
        <AppButton tag="a" :href="href" @click="navigate">Na gut</AppButton>
      </NuxtLink>
    </BaseTile>
  </div>
</template>

<style lang="scss" scoped>
  h1 {
    margin-bottom: spacing('m');
  }

  a {
    margin-top: spacing('l');
    width: 100%;
    text-align: center;
  }
</style>
