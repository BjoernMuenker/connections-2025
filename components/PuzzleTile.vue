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
    <span class="caption">{{ caption }}</span>
    <input :id="id" type="checkbox" :value="inputValue" v-model="model" :disabled="disabled" />
  </label>
</template>

<style lang="scss" scoped>
  .puzzle-tile {
    display: flex;
    align-items: center;
    justify-content: center;
    background: color('white');
    border-radius: border-radius('default');
    color: color('black');
    cursor: pointer;
    // text-transform: uppercase;
    overflow: hidden;
    user-select: none;
    // transition: transform 0.2s;
    @include var-font-weight(500);
    @include fluid-value('font-size', 16, 22);

    &.disabled {
      cursor: not-allowed;
    }

    // &:active:not(:disabled) {
    //   transform: scale(0.9);
    // }

    &.selected {
      color: color('white');
      background-color: #333;
    }

    &.extrashort {
      @include fluid-value('font-size', 24, 36);
    }

    &.medium {
      @include fluid-value('font-size', 16, 22);
    }

    &.long {
      @include fluid-value('font-size', 12, 20);
    }

    &.extralong {
      @include fluid-value('font-size', 10, 16);
    }
  }

  .caption {
    // position: absolute;
    line-height: 1em;
    text-align: center;
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
