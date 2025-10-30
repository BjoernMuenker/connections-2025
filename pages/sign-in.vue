<script setup>
  import AppButton from '~/components/AppButton.vue';
  import MessageBox from '~/components/MessageBox.vue';

  const supabase = useSupabaseClient();

  const submitting = ref(false);
  const email = ref('');
  const password = ref('');

  const errorMessage = ref('');

  const handleLogin = async () => {
    try {
      errorMessage.value = '';
      submitting.value = true;
      const { error } = await supabase.auth.signInWithPassword({ email: email.value, password: password.value });
      console.log(error);
      if (error) throw error;
      navigateTo('/app');
    } catch (error) {
      errorMessage.value = error.error_description || error.message;
    } finally {
      submitting.value = false;
    }
  };
</script>

<template>
  <div class="wrapper">
    <form @submit.prevent="handleLogin">
      <div class="header">
        <h1>Wieder da?</h1>
        <p class="description">Melde dich mit Mail und Passwort an.</p>
      </div>
      <MessageBox v-if="errorMessage" type="error">
        {{ errorMessage }}
      </MessageBox>

      <div class="input-wrapper">
        <label>E-Mail</label>
        <input class="inputField" type="email" placeholder="Deine E-Mail" v-model="email" />
      </div>
      <div class="input-wrapper">
        <label>Passwort</label>
        <input class="inputField" type="password" placeholder="Dein Passwort" v-model="password" />
      </div>
      <div>
        <AppButton type="submit" class="button block" :loading="submitting">Anmelden</AppButton>
      </div>
    </form>
    <div class="no-account">Du hast noch keinen Account?<br /><NuxtLink to="/sign-up">Erstell dir jetzt einen.</NuxtLink></div>
  </div>
</template>

<style lang="scss" scoped>
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    max-width: 400px;
  }

  .no-account {
    padding: 0 spacing('xl');
    width: 100%;
  }

  .header {
    margin-bottom: spacing('l');
  }

  form {
    width: 100%;
    padding: spacing('xl');
    border: 1px solid #949494;
    border-radius: 8px;
    margin-bottom: spacing('l');
  }

  .input-wrapper + .input-wrapper {
    margin-top: spacing('m');
  }

  label {
    display: block;
    margin-bottom: spacing('xs');
  }

  input {
    padding: 10px;
    display: block;
    width: 100%;
  }

  button {
    width: 100%;
    margin-top: spacing('l');
  }

  .message-box {
    margin: spacing('l') 0;
  }

  a {
    color: blue;
    text-decoration: underline;
  }
</style>
