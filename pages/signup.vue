<script setup lang="ts">
  const email = ref('');
  const password = ref('');
  const errorMsg = ref('');

  async function onSubmit() {
    const { data, error } = await useFetch('/api/auth/users/create', {
      method: 'POST',
      body: { email: email.value, password: password.value },
    });

    if (error.value) {
      errorMsg.value = error.value?.data?.message || 'Signup failed';
      return;
    }
  }
</script>

<template>
  <form @submit.prevent="onSubmit">
    <h1>Create a new user</h1>
    <input v-model="email" type="email" placeholder="Email" class="input" />
    <input v-model="password" type="password" placeholder="Password" class="input" />
    <button type="submit" class="btn">Sign In</button>

    <p v-if="errorMsg" class="text-red-600">{{ errorMsg }}</p>
  </form>
</template>

<style lang="scss" scoped>
  h1 {
    margin-bottom: spacing('m');
  }

  form {
    background: #fff;
    padding: 2rem;
    max-width: 400px;
    margin: 4rem auto;
    border-radius: 6px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  }

  input {
    display: block;
    width: 100%;
    padding: 0.6rem 0.8rem;
    margin-bottom: 1rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: #fff;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  input:focus {
    border-color: #0070f3;
    box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.2);
    outline: none;
  }

  button {
    display: block;
    width: 100%;
    padding: 0.7rem 1rem;
    font-size: 1rem;
    font-weight: 500;
    color: #fff;
    background-color: #0070f3;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  button:hover {
    background-color: #005fcc;
  }

  button:active {
    background-color: #004a99;
  }

  p.text-red-600 {
    font-size: 0.875rem;
    margin-top: 0.5rem;
  }
</style>
