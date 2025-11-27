<script setup lang="ts">
  import AppButton from '~/components/AppButton.vue';
  import BaseTile from '~/components/BaseTile.vue';
  import FormkitPassword from '~/components/FormkitPassword.vue';
  import MessageBox from '~/components/MessageBox.vue';

  const route = useRoute();
  const code = route.query?.code as string;

  const { isAppRoute, routes } = useRoutes();
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
      errorMessage.value = useAuth().getErrorMessage(error.code);
      return;
    }

    successMessage.value = 'Dein Passwort wurde erfolgreich geändert.';
  }

  onMounted(() => {
    if (!code && !route.path.startsWith('/app')) {
      errorMessage.value = 'Sicherheits-Code ungültig oder abgelaufen.';
      return;
    }
  });
</script>

<template>
  <div class="change-password">
    <BaseTile>
      <div class="header">
        <h1 class="heading-xlarge">Wähle ein neues Passwort</h1>
      </div>
      <template v-if="!user || (!code && !isAppRoute(route.path))">
        <MessageBox v-if="errorMessage" type="error">
          {{ errorMessage }}
        </MessageBox>
      </template>
      <template v-else>
        <FormKit type="form" @submit="resetPassword" v-slot="{ state: { loading } }">
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
              autocomplete="new-password"
              :disabled="loading"
            />
            <FormkitPassword
              validation="required|confirm:password"
              name="confirmPassword"
              label="Neues Passwort wiederholen"
              v-model="formData.confirmPassword"
              placeholder="Bestätige dein neues Passwort"
              autocomplete="new-password"
              :disabled="loading"
            />
            <AppButton type="submit" class="button block" :loading="loading">Passwort ändern</AppButton>
          </template>
        </FormKit>
      </template>
    </BaseTile>
    <div v-if="!isAppRoute(route.path)" class="back-to-login">
      <NuxtLink :to="routes.signIn" class="text-link">Zurück zum Login</NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .header {
    margin-bottom: spacing('l');
  }

  button {
    width: 100%;
    margin-top: spacing('l');
  }

  .message-box {
    margin-top: spacing('l');
  }

  form .message-box:not(.success) {
    margin-bottom: spacing('l');
  }

  .back-to-login {
    padding: 0 spacing('xl');
    margin-top: spacing('l');
  }
</style>
