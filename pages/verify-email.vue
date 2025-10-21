<script setup lang="ts">
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const status = ref<'loading' | 'success' | 'error'>('loading');
  const errorMsg = ref('');

  const code = route.query.code as string;

  if (!code) {
    status.value = 'error';
    errorMsg.value = 'Invalid verification link';
  } else {
    try {
      // Call backend API to verify the token
      const { data, error } = await useFetch(`/api/auth/users/verify-email?code=${code}`);
      if (error.value) {
        status.value = 'error';
        errorMsg.value = error.value?.data?.message || 'Verification failed';
      } else {
        status.value = 'success';
        // Optional: auto-redirect to dashboard
        // setTimeout(() => navigateTo('/app'), 2000);
      }
    } catch (err: any) {
      status.value = 'error';
      errorMsg.value = err?.message || 'Unexpected error';
    }
  }
</script>

<template>
  <div>
    <h1 class="text-xl font-semibold mb-4">Email Verification</h1>
    <div v-if="status === 'loading'">Verifying your email...</div>
    <div v-else-if="status === 'success'">✅ Your email has been verified! Redirecting to dashboard...</div>
    <div v-else-if="status === 'error'">❌ Verification failed: {{ errorMsg }}</div>
  </div>
</template>
