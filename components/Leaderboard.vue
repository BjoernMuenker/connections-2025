<script setup lang="ts">
  const props = defineProps<{ scores: { id: string; username: string | null; score: number }[] }>();
</script>
<template>
  <div class="leaderboard">
    <div class="top-ranks">
      <div class="entry" v-for="(entry, index) in scores.slice(0, 3)">
        <div class="rank">{{ index + 1 }}</div>
        <div>
          <div class="player heading-medium">{{ entry.username }}</div>
          <div class="score">{{ entry.score }}</div>
        </div>
      </div>
    </div>
    <div class="lower-ranks">
      <div v-for="(entry, index) in scores" class="entry">
        <div class="rank">{{ index + 1 }}</div>
        <div class="player">{{ entry.username }}</div>
        <div class="score">{{ entry.score }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .leaderboard {
    display: flex;
    flex-direction: column;
  }

  .top-ranks {
    display: flex;
    flex-direction: column;
    gap: spacing('m');
    margin-bottom: spacing('xl');

    .entry {
      border-radius: spacing('s');
      padding: spacing('s');

      &:first-of-type {
        background: #ffd779;
      }

      &:nth-of-type(2) {
        background: #cecece;
      }

      &:nth-of-type(3) {
        background: #d1ad49;
      }
    }
  }

  .lower-ranks {
    display: flex;
    flex-direction: column;
    gap: spacing('xs');

    .player {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: calc(100% - 120px);
      padding-right: spacing('m');
    }

    .score {
      width: 80px;
      text-align: right;
    }
  }

  .rank {
    width: 40px;
    padding-right: spacing('m');
    @include var-font-weight(700);
  }

  .entry {
    display: flex;
  }
</style>
