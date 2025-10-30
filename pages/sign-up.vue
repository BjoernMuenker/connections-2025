<script setup>
  import AppButton from '~/components/AppButton.vue';

  const supabase = useSupabaseClient();

  const loading = ref(false);
  const name = ref('');
  const email = ref('');
  const password = ref('');
  const passwordRepeat = ref('');

  const createUser = async () => {
    try {
      loading.value = true;
      const response = await supabase.auth.signUp({ email: email.value, password: password.value, options: { data: { name: name.value } } });
      console.log(response);
      if (response.error) throw error;
      //   navigateTo('/app');
    } catch (error) {
      alert(error.error_description || error.message);
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
    max-width: 400px;
    padding: spacing('xl');
    border: 1px solid #949494;
    border-radius: 10px;
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
</style>
