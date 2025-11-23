<script setup lang="ts">
  import { useAppStore } from '~/store/appStore';
  import AppButton from './AppButton.vue';
  import BaseTile from './BaseTile.vue';

  const store = useAppStore();
  const { routes } = useRoutes();
  const submitting = ref(false);

  definePageMeta({
    layout: 'app',
  });

  useHead({
    title: 'Account löschen',
  });

  async function deleteAccount() {
    submitting.value = true;

    const result = await $fetch<boolean>('/api/delete-user', {
      method: 'POST',
    });

    if (!result) {
      store.pushToastNotification('Dein Account konnte nicht gelöscht werden.');
      submitting.value = false;
      return;
    }

    navigateTo(routes.home);
  }
</script>

<template>
  <div class="delete-account">
    <BaseTile>
      <h1 class="heading-xlarge">Bist du ganz sicher?</h1>
      <p>Wenn du deinen Account löscht, geht sämtlicher gespeicherter Fortschritt verloren.</p>
      <p>Diese Handlung lässt sich nicht rückgängig machen und du wirst automatisch ausgeloggt.</p>
      <div class="actions">
        <NuxtLink :to="routes.app" v-slot="{ href, navigate }" custom>
          <AppButton tag="a" :href="href" hierarchy="secondary" :disabled="submitting" @click="navigate">Abbrechen</AppButton>
        </NuxtLink>
        <AppButton color="red" @click="deleteAccount" :disabled="submitting">Ja, Account löschen</AppButton>
      </div>
    </BaseTile>
  </div>
</template>

<style lang="scss" scoped>
  h1 {
    margin-bottom: spacing('xs');
  }

  p {
    & + p {
      margin-top: spacing('xs');
    }
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: spacing('s');
    margin-top: spacing('l');

    a,
    button {
      flex: 1;
    }
  }
</style>
