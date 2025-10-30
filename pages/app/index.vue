<script setup lang="ts">
  import AppButton from '~/components/AppButton.vue';

  const user = useSupabaseUser();
  const supabase = useSupabaseClient();

  async function signOut() {
    await supabase.auth.signOut();
    navigateTo('/');
  }
</script>

<template>
  You are logged in:
  <pre>
    {{ user }}
</pre
  >
  <AppButton @click="signOut">Abmelden</AppButton>
</template>
