<script setup lang="ts">
  import BaseTile from './BaseTile.vue';

  const props = defineProps<{ scores: { id: string; username: string | null; score: number }[] }>();
</script>
<template>
  <div class="leaderboard">
    <div class="top-ranks">
      <BaseTile class="entry" v-for="(entry, index) in scores.slice(0, 3)">
        <div class="rank heading-medium">{{ index + 1 }}</div>
        <div>
          <div class="player heading-medium">{{ entry.username }}</div>
          <div class="score heading-medium">{{ formatNumber(entry.score) }}</div>
        </div>
      </BaseTile>
    </div>
    <BaseTile class="lower-ranks copy-default">
      <div v-for="(entry, index) in scores" class="entry">
        <div class="rank">{{ index + 1 }}</div>
        <div class="player">{{ entry.username }}</div>
        <div class="score">{{ formatNumber(entry.score) }}</div>
      </div>
    </BaseTile>
  </div>
</template>

<style lang="scss" scoped>
  .leaderboard {
    display: flex;
    flex-direction: column;
    font-variant-numeric: tabular-nums;
  }

  .top-ranks {
    display: flex;
    flex-direction: column;
    gap: spacing('m');
    margin-bottom: spacing('xl');

    .rank {
      text-align: center;
    }

    .score {
      margin-top: spacing('xxs');
      @include var-font-weight(400);
    }

    .entry {
      position: relative;
      overflow: hidden;

      &::after {
        position: absolute;
        top: 0;
        left: 0;
        width: 16px;
        height: 100%;
        content: '';
        background: red;
        z-index: 1;
      }

      &:first-of-type::after {
        background: #ffd779;
      }

      &:nth-of-type(2)::after {
        background: #cecece;
      }

      &:nth-of-type(3)::after {
        background: #d1ad49;
      }
    }
  }

  .player {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .lower-ranks {
    display: flex;
    flex-direction: column;
    gap: spacing('xs');

    .player {
      width: calc(100% - 120px);
      padding-right: spacing('m');
    }

    .score {
      width: 80px;
      text-align: right;
    }

    .rank {
      @include var-font-weight(600);
    }
  }

  .rank {
    width: 35px;
    margin-right: spacing('m');
    flex-shrink: 0;
  }

  .entry {
    display: flex;
  }
</style>
