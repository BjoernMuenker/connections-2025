<script setup lang="ts">
  import LoadingIndicator from '~/components/LoadingIndicator.vue';

  const { data } = await useFetch<{ now: number }>('/api/time', { server: true });
  const now = data.value?.now ?? 0;
</script>

<template>
  <div>server_timestamp: {{ now }} / {{ new Date(now) }}</div>
  <div class="wrapper">
    <LoadingIndicator />
  </div>
  <!-- <div>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia quibusdam animi eligendi! Aspernatur perspiciatis harum est pariatur fuga
    consectetur dolores, deleniti alias ab ipsam cum totam eligendi id? Atque, ad.
  </div>
  <div>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia quibusdam animi eligendi! Aspernatur perspiciatis harum est pariatur fuga
    consectetur dolores, deleniti alias ab ipsam cum totam eligendi id? Atque, ad.
  </div>
  <div>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia quibusdam animi eligendi! Aspernatur perspiciatis harum est pariatur fuga
    consectetur dolores, deleniti alias ab ipsam cum totam eligendi id? Atque, ad.
  </div>
  <div>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia quibusdam animi eligendi! Aspernatur perspiciatis harum est pariatur fuga
    consectetur dolores, deleniti alias ab ipsam cum totam eligendi id? Atque, ad.
  </div>
  <div>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia quibusdam animi eligendi! Aspernatur perspiciatis harum est pariatur fuga
    consectetur dolores, deleniti alias ab ipsam cum totam eligendi id? Atque, ad.
  </div>
  <div>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia quibusdam animi eligendi! Aspernatur perspiciatis harum est pariatur fuga
    consectetur dolores, deleniti alias ab ipsam cum totam eligendi id? Atque, ad.
  </div>
  <div>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia quibusdam animi eligendi! Aspernatur perspiciatis harum est pariatur fuga
    consectetur dolores, deleniti alias ab ipsam cum totam eligendi id? Atque, ad.
  </div>
  <div>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia quibusdam animi eligendi! Aspernatur perspiciatis harum est pariatur fuga
    consectetur dolores, deleniti alias ab ipsam cum totam eligendi id? Atque, ad.
  </div>
  <div>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia quibusdam animi eligendi! Aspernatur perspiciatis harum est pariatur fuga
    consectetur dolores, deleniti alias ab ipsam cum totam eligendi id? Atque, ad.
  </div>
  <div>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia quibusdam animi eligendi! Aspernatur perspiciatis harum est pariatur fuga
    consectetur dolores, deleniti alias ab ipsam cum totam eligendi id? Atque, ad.
  </div>
  <div>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia quibusdam animi eligendi! Aspernatur perspiciatis harum est pariatur fuga
    consectetur dolores, deleniti alias ab ipsam cum totam eligendi id? Atque, ad.
  </div>
  <div>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia quibusdam animi eligendi! Aspernatur perspiciatis harum est pariatur fuga
    consectetur dolores, deleniti alias ab ipsam cum totam eligendi id? Atque, ad.
  </div>
  <div>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia quibusdam animi eligendi! Aspernatur perspiciatis harum est pariatur fuga
    consectetur dolores, deleniti alias ab ipsam cum totam eligendi id? Atque, ad.
  </div> -->
</template>

<style lang="scss" scoped>
  .wrapper {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
