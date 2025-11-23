<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      disabled?: boolean;
      modelValue: boolean;
      id: string;
      labelPosition?: 'left' | 'right';
    }>(),
    { labelPosition: 'right' }
  );

  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean | string | string[]): void;
    (e: 'change', value: boolean | string | string[]): void;
  }>();

  const inputRef = ref<HTMLInputElement>();

  const model = computed({
    get() {
      return props.modelValue;
    },
    set(value: boolean | string | string[]) {
      emit('update:modelValue', value);
      emit('change', value);
    },
  });
</script>

<template>
  <div class="switch-toggle" :class="[{ disabled }, { 'right-label': labelPosition === 'right' }]">
    <label v-if="$slots.default" :for="id"><slot /></label>
    <div class="checkbox">
      <input :id="id" ref="inputRef" v-model="model" type="checkbox" :disabled="disabled" />
      <div class="toggle-ui" :class="model ? `background-black` : `background-grey-very-light`">
        <div class="switch"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .switch-toggle {
    display: flex;
    align-items: center;
    position: relative;
    gap: spacing('s');

    label {
      margin: 0;
      cursor: pointer;
      line-height: 1.3em;
      color: #333;

      .disabled & {
        cursor: not-allowed;
      }
    }

    input {
      cursor: pointer;
      position: absolute;
      width: 56px;
      height: 32px;
      z-index: 1;
      opacity: 0;

      &:focus-visible + .toggle-ui {
        // box-shadow: box-shadow('focus');
      }

      &:checked + .toggle-ui {
        border-color: #333;

        .switch {
          left: 28px;
        }
      }

      &:disabled {
        cursor: not-allowed;

        & + .toggle-ui {
          border-color: grey;

          .switch {
            background-color: grey;
            border-color: grey;
            transform: translate(-3px, -3px);
            color: grey;

            &::after {
              box-shadow: none;
            }
          }
        }
      }
    }

    .checkbox {
      overflow: visible;
    }

    .toggle-ui {
      align-items: center;
      display: flex;
      justify-content: space-evenly;
      position: relative;
      width: 56px;
      height: 32px;
      border-radius: 32px;
      border-color: grey;
      overflow: visible;
      transition: background-color 0.3s, border-color 0.3s, box-shadow 0.3s;

      .switch {
        position: absolute;
        content: '';
        left: 4px;
        top: 4px;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: white;
        transition: left 0.3s, transform 0.3s, color 0.3s, background-color 0.3s;
      }
    }

    .app-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      &.switch-toggle-on-icon {
        left: 30%;
      }

      &.switch-toggle-off-icon {
        left: 70%;
      }
    }

    &.right-label {
      flex-direction: row-reverse;
    }
  }

  .keep-border-color .toggle-ui {
    border-color: #333;
  }
</style>
