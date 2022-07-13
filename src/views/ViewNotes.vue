<template>
    <div class="notes">
        <AddEditNote
            v-model="newNote"
            placeHolder="Add a new note"
            ref="addEditNoteRef"
        >
            <template #buttons>
                <button
                    @click="addNote"
                    :disabled="!newNote"
                    class="button is-link has-background-success"
                >
                    Add new Note
                </button>
            </template>
        </AddEditNote>

        <Note
          v-for="note in storeNotes.notes"
          :key="note.id"
          :note="note"
        />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import Note from '@/components/Notes/Note.vue'
import { useStoreNotes } from '@/stores/storeNotes'
import AddEditNote from '../components/Notes/AddEditNote.vue'
import { useWatchCharacters } from '@/use/useWatchCharacters'

const storeNotes = useStoreNotes()

const newNote = ref('')
const addEditNoteRef = ref(null)

const addNote = () => {
    storeNotes.addNote(newNote.value)
    newNote.value = ''
    addEditNoteRef.value.focusTextarea()
}

useWatchCharacters(newNote, 50)

</script>