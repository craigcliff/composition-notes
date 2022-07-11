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
        <pre> {{ $route.params.id }} </pre>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import AddEditNote from '@/components/Notes/AddEditNote.vue'
import { useStoreNotes } from '@/stores/storeNotes'

const route = useRoute()

const storeNotes = useStoreNotes()

const noteContent = ref('')

noteContent.value = storeNotes.getNoteContent(route.params.id)[0].content


</script>