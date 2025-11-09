<script setup lang="ts">
  import AppButton from '~/components/AppButton.vue';
  import FormkitPassword from '~/components/FormkitPassword.vue';
  import MessageBox from '~/components/MessageBox.vue';

  const route = useRoute();
  const router = useRouter();
  const code = route.query?.code as string;

  const { routes } = useRoutes();
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();

  const formData = ref<{ password: string; confirmPassword: string }>({ password: '', confirmPassword: '' });
  const errorMessage = ref('');
  const successMessage = ref('');

  async function resetPassword(formData: { password: string; confirmPassword: string }) {
    console.log(formData);
    errorMessage.value = '';
    successMessage.value = '';

    const { data, error } = await supabase.auth.updateUser({
      password: formData.password,
    });

    if (error) {
      errorMessage.value = error.message;
      return;
    }

    successMessage.value = 'Dein Passwort wurde erfolgreich geändert.';
  }

  onMounted(async () => {
    // if (!code) {
    //   console.error('no code');
    //   return;
    // }
    // const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    // if (error) {
    //   errorMessage.value = error.message;
    //   return;
    // }
  });
</script>

<template>
  <ClientOnly>
    <div class="wrapper">
      <template v-if="!user || !code">
        <MessageBox v-if="errorMessage" type="error">
          {{ errorMessage }}
        </MessageBox>
      </template>
      <template v-else>
        <FormKit type="form" @submit="resetPassword">
          <div class="header">
            <h1>Wähle ein neues Passwort</h1>
          </div>
          <MessageBox v-if="errorMessage" type="error">
            {{ errorMessage }}
          </MessageBox>
          <MessageBox v-if="successMessage" type="success">
            {{ successMessage }}
          </MessageBox>
          <template v-if="!successMessage">
            <FormkitPassword
              validation="required|user_password"
              name="password"
              label="Neues Passwort"
              v-model="formData.password"
              placeholder="Dein neues Passwort"
            />
            <FormkitPassword
              validation="required|confirm:password"
              name="confirmPassword"
              label="Neues Passwort wiederholen"
              v-model="formData.confirmPassword"
              placeholder="Bestätige dein neues Passwort"
            />
            <div>
              <AppButton type="submit" class="button block" :loading="false">Passwort zurücksetzen</AppButton>
            </div>
          </template>
        </FormKit>
        <div class="back-to-login"><NuxtLink :to="routes.login" class="text-link">Zurück zum Login</NuxtLink></div>
      </template>
    </div>
  </ClientOnly>
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
    border-radius: 8px;
    margin-bottom: spacing('l');
  }

  button {
    width: 100%;
    margin-top: spacing('l');
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
