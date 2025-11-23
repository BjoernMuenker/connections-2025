<script setup lang="ts">
  import AppButton from '~/components/AppButton.vue';
  import BaseTile from '~/components/BaseTile.vue';
  import MessageBox from '~/components/MessageBox.vue';
  import { errorMessages } from '~/content/errorMessages';
  import type { ErrorCode } from '~/types/ErrorCode';

  const { routes } = useRoutes();
  const route = useRoute();
  const errorCode = computed(() => route.query.error_code as ErrorCode);
  const errorMessage = computed(() => errorMessages[errorCode.value]);
</script>

<template>
  <div>
    <BaseTile>
      <h1>{{ errorMessage ? 'Hoppla.' : 'Schon fertig!' }}</h1>
      <MessageBox v-if="errorMessage" type="error">
        {{ errorMessage }}
      </MessageBox>
      <template v-if="!errorMessage">
        <p>Du hast deine E-Mail-Adresse erfolgreich bestätigt.</p>
        <NuxtLink :to="routes.app" v-slot="{ href, navigate }" custom>
          <AppButton tag="a" :href="href" @click="navigate">Los geht's</AppButton>
        </NuxtLink>
      </template>
    </BaseTile>
  </div>
</template>

<style lang="scss" scoped>
  h1 {
    margin-bottom: spacing('xs');
  }

  .message-box {
    margin-top: spacing('l');
  }

  p {
    margin-bottom: spacing('l');
  }

  a {
    width: 100%;
    text-align: center;
  }
</style>
