<script setup lang="ts">
  import AppButton from '~/components/AppButton.vue';
  import BaseTile from '~/components/BaseTile.vue';

  const { routes } = useRoutes();
</script>

<template>
  <div>
    <BaseTile>
      <h1>Hohoho!</h1>
      <p>
        24 kleine Rätsel erwarten Dich - schaffst Du es, alle bis Weihnachten zu lösen? Melde dich an oder erstelle dir einen Account und los geht's.
      </p>
      <div class="buttons">
        <NuxtLink :to="routes.signup" v-slot="{ href, navigate }" custom>
          <AppButton tag="a" :href="href" @click="navigate">Account erstellen</AppButton>
        </NuxtLink>
        <NuxtLink :to="routes.login" v-slot="{ href, navigate }" custom>
          <AppButton tag="a" :href="href" @click="navigate" hierarchy="secondary">Anmelden</AppButton>
        </NuxtLink>
      </div>
    </BaseTile>
  </div>
</template>

<style lang="scss" scoped>
  .card {
    padding: spacing('xl');
    background: color('white');
    border-radius: spacing('m');
  }

  h1 {
    margin-bottom: spacing('m');
  }

  .buttons {
    margin-top: spacing('l');
    display: flex;
    gap: spacing('s');
    flex-direction: column;

    a {
      width: 100%;
      text-align: center;
    }
  }
</style>
