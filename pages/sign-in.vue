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
        <p class="description">Logge dich mit Mail und Passwort ein.</p>
      </div>
      <MessageBox v-if="errorMessage" type="error">
        {{ errorMessage }}
      </MessageBox>

      <div class="input-wrapper">
        <label>Email</label>
        <input class="inputField" type="email" placeholder="Your email" v-model="email" />
      </div>
      <div class="input-wrapper">
        <label>Password</label>
        <input class="inputField" type="password" placeholder="Your password" v-model="password" />
      </div>

      <div>
        <AppButton type="submit" class="button block" :loading="submitting">Anmelden</AppButton>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
  .wrapper {
    display: flex;
    justify-content: center;
    margin: 0 auto;
  }

  .header {
    margin-bottom: spacing('l');
  }

  form {
    min-width: 400px;
    padding: spacing('xl');
    border: 1px solid #949494;
    border-radius: 8px;
  }

  .input-wrapper + .input-wrapper {
    margin-top: spacing('m');
  }

  label {
    display: block;
    margin-bottom: spacing('xxs');
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
</style>
