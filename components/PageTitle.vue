<script setup lang="ts">
  import { TransitionGroup } from 'vue';
</script>

<template>
  <header class="header">
    <TransitionGroup name="elevator" tag="div" class="title-wrapper">
      <div :key="title" class="title">
        {{ title }}
      </div>
    </TransitionGroup>
  </header>
</template>
