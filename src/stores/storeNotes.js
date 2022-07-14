// stores/counter.js
import { defineStore } from 'pinia'
import { 
    collection, onSnapshot, 
    deleteDoc, doc, setDoc, updateDoc, 
    query, orderBy 
} from 'firebase/firestore'
import { db } from '@/js/firebase'

const notesCollectionRef = collection(db, 'notes')
const notesCollectionQuery = query(notesCollectionRef, orderBy('id', 'desc'))

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
      onSnapshot(notesCollectionQuery, (querySnapshot) => {
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
    async addNote(content) {
      const id = (new Date().getTime()).toString()
      await setDoc(doc(notesCollectionRef, id), {
        content,
        id
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