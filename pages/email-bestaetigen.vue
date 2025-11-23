<script setup lang="ts">
  import AppButton from '~/components/AppButton.vue';
  import BaseTile from '~/components/BaseTile.vue';

  const { routes } = useRoutes();

  onMounted(() => {
    console.log('e-mail bestaetigen...');
  });
</script>

<template>
  <div>
    <BaseTile>
      <h1>Schon fertig!</h1>
      <div>Du hast deine E-Mail-Adresse erfolgreich bestätigt.</div>
      <NuxtLink :to="routes.app" v-slot="{ href, navigate }" custom>
        <AppButton tag="a" :href="href" @click="navigate">Los geht's</AppButton>
      </NuxtLink>
    </BaseTile>
  </div>
</template>
