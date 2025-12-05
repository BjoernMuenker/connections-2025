<script setup lang="ts">
  import BaseTile from './BaseTile.vue';

  const props = defineProps<{ scores: { username: string | null; score: number }[] }>();

  const upperRanks = computed(() => props.scores.slice(0, 3));
  const lowerRanks = computed(() => props.scores.slice(3));
</script>
<template>
  <div class="leaderboard">
    <template v-if="!scores || scores.length === 0">
      <BaseTile>Noch keine Einträge.</BaseTile>
    </template>
    <template v-else>
      <div class="top-ranks">
        <BaseTile class="entry" v-for="(entry, index) in upperRanks" padding="small">
          <div class="rank heading-medium">{{ index + 1 }}</div>
          <div>
            <div class="player heading-medium">{{ entry.username }}</div>
            <div class="score heading-medium">{{ formatNumber(entry.score) }}</div>
          </div>
        </BaseTile>
      </div>
      <BaseTile v-if="lowerRanks.length !== 0" class="lower-ranks copy-default" padding="small">
        <div v-for="(entry, index) in lowerRanks" class="entry">
          <div class="rank">{{ index + 4 }}</div>
          <div class="player">{{ entry.username }}</div>
          <div class="score">{{ formatNumber(entry.score) }}</div>
        </div>
      </BaseTile>
    </template>
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
    margin-bottom: spacing('m');

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
        width: 12px;
        height: 100%;
        content: '';
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
    text-align: right;
  }

  .entry {
    display: flex;
  }
</style>
