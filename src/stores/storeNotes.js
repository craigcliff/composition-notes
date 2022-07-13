// stores/counter.js
import { defineStore } from 'pinia'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '@/js/firebase'

export const useStoreNotes = defineStore('storeNotes', {
  state: () => {
    return { 
      notes: [
      //   {
      //     id: 'id1',
      //     content: 'Lorem dolor sit amet, consectetur adipiscing elit.  Lorem ipsum dolor sit amet, consectetur adipiscing elit.  Lorem ipsum  dolor    sit  amet, consectetur adipiscing elit.'
      // },
      // {
      //     id: 'id2',
      //     content: 'This is a shorter note'
      // }
      ] 
    }
  },
  actions: {
    async getNotes() {
      onSnapshot(collection(db, 'notes'), (querySnapshot) => {
        let notes = []
        querySnapshot.forEach((doc) => {
          const note = {
            id: doc.id,
            content: doc.data().content
          }
          notes.push(note)
        })
        this.notes = notes
      })
    },
    addNote(content) {
      const id = (new Date().getTime()).toString()
      const note = {
        id,
        content
      }
      this.notes.unshift(note)
    },
    deleteNote(idToDelete) {
      this.notes = this.notes.filter(note => note.id !== idToDelete)
    },
    updateNote(id, content) {
      const index = this.notes.findIndex(note => note.id === id)
      this.notes[index].content = content  
    }
},
getters: {
  getNoteContent: (state) => (id) => state.notes.filter(item  => item.id === id )[0].content,
  totalNotesCount: (state) => state.notes.length,
  totalCharactersCount: (state) => {
    let count = 0
    state.notes.forEach(note => {
      count += note.content.length
    })
    return count
  }
}
})