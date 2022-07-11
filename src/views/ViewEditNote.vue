<template>
    <div class="edit-note">
         <AddEditNote
            v-model="noteContent"
            bgColor="warning"
            placeHolder="Edit Note"
            label="Edit Note"
            ref="addEditNoteRef"
        >
            <template #buttons>
                 <button
                    @click="$router.back()"
                    class="button is-link is-light "
                >
                    Cancel
                </button>
                <button
                    class="button is-link has-background-info-dark ml-4"
                    :disabled="!noteContent"
                >
                    Save Note
                </button>
            </template>
        </AddEditNote>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import AddEditNote from '@/components/Notes/AddEditNote.vue'

const noteContent = ref('')


</script>