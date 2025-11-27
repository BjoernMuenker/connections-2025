<script setup lang="ts">
  import AppButton from '~/components/AppButton.vue';
  import MessageBox from '~/components/MessageBox.vue';
  import { reset } from '@formkit/core';
  import BaseTile from '~/components/BaseTile.vue';

  const { routes } = useRoutes();
  const supabase = useSupabaseClient();

  const formData = ref({ email: '' });
  const errorMessage = ref('');
  const successMessage = ref('');

  async function resetPassword(formData: { email: string }) {
    errorMessage.value = '';
    successMessage.value = '';

    const { data, error } = await supabase.auth.resetPasswordForEmail(formData.email, {
      redirectTo: `${window.location.origin}${routes.changePassword}`,
    });

    if (error) {
      errorMessage.value = useAuth().getErrorMessage(error.code);
      return;
    }

    successMessage.value = 'Wir haben dir eine E-Mail zum Zurücksetzen deines Passworts geschickt.';
    reset('form');
  }
</script>

<template>
  <div>
    <BaseTile>
      <FormKit type="form" @submit="resetPassword" id="form" v-slot="{ state: { loading } }">
        <div class="header">
          <h1>Passiert den Besten.</h1>
          <p class="description">Du bekommst eine E-Mail, um dein Passwort zurückzusetzen.</p>
        </div>
        <MessageBox v-if="errorMessage" type="error">
          {{ errorMessage }}
        </MessageBox>
        <MessageBox v-if="successMessage" type="success">
          {{ successMessage }}
        </MessageBox>
        <template v-if="!successMessage">
          <FormKit
            validation="required|email"
            label="E-Mail"
            name="email"
            v-model="formData.email"
            placeholder="Deine E-Mail"
            type="email"
            :disabled="loading"
          />
          <AppButton type="submit" :loading="loading">Passwort zurücksetzen</AppButton>
        </template>
      </FormKit>
    </BaseTile>
    <div class="back-to-login copy-medium"><NuxtLink :to="routes.signIn" class="text-link">Zurück zum Login</NuxtLink></div>
  </div>
</template>

<style lang="scss" scoped>
  h1 {
    margin-bottom: spacing('xs');
  }

  .header {
    margin-bottom: spacing('l');
  }

  form {
    width: 100%;
    background: color('white');
  }

  button {
    margin-top: spacing('l');
    width: 100%;
  }

  .message-box.error {
    margin-bottom: spacing('l');
  }

  .back-to-login {
    padding: 0 spacing('xl');
    width: 100%;
    margin-top: spacing('l');
  }
</style>
