<script setup lang="ts">
  import AppButton from '~/components/AppButton.vue';
  import BaseTile from '~/components/BaseTile.vue';
  import MessageBox from '~/components/MessageBox.vue';

  const supabase = useSupabaseClient();

  const errorMessage = ref('');
  const successMessage = ref('');

  async function changeUsername(formData: { username: string }) {
    errorMessage.value = '';
    successMessage.value = '';

    try {
      const { data, error } = await supabase.auth.updateUser({
        data: {
          display_name: formData.username,
        },
      });

      if (error) throw error;

      await supabase.auth.refreshSession();
      successMessage.value = 'Dein Nutzername wurde erfolgreich geändert.';
    } catch (error: any) {
      errorMessage.value = useAuth().getErrorMessage(error.code);
    }
  }
</script>

<template>
  <BaseTile>
    <div class="header">
      <h1 class="heading-xlarge">Neues Ich?</h1>
      <p>Gib dir einen neuen Namen.</p>
    </div>
    <FormKit type="form" @submit="changeUsername" v-slot="{ state: { loading } }">
      <MessageBox v-if="errorMessage" type="error">
        {{ errorMessage }}
      </MessageBox>
      <MessageBox v-if="successMessage" type="success">
        {{ successMessage }}
      </MessageBox>
      <template v-if="!successMessage">
        <FormKit
          validation="required|length:2,16|trimmed|new_username|(750)unique_username"
          label="Neuer Nutzername"
          name="username"
          placeholder="Dein neuer Nutzername"
          type="text"
          :disabled="loading"
        />
        <AppButton type="submit" class="button block" :loading="loading">Nutzername ändern</AppButton>
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
</style>
