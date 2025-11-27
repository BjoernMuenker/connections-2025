<script setup lang="ts">
  const { $gsap } = useNuxtApp();

  const aRef = ref<HTMLElement>();
  const bRef = ref<HTMLElement>();
  const cRef = ref<HTMLElement>();
  const dRef = ref<HTMLElement>();

  onMounted(() => {
    const timeline = $gsap.timeline({ repeat: -1 });

    if (!aRef.value || !bRef.value || !cRef.value || !dRef.value) return;

    timeline.to(aRef.value, { x: '+=100%' });
    timeline.to(bRef.value, { y: '+=100%' }, '<');
    timeline.to(cRef.value, { y: '-=100%' }, '<');
    timeline.to(dRef.value, { x: '-=100%' }, '<');

    timeline.to(aRef.value, { y: '+=100%' });
    timeline.to(bRef.value, { x: '-=100%' }, '<');
    timeline.to(cRef.value, { x: '+=100%' }, '<');
    timeline.to(dRef.value, { y: '-=100%' }, '<');

    timeline.to(aRef.value, { x: '-=100%' });
    timeline.to(bRef.value, { y: '-=100%' }, '<');
    timeline.to(cRef.value, { y: '+=100%' }, '<');
    timeline.to(dRef.value, { x: '+=100%' }, '<');

    timeline.to(aRef.value, { y: '-=100%' });
    timeline.to(bRef.value, { x: '+=100%' }, '<');
    timeline.to(cRef.value, { x: '-=100%' }, '<');
    timeline.to(dRef.value, { y: '+=100%' }, '<');
  });
</script>

<template>
  <div class="loading-indicator">
    <div class="a tile" ref="aRef">
      <div class="background-yellow"></div>
    </div>
    <div class="b tile" ref="bRef">
      <div class="background-green-200"></div>
    </div>
    <div class="c tile" ref="cRef">
      <div class="background-violet"></div>
    </div>
    <div class="d tile" ref="dRef">
      <div class="background-blue-100"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .loading-indicator {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    width: 34px;
    height: 34px;
  }

  .tile {
    > div {
      width: 16px;
      height: 16px;
      border-radius: 4px;
      margin: 2px;
    }
  }
</style>
