<template>
    <div class="card has-background-dark p-4 mb-5">
            <div class="field">
                <div class="control">
                    <textarea
                        v-model="modelValue"
                        @input="$emit('update:modelValue', modelValue)"
                        class="textarea"
                        placeholder="Add a new note"
                        ref="textAreaRef"
                    />
                </div>
            </div>
            <div class="field is-grouped is-grouped-right">
                <div class="control">
                    <slot name="buttons" />
                </div>
            </div>
        </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    modelValue: {
        type: String,
        required: true
    }
})

const emit = defineEmits(['update:modelValue'])

const textAreaRef = ref(null)

const focusTextarea = () => {
    textAreaRef.value.focus()
    console.log('focus text area')
}

// make method available to parent component
defineExpose({
    focusTextarea
})

</script>