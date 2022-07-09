<template>
    <div class="notes">
        <AddEditNote
            v-model="newNote"
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
import AddEditNote from '../components/Notes/AddEditNote.vue';

const storeNotes = useStoreNotes()

const newNote = ref('')
const newNoteRef = ref(null)

const addNote = () => {
    storeNotes.addNote(newNote.value)
    newNote.value = ''
    newNoteRef.value.focus()
}

</script>