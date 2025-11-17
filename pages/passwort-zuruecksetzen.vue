<script setup lang="ts">
  import AppButton from '~/components/AppButton.vue';
  import MessageBox from '~/components/MessageBox.vue';
  import { reset } from '@formkit/core';

  const { routes } = useRoutes();
  const supabase = useSupabaseClient();

  const formData = ref({ email: '' });
  const errorMessage = ref('');
  const successMessage = ref('');
  const submitting = ref(false);

  async function resetPassword(formData: { email: string }) {
    errorMessage.value = '';
    successMessage.value = '';
    submitting.value = true;

    const { data, error } = await supabase.auth.resetPasswordForEmail(formData.email, {
      redirectTo: `${window.location.origin}${routes.changePassword}`,
    });

    submitting.value = false;

    if (error) {
      errorMessage.value = error.message;
      return;
    }

    successMessage.value = 'Wir haben dir eine E-Mail zum Zurücksetzen deines Passworts geschickt.';
    reset('form');
  }
</script>

<template>
  <div class="wrapper">
    <FormKit type="form" @submit="resetPassword" id="form" #default="slotProps">
      <div class="header">
        <h1>Passiert den Besten.</h1>
        <p class="description">Wir senden dir eine Mail, um dein Passwort zurückzusetzen.</p>
      </div>
      <MessageBox v-if="errorMessage" type="error">
        {{ errorMessage }}
      </MessageBox>
      <MessageBox v-if="successMessage" type="success">
        {{ successMessage }}
      </MessageBox>
      <FormKit
        validation="required|email"
        label="E-Mail"
        name="email"
        v-model="formData.email"
        placeholder="Deine E-Mail"
        type="email"
        :disabled="submitting"
      />
      <AppButton type="submit" :loading="submitting">Passwort zurücksetzen</AppButton>
    </FormKit>
    <div class="back-to-login"><NuxtLink :to="routes.login" class="text-link">Zurück zum Login</NuxtLink></div>
  </div>
</template>

<style lang="scss" scoped>
  .header {
    margin-bottom: spacing('l');
  }

  form {
    width: 100%;
    padding: spacing('xl');
    background: color('white');
    border-radius: spacing('m');
    margin-bottom: spacing('l');
    margin-bottom: spacing('l');
  }

  button {
    margin-top: spacing('l');
    width: 100%;
  }

  .message-box {
    margin: spacing('l') 0;
  }

  .back-to-login {
    padding: 0 spacing('xl');
    width: 100%;
    font-size: 16px;
  }
</style>
