<script setup>
  import AppButton from '~/components/AppButton.vue';
  import FormkitPassword from '~/components/FormkitPassword.vue';
  import MessageBox from '~/components/MessageBox.vue';

  const supabase = useSupabaseClient();

  const submitting = ref(false);
  const email = ref('');
  const password = ref('');

  const errorMessage = ref('');

  async function handleLogin() {
    errorMessage.value = '';
    submitting.value = true;

    try {
      const { error } = await supabase.auth.signInWithPassword({ email: email.value, password: password.value });
      console.log(error);
      if (error) throw error;
      console.log('login sucessful');
      navigateTo('/app');
    } catch (error) {
      errorMessage.value = error.error_description || error.message;
    } finally {
      submitting.value = false;
    }
  }
</script>

<template>
  <div class="wrapper">
    <FormKit type="form" @submit="handleLogin">
      <div class="header">
        <h1>Wieder da?</h1>
        <p class="description">Melde dich mit deiner Mail und deinem Passwort an.</p>
      </div>
      <MessageBox v-if="errorMessage" type="error">
        {{ errorMessage }}
      </MessageBox>
      <FormKit validation="required|email" label="E-Mail" v-model="email" placeholder="Deine E-Mail" type="email" />
      <FormkitPassword v-model="password" validation="required" :include-reset-password="true" />
      <div>
        <AppButton type="submit" class="button block" :loading="submitting">Anmelden</AppButton>
      </div>
    </FormKit>
    <div class="no-account copy-medium">
      Du hast noch keinen Account?<br /><NuxtLink to="/sign-up" class="text-link">Erstell dir jetzt einen.</NuxtLink>
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
