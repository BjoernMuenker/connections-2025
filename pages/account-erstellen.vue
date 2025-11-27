<script setup lang="ts">
  import AppButton from '~/components/AppButton.vue';
  import FormkitPassword from '~/components/FormkitPassword.vue';
  import MessageBox from '~/components/MessageBox.vue';

  const supabase = useSupabaseClient();
  const { routes } = useRoutes();

  const name = ref('');
  const email = ref('');
  const password = ref('');
  const passwordRepeat = ref('');

  const errorMessage = ref('');
  const successMessage = ref('');

  async function createUser(formData: { name: string; email: string; password: string; passwordRepeat: string }) {
    const { error, data } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: { data: { display_name: name.value }, emailRedirectTo: `${window.location.origin}${routes.confirmEmail}` },
    });

    if (error) {
      errorMessage.value = useAuth().getErrorMessage(error.code);
      return;
    }

    successMessage.value = 'Fast geschafft! Wir haben dir einen Bestätigungslink an deine Mailadresse geschickt.';
  }

  function resetMessages() {
    errorMessage.value = '';
    successMessage.value = '';
  }
</script>

<template>
  <div class="wrapper">
    <FormKit type="form" @submit="createUser" v-slot="{ state: { loading } }">
      <div class="header">
        <h1>Willkommen.</h1>
        <p class="description">Erstelle dir jetzt einen Account.</p>
      </div>
      <MessageBox v-if="errorMessage" type="error">{{ errorMessage }}</MessageBox>
      <MessageBox v-if="successMessage" type="success">{{ successMessage }}</MessageBox>
      <template v-if="!successMessage">
        <FormKit
          validation="required|length:2,16|trimmed|(750)unique_username"
          label="Nutzername"
          v-model="name"
          placeholder="Dein Nutzername"
          type="text"
          :disabled="loading"
        />
        <FormKit
          validation="required|email"
          label="E-Mail"
          v-model="email"
          placeholder="Deine E-Mail"
          type="email"
          autocomplete
          :disabled="loading"
        />
        <FormkitPassword
          validation="required|length:6"
          name="password"
          label="Passwort"
          v-model="password"
          placeholder="Dein Passwort"
          autocomplete="new-password"
          :disabled="loading"
        />
        <FormkitPassword
          validation="required|confirm:password"
          label="Passwort wiederholen"
          v-model="passwordRepeat"
          placeholder="Bestätige dein Passwort"
          autocomplete="new-password"
          :disabled="loading"
        />
        <AppButton type="submit" class="button block" @click="resetMessages" :disabled="loading">Account erstellen</AppButton>
      </template>
    </FormKit>
    <div class="account-exists copy-medium">Du hast schon einen Account?<br /><NuxtLink :to="routes.signIn">Melde dich jetzt an.</NuxtLink></div>
  </div>
</template>

<style lang="scss" scoped>
  .wrapper {
    width: 100%;
  }

  h1 {
    margin-bottom: spacing('xs');
  }

  .header {
    margin-bottom: spacing('l');
  }

  form {
    width: 100%;
    padding: spacing('xl');
    background: color('white');
    border-radius: spacing('m');
  }

  button {
    width: 100%;
    margin-top: spacing('l');
  }

  .message-box {
    margin-top: spacing('l');

    &.error {
      margin-bottom: spacing('l');
    }
  }

  .account-exists {
    padding: 0 spacing('xl');
    margin-top: spacing('l');
    width: 100%;
  }

  a {
    color: blue;
    text-decoration: underline;
  }
</style>
