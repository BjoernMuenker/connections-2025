<script setup lang="ts">
  import AppButton from '~/components/AppButton.vue';
  import BaseTile from '~/components/BaseTile.vue';
  import MessageBox from '~/components/MessageBox.vue';

  const supabase = useSupabaseClient();
  const { routes } = useRoutes();

  const formData = ref<{ email: string; confirmEmail: string }>({ email: '', confirmEmail: '' });
  const errorMessage = ref('');
  const successMessage = ref('');

  async function resetPassword(formData: { email: string; confirmEmail: string }) {
    errorMessage.value = '';
    successMessage.value = '';

    const { data, error } = await supabase.auth.updateUser(
      {
        email: formData.email,
      },
      { emailRedirectTo: `${window.location.origin}${routes.confirmEmail}` }
    );

    if (error) {
      errorMessage.value = error.message;
      return;
    }

    successMessage.value = 'Wir haben dir Bestätigungslinks an deine alte und deine neue E-Mailadresse geschickt.';
  }
</script>

<template>
  <BaseTile>
    <div class="header">
      <h1 class="heading-xlarge">Ändere deine E-Mail</h1>
    </div>
    <FormKit type="form" @submit="resetPassword">
      <MessageBox v-if="errorMessage" type="error">
        {{ errorMessage }}
      </MessageBox>
      <MessageBox v-if="successMessage" type="success">
        {{ successMessage }}
      </MessageBox>
      <template v-if="!successMessage">
        <FormKit validation="required|email" name="email" label="E-Mail" v-model="formData.email" placeholder="Deine neue E-Mail" type="email" />
        <FormKit
          validation="required|confirm:email"
          name="confirmEmail"
          label="Neue E-Mail wiederholen"
          v-model="formData.confirmEmail"
          placeholder="Bestätige deine neue E-Mail"
          type="email"
        />
        <AppButton type="submit" class="button block" :loading="false">E-Mail ändern</AppButton>
      </template>
    </FormKit>
  </BaseTile>
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
