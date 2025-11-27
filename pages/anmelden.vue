<script setup lang="ts">
  import AppButton from '~/components/AppButton.vue';
  import FormkitPassword from '~/components/FormkitPassword.vue';
  import MessageBox from '~/components/MessageBox.vue';

  const supabase = useSupabaseClient();
  const user = useSupabaseUser();
  const { routes } = useRoutes();

  const email = ref('');
  const password = ref('');

  const errorMessage = ref('');
  const redirecting = ref(false);

  // dangerous... do it as a one time watcher instead?
  // watch(
  //   () => user.value,
  //   (value) => {
  //     if (!value) return;
  //     navigateTo('/app');
  //   },
  //   { immediate: true }
  // );

  async function handleLogin() {
    errorMessage.value = '';

    try {
      const { error } = await supabase.auth.signInWithPassword({ email: email.value, password: password.value });
      if (error) throw error;
      redirecting.value = true;
      await sleep(100);
      navigateTo(routes.app);
    } catch (error: any) {
      errorMessage.value = useAuth().getErrorMessage(error.code);
    }
  }
</script>

<template>
  <div class="wrapper">
    <FormKit type="form" @submit="handleLogin" v-slot="{ state: { loading } }">
      <div class="header">
        <h1>Wieder da?</h1>
        <p class="description">Melde dich mit deiner Mail und deinem Passwort an.</p>
      </div>
      <MessageBox v-if="errorMessage" type="error">
        {{ errorMessage }}
      </MessageBox>
      <FormKit
        validation="required|email"
        label="E-Mail"
        v-model="email"
        placeholder="Deine E-Mail"
        type="email"
        autocomplete
        :disabled="loading || redirecting"
      />
      <FormkitPassword
        v-model="password"
        validation="required"
        :include-reset-password="true"
        autocomplete="current-password"
        :disabled="loading || redirecting"
      />
      <AppButton type="submit" class="button block" :loading="loading || redirecting">Anmelden</AppButton>
    </FormKit>
    <div class="no-account copy-medium">
      Du hast noch keinen Account?<br /><NuxtLink :to="routes.signUp" class="text-link">Erstell dir jetzt einen.</NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .no-account {
    padding: 0 spacing('xl');
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
    margin-bottom: spacing('l');
  }

  button {
    width: 100%;
    margin-top: spacing('l');
  }

  .message-box {
    margin: spacing('l') 0;
  }
</style>
