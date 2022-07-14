// stores/counter.js
import { defineStore } from 'pinia'
import { 
    collection, onSnapshot, 
    addDoc, deleteDoc, doc, updateDoc, 
    query, orderBy 
} from 'firebase/firestore'
import { db } from '@/js/firebase'

const notesCollectionRef = collection(db, 'notes')
const notesCollectionQuery = query(notesCollectionRef, orderBy('date', 'desc'))

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
      ],
      notesLoaded: false
    }
  },
  actions: {
    async getNotes() {
      this.notesLoaded = false
      onSnapshot(notesCollectionQuery, (querySnapshot) => {
        let notes = []
        querySnapshot.forEach((doc) => {
          const note = {
            id: doc.id,
            content: doc.data().content,
            date: doc.data().date
          }
          notes.push(note)
        })
        
        this.notes = notes
        this.notesLoaded = true
      })
    },
    async addNote(content) {
      const date = (new Date().getTime()).toString()

      await addDoc(notesCollectionRef, {
        content,
        date
      })
      
    },
    async deleteNote(idToDelete) {
      await deleteDoc(doc(notesCollectionRef, idToDelete))
    },
    async updateNote(id, content) {
      // Only updates fields we specify
      await updateDoc(doc(notesCollectionRef, id), {
        content
      })
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