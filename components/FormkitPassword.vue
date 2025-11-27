<script setup lang="ts">
  import type { FormKitNode } from '@formkit/core';

  const props = defineProps<{
    includeResetPassword?: boolean;
    modelValue: string;
    disabled?: boolean;
  }>();

  const { routes } = useRoutes();

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
  }>();

  const model = computed({
    get() {
      return props.modelValue ?? '';
    },
    set(value: string) {
      emit('update:modelValue', value);
    },
  });

  function handleIconClick(node: FormKitNode) {
    if (props.disabled) return;
    node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye';
    node.props.type = node.props.type === 'password' ? 'text' : 'password';
  }
</script>

<template>
  <FormKit
    label="Passwort"
    v-model="model"
    placeholder="Dein Passwort"
    type="password"
    suffix-icon="eye"
    @suffix-icon-click="handleIconClick"
    :disabled="disabled"
  >
    <template #label="{ label, id, state }">
      <div class="label-wrapper">
        <label class="formkit-label" :for="id"> {{ label }}<span v-if="state.required" class="formkit-asterisk">*</span></label>
        <NuxtLink v-if="includeResetPassword" :to="routes.resetPassword" class="text-link">Passwort vergessen?</NuxtLink>
      </div>
    </template>
  </FormKit>
</template>

<style lang="scss" scoped>
  .label-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: spacing('xs');

    label {
      margin: 0;
    }

    a {
      font-size: 16px;
    }
  }
</style>
