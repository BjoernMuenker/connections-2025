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
    <FormKit type="form" @submit="createUser">
      <div class="header">
        <h1>Willkommen.</h1>
        <p class="description">Erstelle dir jetzt einen Account.</p>
      </div>
      <MessageBox v-if="errorMessage" type="error">{{ errorMessage }}</MessageBox>
      <MessageBox v-if="successMessage" type="success">{{ successMessage }}</MessageBox>
      <FormKit validation="required" label="Nutzername" v-model="email" placeholder="Dein Nutzername" type="email" />
      <FormKit validation="required|email" label="E-Mail" v-model="email" placeholder="Deine E-Mail" type="email" />
      <FormKit validation="required|user_password" name="password" label="Passwort" v-model="password" placeholder="Dein Passwort" type="text" />
      <FormKit
        validation="required|confirm:password"
        label="Passwort wiederholen"
        v-model="passwordRepeat"
        placeholder="Bestätige dein Passwort"
        type="text"
      />
      <div>
        <AppButton type="submit" class="button block">Anmelden</AppButton>
      </div>
    </FormKit>
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
