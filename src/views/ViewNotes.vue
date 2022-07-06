<template>
    <div class="notes">
        <div class="card has-background-dark p-4 mb-5">
            <div class="field">
                <div class="control">
                    <textarea
                        v-model="newNote"
                        class="textarea"
                        placeholder="Add a new note"
                        ref="newNoteRef"
                    />
                </div>
            </div>
            <div class="field is-grouped is-grouped-right">
                <div class="control">
                    <button
                        @click="addNote"
                        :disabled="!newNote"
                        class="button is-link has-background-success"
                    >
                        Add new Note
                    </button>
                </div>
            </div>
        </div>
        <Note
          v-for="note in notes"
          :key="note.id"
          :note="note"
          @deleteClicked="deleteNote"
        />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import Note from '@/components/Notes/Note.vue'

const newNote = ref('')
const newNoteRef = ref(null)

const notes = ref([
    {
        id: 'id1',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.  Lorem ipsum dolor sit amet, consectetur adipiscing elit.  Lorem ipsum  dolor    sit  amet, consectetur adipiscing elit.'
    },
    {
        id: 'id2',
        content: 'This is a shorter note'
    }
])

const addNote = () => {
    const id = (new Date().getTime()).toString()
    const note = {
        id,
        content: newNote.value
    }
    notes.value.unshift(note)

    newNote.value = ''
    newNoteRef.value.focus()
}

const deleteNote = (idToDelete) => {
    notes.value = notes.value.filter((note) => {
        return note.id !== idToDelete 
    })
}

</script>