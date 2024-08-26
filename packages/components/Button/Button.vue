<script setup lang="ts">
import { ref } from 'vue';
import type { ButtonProps } from './types';
defineOptions({ name: "ErButton" });
const props = withDefaults(defineProps<ButtonProps>(), {
    tag: "button",
    nativeType: "button",
    type: "primary",
    size: "large"
})

const slots = defineSlots()
const _ref = ref<HTMLButtonElement>()

</script>

<template>


    <component :is="props.tag" ref="_ref" class="er-button" :type="tag === 'button' ? nativeType : void 0"
        :disabled="disabled || loading ? true : void 0" :class="{
            ['er-button--${type}']: type,
            ['er-button--${size}']: size,
            'is-plain': plain,
            'is-round': round,
            'is-circle': circle,
            'is-loading': loading,
            'is-disabled': disabled
        }">
        <!-- 插槽的用法，需要好好学习 -->
        <slot></slot>
    </component>


</template>
<style scoped></style>
