<script setup lang="ts">
  import { computed } from 'vue';
  import { getAlphabeticalIndex } from '../utils/utils';

  const props = defineProps<{
    disabled: boolean;
    inputValue?: string;
    modelValue?: string[];
    selected?: boolean;
    id: string;
    caption: string;
  }>();

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string[]): void;
    (e: 'change', value: string[]): void;
  }>();

  const model = computed({
    get() {
      return props.modelValue ?? '';
    },
    set(value: string[]) {
      emit('update:modelValue', value);
      emit('change', value);
    },
  });

  const groupIndex = computed(() => {
    return getAlphabeticalIndex(props.id[0]);
  });

  const itemIndex = computed(() => {
    return Number(props.id[1]) - 1;
  });

  const wordLength = computed(() => {
    const emojiRegex = /\p{Emoji}/u;

    if (/\p{Extended_Pictographic}/u.test(props.caption)) {
      return 'extrashort';
    }

    if (props.caption.length < 5) {
      return 'short';
    }

    if (props.caption.length <= 7) {
      return 'medium';
    }

    if (props.caption.length <= 10) {
      return 'long';
    }

    if (props.caption.length > 10) {
      return 'extralong';
    }
  });
</script>

<template>
  <label :for="id" class="puzzle-tile" :class="[{ selected: model.includes(props.id), disabled }, `${wordLength}`]" :data-id="id">
    <span class="inner">
      <span class="selected-indicator indicator"></span>
      <span class="caption">{{ caption }}</span>
      <input :id="id" type="checkbox" :value="inputValue" v-model="model" :disabled="disabled" />
    </span>
  </label>
</template>

<style lang="scss" scoped>
  .puzzle-tile {
    position: relative;
    cursor: pointer;
    overflow: hidden;
    user-select: none;
    border-radius: border-radius('default');
    // text-transform: uppercase;
    @include var-font-weight(500);

    &.disabled {
      cursor: not-allowed;
    }

    &:active:not(.disabled) .inner {
      transform: scale(0.9);
    }

    &.selected .inner {
      color: color('white');

      .selected-indicator {
        background-color: color('grey-600');
      }
    }

    &.extrashort {
      @include fluid-value('font-size', 30, 40);
    }

    // &.short {
    //   @include fluid-value('font-size', 18, 28);
    // }

    &.short,
    &.medium {
      @include fluid-value('font-size', 15, 24);
    }

    &.long {
      @include fluid-value('font-size', 12, 20);
    }

    &.extralong {
      @include fluid-value('font-size', 10, 16);
    }
  }

  .inner {
    width: 100%;
    height: 100%;
    background: color('white');
    border-radius: inherit;
    color: color('black');
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s;
  }

  .caption {
    position: relative;
    line-height: 1em;
    text-align: center;
  }

  .indicator {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    border-radius: inherit;
  }

  input {
    clip: rect(0 0 0 0);
    -webkit-clip-path: inset(50%);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
</style>
