<script setup lang="ts">
  const supabase = useSupabaseClient();

  supabase.auth.exchangeCodeForSession('');
</script>

<template>
  <div>Waiting for login...</div>
</template>
