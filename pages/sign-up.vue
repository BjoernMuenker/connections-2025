<script setup>
  import AppButton from '~/components/AppButton.vue';
  import MessageBox from '~/components/MessageBox.vue';

  const supabase = useSupabaseClient();

  const loading = ref(false);
  const name = ref('');
  const email = ref('');
  const password = ref('');
  const passwordRepeat = ref('');

  const errorMessage = ref('');
  const successMessage = ref('');

  const createUser = async () => {
    try {
      errorMessage.value = '';
      successMessage.value = '';
      loading.value = true;
      const response = await supabase.auth.signUp({ email: email.value, password: password.value, options: { data: { display_name: name.value } } });
      console.log(response);
      if (response.error) throw response.error;

      successMessage.value = 'Fast geschafft! Wir haben dir einen Bestätigungslink an deine Mailadresse geschickt.';
    } catch (error) {
      errorMessage.value = error.error_description || error.message;
    } finally {
      loading.value = false;
    }
  };
</script>

<template>
  <div class="wrapper">
    <form @submit.prevent="createUser">
      <div class="header">
        <h1>Willkommen.</h1>
        <p class="description">Erstelle dir jetzt einen Account.</p>
      </div>
      <MessageBox v-if="errorMessage" type="error">{{ errorMessage }}</MessageBox>
      <MessageBox v-if="successMessage" type="success">{{ successMessage }}</MessageBox>
      <div class="input-wrapper">
        <label>Name</label>
        <input class="inputField" type="text" placeholder="Dein Nutzername" v-model="name" />
      </div>
      <div class="input-wrapper">
        <label>Email</label>
        <input class="inputField" type="email" placeholder="Deine E-Mail" v-model="email" />
      </div>
      <div class="input-wrapper">
        <label>Password</label>
        <input class="inputField" type="password" placeholder="Dein Passwort" v-model="password" />
      </div>
      <div class="input-wrapper">
        <label>Passwort wiederholen</label>
        <input class="inputField" type="password" placeholder="Bestätige dein Passwort" v-model="passwordRepeat" />
      </div>
      <div>
        <AppButton type="submit" class="button block">Anmelden</AppButton>
      </div>
    </form>
    <div class="account-exists">Du hast schon einen Account?<br /><NuxtLink to="/sign-in">Melde dich jetzt an.</NuxtLink></div>
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

  .header {
    margin-bottom: spacing('l');
  }

  form {
    width: 100%;
    padding: spacing('xl');
    border: 1px solid #949494;
    border-radius: 10px;
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
