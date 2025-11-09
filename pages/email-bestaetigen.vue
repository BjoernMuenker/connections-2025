<script setup lang="ts">
  const user = useSupabaseUser();
</script>

<template>
  <div>{{ user }}</div>
  <div>Waiting for login...</div>
</template>
