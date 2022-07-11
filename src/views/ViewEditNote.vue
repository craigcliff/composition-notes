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
                    @click="handleSavedClick"
                    class="button is-link has-background-info-dark ml-3"
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
import { useRoute, useRouter } from 'vue-router'
import AddEditNote from '@/components/Notes/AddEditNote.vue'
import { useStoreNotes } from '@/stores/storeNotes'

const route = useRoute()
const router = useRouter()
const storeNotes = useStoreNotes()


const noteContent = ref('')

noteContent.value = storeNotes.getNoteContent(route.params.id)

const handleSavedClick = () => {
   storeNotes.updateNote(route.params.id, noteContent.value)
   router.push('/')
}

</script>