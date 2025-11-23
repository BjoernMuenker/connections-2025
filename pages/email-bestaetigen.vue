<script setup lang="ts">
  import AppButton from '~/components/AppButton.vue';
  import BaseTile from '~/components/BaseTile.vue';

  const { routes } = useRoutes();
</script>

<template>
  <div>
    <BaseTile>
      <h1>Schon fertig!</h1>
      <p>Du hast deine E-Mail-Adresse erfolgreich bestätigt.</p>
      <NuxtLink :to="routes.app" v-slot="{ href, navigate }" custom>
        <AppButton tag="a" :href="href" @click="navigate">Los geht's</AppButton>
      </NuxtLink>
    </BaseTile>
  </div>
</template>

<style lang="scss" scoped>
  h1 {
    margin-bottom: spacing('xs');
  }

  p {
    margin-bottom: spacing('l');
  }

  a {
    width: 100%;
    text-align: center;
  }
</style>
