<script setup lang="ts">
  const { data } = await useFetch('/api/auth/users/59317a6a-2b4b-40d4-afd4-17e3d7405738');
</script>

<template>
  <pre>DATA: {{ data }}</pre>
</template>
